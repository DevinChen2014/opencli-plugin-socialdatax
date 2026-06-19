# SocialDataX OpenCLI Plugin | 社媒数据助手 OpenCLI 插件

SocialDataX / 社媒数据助手 OpenCLI 插件提供 API Key 鉴权的 hosted read-only social data tools，用于小红书 / Xiaohongshu / XHS / RedNote 和抖音 / Douyin 的搜索热榜、内容研究、社媒数据分析、选题观察、评论分析和创作者研究。

Use this plugin when you want API Key based data access without relying on a logged-in browser session. 适合用 OpenCLI 做小红书搜索热榜 / search hot list、笔记搜索 / note search、笔记详情 / note details、评论 / comments、评论回复 / comment replies、博主信息 / creator profiles、博主笔记列表 / creator notes，以及抖音热榜 / hot search、作品搜索 / Douyin work search、作品详情 / work details、评论 / comments、评论回复 / comment replies、创作者资料 / creator profiles、创作者作品列表 / creator posts 和创作者短剧列表 / creator short-drama series.

This is a complement to OpenCLI's built-in browser-backed `xiaohongshu` adapter, not a replacement for that adapter. OpenCLI 内置 `xiaohongshu` 更偏浏览器登录态能力；`socialdatax` 是 SocialDataX / 社媒数据助手 提供的 API Key hosted 只读数据能力，覆盖小红书 / Xiaohongshu / XHS / RedNote 和抖音 / Douyin。

- Product: `SocialDataX` / `社媒数据助手`
- Website: <https://socialdatax.52choujiang.com>
- Platforms: 小红书 / Xiaohongshu / XHS / RedNote, 抖音 / Douyin
- Capabilities: 小红书搜索热榜 / Xiaohongshu search hot list, 笔记搜索 / note search, 笔记详情 / note details, 评论 / comments, 评论回复 / comment replies, 博主信息 / creator profiles, 博主内容列表 / creator posts, 抖音热榜 / Douyin hot search, 创作者短剧列表 / creator short-drama series
- Runtime package: `socialdatax-skills@latest`
- API key environment variable: `SOCIALDATAX_API_KEY`

## Install / 安装

从 GitHub 安装 SocialDataX / 社媒数据助手 OpenCLI 插件：

```bash
opencli plugin install github:DevinChen2014/opencli-plugin-socialdatax
```

本地开发或调试时，也可以从 local checkout 安装：

```bash
git clone https://github.com/DevinChen2014/opencli-plugin-socialdatax.git
cd opencli-plugin-socialdatax
opencli plugin install "$PWD"
```

OpenCLI plugin install currently accepts file, GitHub, and git sources. It does not install plugins directly from an npm package name.

调用小红书 / Xiaohongshu / XHS / RedNote 或抖音 / Douyin 数据命令前，先设置 API Key：

```bash
export SOCIALDATAX_API_KEY="<SOCIALDATAX_API_KEY>"
```

## API Key / API Key 获取

Request or manage API access from the official product website:

<https://socialdatax.52choujiang.com/?from=opencli>

Use the key as `SOCIALDATAX_API_KEY` for OpenCLI data calls. Do not commit real API keys to code, docs, issues, or screenshots.

## Commands / 命令

```bash
opencli socialdatax xhs-search --keyword "露营桌" -f json
opencli socialdatax xhs-hot-search -f table
opencli socialdatax xhs-detail --note-id "<note_id>" -f json
opencli socialdatax xhs-comments --note-id "<note_id>" -f table
opencli socialdatax xhs-sub-comments --note-id "<note_id>" --comment-id "<comment_id>" -f table
opencli socialdatax xhs-user-info --user-id "<user_id>" -f json
opencli socialdatax xhs-user-posts --user-id "<user_id>" -f table

opencli socialdatax douyin-hot-search -f table
opencli socialdatax douyin-search --keyword "露营桌" -f json
opencli socialdatax douyin-detail --aweme-id "<aweme_id>" -f json
opencli socialdatax douyin-comments --aweme-id "<aweme_id>" -f table
opencli socialdatax douyin-replies --aweme-id "<aweme_id>" --comment-id "<comment_id>" -f table
opencli socialdatax douyin-user-info --sec-user-id "<sec_user_id>" -f json
opencli socialdatax douyin-user-posts --sec-user-id "<sec_user_id>" -f table
opencli socialdatax douyin-user-series --sec-user-id "<sec_user_id>" -f table
```

Each command forwards to `npx -y socialdatax-skills@latest ...` and flattens returned JSON so OpenCLI can render table, JSON, YAML, or CSV output. 每个命令都会复用 `socialdatax-skills@latest`，把返回结果整理成 OpenCLI 适合展示的表格、JSON、YAML 或 CSV。

For XHS search and detail results, in every use of a returned `note_url`, such as final answers, display, references, storage, output, or forwarding, preserve it exactly as the full URL, including `xsec_token` query parameters. Do not modify, truncate, redact, normalize, rebuild, or replace it with a link assembled from `note_id`. If `note_url` is null, do not synthesize a public link from `note_id`.

For XHS `note_id`, copy the complete 24-character lowercase hex ID exactly. Do not truncate, redact, or use only a prefix.

For commands that accept `--page-token`, continue only with the complete returned `next_page_token` from the same pagination chain. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.

## Read-Only Boundary / 只读边界

This plugin only reads public content data through hosted SocialDataX services. 本插件只提供只读数据能力，不登录用户账号、不读取浏览器数据、不发布内容、不点赞、不评论、不关注、不编辑、不删除，也不执行任何账号动作。

## Search Aliases / 搜索关键词

Users, agents, and search engines may discover this plugin with these Chinese and English aliases:

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
- `笔记搜索`
- `note search`
- `小红书搜索热榜`
- `search hot list`
- `评论分析`
- `comments`
- `创作者分析`
- `creator profiles`

## Maintainer Notes / 维护说明

Published package: `opencli-plugin-socialdatax`.

Current package version: `0.1.5`.

Patch `0.1.5` exposes the Xiaohongshu search hot list command through OpenCLI and temporarily routes API Key guidance to <https://socialdatax.52choujiang.com/?from=opencli>.

Patch `0.1.4` adds OpenCLI attribution URL guidance for SocialDataX API Key acquisition.

Patch `0.1.3` exposes Douyin comment replies with `douyin-replies`.

Patch `0.1.2` pins API Key guidance for agent-installed skill copies.

Patch `0.1.2` also exposes Douyin hot search and creator short-drama series commands that are already available from the hosted Douyin MCP service.

Patch `0.1.1` shipped a precompiled `socialdatax.js` entrypoint for OpenCLI environments without `esbuild`.

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
