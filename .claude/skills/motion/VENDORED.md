# Vendored: Motion AI Kit

- Source: npm `motion-ai@14.2.0` (MIT), https://github.com/motiondivision/ai-kit
- Installed: 2026-11-05, equivalent to `npx motion-ai` → Project scope → Claude Code
  (the installer is interactive-only; its files were copied verbatim from the package).
- Included: `.claude/skills/motion/` (unchanged) and the free hosted MCP server `motion`
  (`https://mcp.motion.dev`) in `/.mcp.json`.
- Deliberately excluded (paid Motion+ tier, not used by this project):
  the `motion-plus` MCP server and the `motion-reviewer` agent (needs Motion+ audits).
- Upgrade: re-copy `content/skills/motion` from a newer `motion-ai` package. Do not edit
  the vendored files; put project-specific motion rules in `latansa-art-direction`.
