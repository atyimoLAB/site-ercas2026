// ── /programacao: laço de piscar do cabeçalho flutuante de salas ──
// O conference.bundle.js (módulo do programa, função `kr()`) injeta em tempo de
// execução um <div style="position:sticky;top:0;…"> com um CLONE do <thead>
// logo ANTES de cada .program-table-container, e alterna o `display` dele
// (none/block) a partir de um IntersectionObserver com
// `rootMargin: -<altura do thead>px 0 0 0` que observa o <thead> ORIGINAL.
// Como esse <div> fica NO FLUXO, exibi-lo empurra o <thead> observado para
// baixo exatamente a altura do rootMargin — ele volta a intersectar, o header
// some, o <thead> sobe, e o ciclo recomeça a cada quadro. Histerese zero: a
// tela pisca presa numa faixa instável de ~45px. Só aparece em aparelho real
// (a rolagem por toque é contínua e desacelera DENTRO da faixa; a roda do mouse
// salta a faixa inteira e a emulação do DevTools usa o caminho de entrada do
// desktop) — por isso não reproduz no navegador do desenvolvedor.
//
// Correção: `margin-bottom` negativo igual à própria altura do wrapper.
// `display:none` remove a caixa E suas margens juntas; `display:block` soma
// +S de altura e −S de margem. O delta de fluxo é ZERO nos dois estados, então
// o <thead> observado nunca se move e o termo de realimentação desaparece — o
// observer do tema continua funcionando, agora corretamente. No ponto de
// virada a posição de fluxo do wrapper é exatamente y = 0, que é onde o
// `sticky` o fixa: a transição é contínua, sem salto.
//
// NÃO mexer no `display` (é o tema que escreve, inline) nem no `scrollLeft`
// (é o que sincroniza o clone com a rolagem horizontal da tabela).
// Sem media query: o laço não depende da largura (um trackpad de macOS gera
// deltas contínuos como o toque), então a correção vale em qualquer viewport.
//
// De quebra, o clone do tema duplica os `id="room-…"` do <thead> — IDs
// repetidos no documento, HTML inválido enquanto o clone existir. A última
// linha remove os ids do CLONE (o <thead> original mantém os seus, que são
// quem os `headers`/`aria-labelledby` referenciam).
// NÃO marcamos o wrapper com aria-hidden: os chips de sala clonados são
// links focáveis, e aria-hidden sobre conteúdo focável é, por si só, uma
// violação (precisaria de `inert` junto, o que tiraria um link que hoje
// funciona). O clone só entra na árvore de acessibilidade enquanto está
// display:block — fica como questão à parte, fora do escopo desta correção.
window.conference?.awaitReady()?.then(() => {
  document.querySelectorAll('.program-table-container').forEach((container) => {
    const wrapper = container.previousElementSibling;
    const thead = container.querySelector('.program-table > thead');
    if (!wrapper || !thead || wrapper.style.position !== 'sticky') return;

    const sync = () => {
      const h = thead.offsetHeight;
      if (h) wrapper.style.marginBottom = `-${h}px`;
    };
    // ResizeObserver, não uma medição única: a aba do segundo dia nasce
    // display:none (altura 0) e só ganha altura quando é aberta.
    new ResizeObserver(sync).observe(thead);

    wrapper.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
  });
});
