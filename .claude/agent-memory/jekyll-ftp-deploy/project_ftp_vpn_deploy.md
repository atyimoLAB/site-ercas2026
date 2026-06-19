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
- iptables REJECT killswitch DROPPED (2026-06-19, deliberate user decision). Route-via-ppp0 fail-closed assert KEPT (`ip route get`, dev must be ppp0). Route assert resolves IPv4 explicitly via `getent ahostsv4` (fixed 2026-06-19): plain `getent hosts` can return an AAAA first and `ip route get` on a v6 addr won't match the IPv4 ppp0 tunnel -> false negative. Also fail closed if no IPv4 resolves.
- Runner: **GitHub-hosted ubuntu-latest + VPN** (fallback model, not self-hosted-in-network). Recommend self-hosted runner inside UFBA network.
- Build command matches CLAUDE.md: `bundle exec jekyll build --config _config.yml,_config.pt.yml -d _site`, `JEKYLL_ENV=production`. PT only.
- `Gemfile.lock` IS committed. `bundler-cache: true` + `BUNDLE_FROZEN: 'true'`.

**openfortivpn CI gotcha (root cause corrected 2026-06-18):** openfortivpn authenticates itself, then execs `pppd` to create `ppp0`. The truncated log ending right after `Authenticated.` with no ppp0 has TWO layers, and the package-only fix was insufficient:
1. Userspace: `ppp` package provides `/usr/sbin/pppd`. Install it (`apt-get install -y openfortivpn ppp`) and assert pppd present.
2. **Kernel (the actual blocker on ubuntu-latest):** pppd needs the `ppp_generic` kernel module loaded AND the `/dev/ppp` device node. On GitHub-hosted runners the module is available but NOT loaded and `/dev/ppp` does NOT exist by default. Installing the package does not create the device node. Without it pppd exits ("kernel does not support PPP") and openfortivpn dies post-auth with the truncated log. Fix: `sudo modprobe ppp_generic` then assert `[ -e /dev/ppp ]` in the Install tooling step, BEFORE connecting. Confirmed via openfortivpn issues #863/#825.
Also run openfortivpn with `-v` under `stdbuf -oL -eL` so failures flush. Cert trust (`--trusted-cert`) is already satisfied in this env (auth succeeds), so don't touch it. Self-hosted runner inside UFBA network would sidestep both layers (kernel preconfigured).

**How to apply:** When reviewing/authoring this workflow, route checks use `ppp0` (openfortivpn), not `wg0`. Push for: build/deploy job separation, lftp rewrite replacing the marketplace action, FTPS, self-hosted runner, sha256 manifest verification, and timestamped remote backups. See [[reference-pinned-actions]].
