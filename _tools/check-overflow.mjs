// Guarda de overflow horizontal — ERCAS 2026.
//
// Falha se QUALQUER página construída puder ser arrastada na horizontal
// (`document.documentElement.scrollWidth > clientWidth`) em qualquer uma das
// larguras de celular testadas. Existe porque esse tipo de bug é invisível no
// desktop: some assim que o `.container` do Bootstrap ganha `max-width`.
//
// Não faz parte do site: o prefixo "_" faz o Jekyll pular este diretório
// (Jekyll::EntryFilter#special?), então nada daqui vai parar em _site/.
//
// Sem dependências: servidor estático do `node:http`, Chrome headless dirigido
// por CDP cru sobre o `WebSocket` global (Node >= 22).
//
// Uso:
//   bundle exec jekyll build -d _site
//   node _tools/check-overflow.mjs                        # todas as rotas
//   node _tools/check-overflow.mjs / /programacao/        # só estas rotas
//   node _tools/check-overflow.mjs --widths 320,414       # larguras próprias
//   CHROME_PATH=/usr/bin/google-chrome node _tools/check-overflow.mjs
//
// Sai com 0 se nenhuma rota vaza; 1 caso contrário.

import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, readdir, mkdtemp, rm, access } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, relative, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const RAIZ = resolve(process.argv[1], '..', '..');
const SITE = join(RAIZ, '_site');
// Inclui as fronteiras de breakpoint do Bootstrap (576/768/992/1200): foi
// exatamente em 768 — onde o navbar deixa de ser hamburger — que apareceu
// um vazamento que nenhuma largura "de celular" pegava.
const LARGURAS_PADRAO = [320, 360, 390, 414, 576, 768, 992, 1200];
const ALTURA = 800;
const TIMEOUT_LOAD_MS = 10000;

// ── Argumentos ────────────────────────────────────────────────
const args = process.argv.slice(2);
let larguras = LARGURAS_PADRAO;
const rotasPedidas = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--widths') {
    larguras = args[++i].split(',').map((n) => parseInt(n.trim(), 10)).filter(Boolean);
  } else if (args[i].startsWith('--')) {
    erro(`opção desconhecida: ${args[i]}`);
  } else {
    rotasPedidas.push(args[i]);
  }
}

function erro(msg) {
  console.error(`\n  ERRO: ${msg}\n`);
  process.exit(2);
}

// ── Servidor estático sobre _site ─────────────────────────────
// `baseurl` é "" e os assets são absolutos (/assets/...), então file:// não
// serve — o CSS não carregaria e a medição seria inútil.
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function caminhoDe(urlPath) {
  const limpo = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  if (limpo.includes('..')) return null;
  const alvo = join(SITE, limpo);
  return limpo.endsWith('/') ? join(alvo, 'index.html') : alvo;
}

async function subirServidor() {
  const srv = createServer(async (req, res) => {
    const arquivo = caminhoDe(req.url);
    if (!arquivo) {
      res.writeHead(400).end();
      return;
    }
    try {
      const corpo = await readFile(arquivo);
      res.writeHead(200, { 'content-type': TIPOS[extname(arquivo)] || 'application/octet-stream' });
      res.end(corpo);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' }).end('404');
    }
  });
  await new Promise((ok) => srv.listen(0, '127.0.0.1', ok));
  return { srv, base: `http://127.0.0.1:${srv.address().port}` };
}

// ── Enumeração de rotas ───────────────────────────────────────
async function listarRotas() {
  const rotas = [];
  async function andar(dir) {
    for (const ent of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, ent.name);
      if (ent.isDirectory()) {
        await andar(p);
      } else if (ent.name === 'index.html') {
        const rel = relative(SITE, dir).split('\\').join('/');
        rotas.push(rel === '' ? '/' : `/${rel}/`);
      }
    }
  }
  await andar(SITE);
  if (existsSync(join(SITE, '404.html'))) rotas.push('/404.html');
  return rotas.sort();
}

// ── Chrome ────────────────────────────────────────────────────
async function acharChrome() {
  const candidatos = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ].filter(Boolean);
  for (const c of candidatos) {
    try {
      await access(c);
      return c;
    } catch { /* segue */ }
  }
  erro('Chrome não encontrado. Defina CHROME_PATH apontando para o binário do Chrome/Chromium.');
}

async function subirChrome(bin, perfil) {
  const proc = spawn(bin, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--hide-scrollbars=false',
    `--user-data-dir=${perfil}`,
    '--remote-debugging-port=0',
    'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  const ws = await new Promise((ok, falha) => {
    let buf = '';
    const t = setTimeout(() => falha(new Error('timeout esperando o DevTools do Chrome')), 20000);
    proc.stderr.on('data', (d) => {
      buf += d.toString();
      const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
      if (m) {
        clearTimeout(t);
        ok(m[1]);
      }
    });
    proc.on('exit', (code) => {
      clearTimeout(t);
      falha(new Error(`Chrome saiu antes de abrir o DevTools (código ${code})`));
    });
  });
  return { proc, ws };
}

// ── Cliente CDP (protocolo flat) ──────────────────────────────
class CDP {
  constructor(sock) {
    this.sock = sock;
    this.id = 0;
    this.pend = new Map();
    this.ouvintes = [];
    sock.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id !== undefined) {
        const p = this.pend.get(msg.id);
        if (!p) return;
        this.pend.delete(msg.id);
        msg.error ? p.falha(new Error(msg.error.message)) : p.ok(msg.result);
      } else {
        for (const l of this.ouvintes) l(msg);
      }
    });
  }
  static async conectar(url) {
    const sock = new WebSocket(url);
    await new Promise((ok, falha) => {
      sock.addEventListener('open', ok, { once: true });
      sock.addEventListener('error', () => falha(new Error(`não conectou em ${url}`)), { once: true });
    });
    return new CDP(sock);
  }
  envia(method, params = {}, sessionId) {
    const id = ++this.id;
    return new Promise((ok, falha) => {
      this.pend.set(id, { ok, falha });
      this.sock.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }
  esperaEvento(method, sessionId, ms) {
    return new Promise((ok) => {
      const t = setTimeout(() => {
        this.ouvintes = this.ouvintes.filter((l) => l !== ouvinte);
        ok(false);
      }, ms);
      const ouvinte = (msg) => {
        if (msg.method !== method) return;
        if (sessionId && msg.sessionId !== sessionId) return;
        clearTimeout(t);
        this.ouvintes = this.ouvintes.filter((l) => l !== ouvinte);
        ok(true);
      };
      this.ouvintes.push(ouvinte);
    });
  }
}

// ── A expressão de auditoria ──────────────────────────────────
// Roda dentro da página. Um elemento só CONTRIBUI para o scroll do documento se
// nenhum ancestral o recorta — é esse filtro que mantém o scroller intencional
// da grade de /programacao/ (.program-table-container, overflow-x: scroll) fora
// do relatório. Sem ele a guarda vira ruído e é desligada na primeira semana.
const AUDITORIA = `(() => {
  const de = document.documentElement;
  const limite = de.clientWidth;
  const excedente = de.scrollWidth - limite;

  const recortado = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      if (getComputedStyle(p).overflowX !== 'visible') return true;
    }
    return false;
  };

  const sel = (el) => {
    if (el.id) return '#' + el.id;
    const cls = (el.getAttribute('class') || '').trim().split(/\\s+/).filter(Boolean).slice(0, 4);
    return el.tagName.toLowerCase() + (cls.length ? '.' + cls.join('.') : '');
  };

  let culpados = [...document.querySelectorAll('body *')].filter((el) => {
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.right <= limite + 0.5) return false;
    if (getComputedStyle(el).position === 'fixed') return false;
    return !recortado(el);
  });

  // só os mais externos: filho que vaza porque o pai vaza é ruído
  culpados = culpados.filter((el) => !culpados.some((o) => o !== el && o.contains(el)));

  return {
    excedente,
    limite,
    culpados: culpados.map((el) => {
      const r = el.getBoundingClientRect();
      const caminho = [];
      for (let n = el; n && n !== document.body; n = n.parentElement) caminho.unshift(sel(n));
      return {
        sel: sel(el),
        over: Math.round((r.right - limite) * 10) / 10,
        caminho: caminho.join(' > '),
      };
    }).sort((a, b) => b.over - a.over).slice(0, 10),
  };
})()`;

// ── Execução ──────────────────────────────────────────────────
async function principal() {
  if (!existsSync(SITE)) erro(`_site não existe. Rode antes: bundle exec jekyll build -d _site`);

  const rotas = rotasPedidas.length ? rotasPedidas : await listarRotas();
  if (!rotas.length) erro('nenhuma rota encontrada em _site/');

  const bin = await acharChrome();
  const perfil = await mkdtemp(join(tmpdir(), 'ercas-overflow-'));
  const { srv, base } = await subirServidor();
  const { proc, ws } = await subirChrome(bin, perfil);
  const cdp = await CDP.conectar(ws);

  const { targetId } = await cdp.envia('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.envia('Target.attachToTarget', { targetId, flatten: true });
  await cdp.envia('Page.enable', {}, sessionId);

  console.log(`\n  Rotas: ${rotas.length}   Larguras: ${larguras.join(', ')}   (${rotas.length * larguras.length} medições)\n`);

  const falhas = [];
  for (const rota of rotas) {
    for (const largura of larguras) {
      // mobile:true é OBRIGATÓRIO: sem isso o Chrome desktop reserva ~15px de
      // scrollbar clássica e clientWidth != largura ⇒ falso positivo em tudo.
      await cdp.envia('Emulation.setDeviceMetricsOverride', {
        width: largura, height: ALTURA, deviceScaleFactor: 2, mobile: true,
      }, sessionId);

      const carregou = cdp.esperaEvento('Page.loadEventFired', sessionId, TIMEOUT_LOAD_MS);
      await cdp.envia('Page.navigate', { url: base + rota }, sessionId);
      await carregou; // segue mesmo se estourar (o iframe do Maps pode nunca carregar)

      await cdp.envia('Runtime.evaluate', {
        expression: 'document.fonts.ready.then(() => 1)', awaitPromise: true,
      }, sessionId).catch(() => {});

      const { result } = await cdp.envia('Runtime.evaluate', {
        expression: AUDITORIA, returnByValue: true,
      }, sessionId);
      const r = result.value;

      if (r.excedente > 0) {
        falhas.push({ rota, largura, ...r });
        const quem = r.culpados.length
          ? r.culpados.map((c) => `${c.sel} (+${c.over})`).join('  ')
          : '(nenhum elemento não-recortado — ver margens/pseudo-elementos)';
        console.log(`  FALHA  ${rota.padEnd(34)} ${String(largura).padStart(4)}px  +${r.excedente}px   ${quem}`);
      }
    }
  }

  cdp.sock.close();
  proc.kill();
  srv.close();
  await rm(perfil, { recursive: true, force: true });

  if (falhas.length) {
    console.log(`\n  ${falhas.length} de ${rotas.length * larguras.length} medições com pan horizontal.\n`);
    console.log('  Caminhos completos dos culpados:');
    const vistos = new Set();
    for (const f of falhas) {
      for (const c of f.culpados) {
        if (vistos.has(c.caminho)) continue;
        vistos.add(c.caminho);
        console.log(`    ${c.caminho}`);
      }
    }
    console.log('');
    process.exitCode = 1;
  } else {
    console.log(`  OK — nenhum pan horizontal em ${rotas.length * larguras.length} medições.\n`);
  }
}

principal().catch((e) => erro(e.stack || e.message));
