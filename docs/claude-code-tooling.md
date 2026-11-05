# Claude Code tooling for this project

Everything below is committed to the repository at **project scope**, so it applies to anyone
opening this repo in Claude Code and does not change global settings.

## Plugins

| Plugin                  | Source                                                   | How it is enabled                          | License    |
| ----------------------- | -------------------------------------------------------- | ------------------------------------------ | ---------- |
| `frontend-design` 1.1.1 | Official Anthropic marketplace `claude-plugins-official` | `.claude/settings.json` → `enabledPlugins` | Apache-2.0 |

Installed with `claude plugin install frontend-design@claude-plugins-official --scope project`.
On a new machine, Claude Code offers to install enabled project plugins when the folder is
trusted.

## Motion AI Kit (free tier)

| Part                                   | Location                                            |
| -------------------------------------- | --------------------------------------------------- |
| `/motion` skill (vendored, unmodified) | `.claude/skills/motion/` — see `VENDORED.md` there  |
| Hosted docs/search MCP server `motion` | `.mcp.json` → `https://mcp.motion.dev` (no API key) |

The official installer (`npx motion-ai`, MIT) only runs in an interactive terminal; its
"Project → Claude Code" path was reproduced exactly by copying the bundled skill and writing the
same MCP entry. The paid **Motion+** server (`motion-plus`) and the `motion-reviewer` agent
(which depends on Motion+ audits) were intentionally **not** installed.

**First run:** Claude Code asks you to approve project MCP servers from `.mcp.json`. Approve
`motion` once (or run `claude` in the repo and accept the prompt). Without it, the skill's
`best-practices/` guidance still works offline.

## Project skills

| Skill                    | Use it for                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `latansa-art-direction`  | Any visual decision: layout, typography, color, logo, imagery, motion intent               |
| `latansa-public-content` | Any change to public copy or `src/content/`                                                |
| `latansa-visual-qa`      | Browser verification: mobile-first viewport ladder, overflow, touch, motion, static export |

## Browser verification

`.claude/launch.json` defines `static-export` (serves `out/` on port 4173, matching production)
and `dev` (port 3000). Visual QA uses the static export.

## Not installed (and why)

- Lenis — not justified yet; revisit only if the Phase 3 motion spec needs it.
- `motion` npm package — installed in Phase 4 when animations are implemented.
- Any image-generation service — none is zero-cost in this environment; see
  [image-assets.md](image-assets.md).
