---
name: reference-pinned-actions
description: SHA-to-version map for GitHub Actions pinned in deploy.yml, for future pin-currency audits
metadata:
  type: reference
---

Actions pinned by SHA in the working-tree `deploy.yml` (verify currency in future audits):

- `actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683` # v4.2.2
- `ruby/setup-ruby@89f90524b88a01fe6e0b732220432cc6142926af` # v1.313.0

Both are correctly full-40-char SHA-pinned with version comments. Re-confirm these SHAs map to the claimed tags before trusting them, and check for newer patched releases. Related: [[project-ftp-vpn-deploy]].
