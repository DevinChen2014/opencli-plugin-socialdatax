# SocialDataX OpenCLI Plugin | 社媒数据助手 OpenCLI 插件

SocialDataX / 社媒数据助手 provides hosted, read-only social data tools for 小红书 / Xiaohongshu / XHS / RedNote and 抖音 / Douyin workflows.

Use this OpenCLI plugin when you want API Key based data access without relying on a logged-in browser session. It is a complement to OpenCLI's built-in browser-backed `xiaohongshu` adapter, not a replacement for that adapter.

- Product: `SocialDataX` / `社媒数据助手`
- Website: <https://socialdatax.com>
- Platforms: 小红书 / Xiaohongshu / XHS / RedNote, 抖音 / Douyin
- Runtime package: `socialdatax-skills@latest`
- API key environment variable: `SOCIALDATAX_API_KEY`

## Install

Install from GitHub:

```bash
opencli plugin install github:DevinChen2014/opencli-plugin-socialdatax
```

Or install from a local checkout for development:

```bash
git clone https://github.com/DevinChen2014/opencli-plugin-socialdatax.git
cd opencli-plugin-socialdatax
opencli plugin install "$PWD"
```

OpenCLI plugin install currently accepts file, GitHub, and git sources. It does not install plugins directly from an npm package name.

Set your API Key before data calls:

```bash
export SOCIALDATAX_API_KEY="<SOCIALDATAX_API_KEY>"
```

## Commands

```bash
opencli socialdatax xhs-search --keyword "露营桌" -f json
opencli socialdatax xhs-detail --note-id "<note_id>" -f json
opencli socialdatax xhs-comments --note-id "<note_id>" -f table
opencli socialdatax xhs-sub-comments --note-id "<note_id>" --comment-id "<comment_id>" -f table
opencli socialdatax xhs-user-info --user-id "<user_id>" -f json
opencli socialdatax xhs-user-posts --user-id "<user_id>" -f table

opencli socialdatax douyin-search --keyword "露营桌" -f json
opencli socialdatax douyin-detail --aweme-id "<aweme_id>" -f json
opencli socialdatax douyin-comments --aweme-id "<aweme_id>" -f table
opencli socialdatax douyin-user-info --sec-user-id "<sec_user_id>" -f json
opencli socialdatax douyin-user-posts --sec-user-id "<sec_user_id>" -f table
```

Each command forwards to `npx -y socialdatax-skills@latest ...` and flattens returned JSON so OpenCLI can render table, JSON, YAML, or CSV output.

## Read-Only Boundary

This plugin only reads public content data through hosted SocialDataX services. It does not log in to user accounts, read browser data, publish posts, like, comment, follow, edit, delete, or perform account actions.

## Search Aliases

Users and agents may search for this plugin with:

- `SocialDataX`
- `社媒数据助手`
- `小红书`
- `Xiaohongshu`
- `XHS`
- `RedNote`
- `抖音`
- `Douyin`
- `social media data`
- `creator analytics`
- `comment analysis`

## Maintainer Notes

Published package: `opencli-plugin-socialdatax`.

Current npm release: `0.1.1`, published on `2026-05-19 11:53:50` Asia/Shanghai.

Patch `0.1.1` ships a precompiled `socialdatax.js` entrypoint for OpenCLI environments without `esbuild`.

Release from the repository root:

```bash
node scripts/publish_socialdatax_opencli.mjs --dry-run
node scripts/publish_socialdatax_opencli.mjs
```

Verify after publishing:

```bash
npm view opencli-plugin-socialdatax version time dist-tags.latest homepage engines --json
opencli plugin install "$PWD"
opencli list | rg 'socialdatax|小红书|抖音|xiaohongshu|douyin'
```
