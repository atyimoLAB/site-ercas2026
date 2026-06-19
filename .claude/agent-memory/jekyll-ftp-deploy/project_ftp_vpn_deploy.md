---
name: project-ftp-vpn-deploy
description: ERCAS 2026 alt deploy path — lftp delete-mirror to UFBA FTP over openfortivpn; host/path/runner facts
metadata:
  type: project
---

`.github/workflows/deploy.yml` (committed, branch thicolares/deploy-jekyll-ftp-vpn as of 2026-06-18) deploys the PT Jekyll build to a UFBA FTP host over an openfortivpn tunnel.

**Why:** Site is migrating off GitHub Pages toward a UFBA-hosted target (see CLAUDE.md custom-domain note, ercas2026.ufba.br). This FTP path targets a shared UFBA host.

**Facts (from the committed workflow):**
- VPN mechanism: **openfortivpn** (FortiGate SSL VPN), interface `ppp0`. Not WireGuard/OpenVPN. Secrets: `VPN_GATEWAY_HOST/PORT/USERNAME/PASSWORD`.
- Deploy tool: currently the marketplace **`SamKirkland/FTP-Deploy-Action`** (NOT the lftp script standard — flagged for rewrite to `lftp mirror --reverse --delete` with dry-run + delete-sanity gate + sha256 manifest). Remote dir: `/sharedirs/sharedir01/tchaves/public_html/`.
- Protocol: plain FTP (`protocol: ftp`). FTPS NOT in use — flagged, recommend FTPS.
- Single `deploy` job (build + VPN + FTP combined) — build has secrets in scope. Flagged: split build/deploy.
- Has an iptables OUTPUT REJECT killswitch on the FTP IP for any egress not via ppp0, and a route-via-ppp0 fail-closed assert (`ip route get`, dev must be ppp0).
- Runner: **GitHub-hosted ubuntu-latest + VPN** (fallback model, not self-hosted-in-network). Recommend self-hosted runner inside UFBA network.
- Build command matches CLAUDE.md: `bundle exec jekyll build --config _config.yml,_config.pt.yml -d _site`, `JEKYLL_ENV=production`. PT only.
- `Gemfile.lock` IS committed. `bundler-cache: true` + `BUNDLE_FROZEN: 'true'`.

**openfortivpn CI gotcha (fixed 2026-06-18):** openfortivpn authenticates itself, then execs `pppd` to create `ppp0`. On ubuntu-latest the `ppp` package (provides `/usr/sbin/pppd`) is NOT reliably preinstalled — without it the process dies right after `Authenticated.`, before ppp0 appears, with a truncated 2-line log. Fix: `apt-get install -y openfortivpn ppp`, assert pppd present, run openfortivpn with `-v` under `stdbuf -oL -eL` so the real failure flushes to the log. Cert trust (`--trusted-cert`) is already satisfied in this env (auth succeeds), so don't touch it.

**How to apply:** When reviewing/authoring this workflow, route checks use `ppp0` (openfortivpn), not `wg0`. Push for: build/deploy job separation, lftp rewrite replacing the marketplace action, FTPS, self-hosted runner, sha256 manifest verification, and timestamped remote backups. See [[reference-pinned-actions]].
