# SocialDataX OpenCLI Plugin | 社媒数据助手 OpenCLI 插件

SocialDataX / 社媒数据助手 OpenCLI 插件提供 API Key 鉴权的 hosted read-only social data tools，用于 11 个公开平台的内容搜索、热榜、详情、评论、创作者资料和创作者内容研究。

Use this plugin when you want API Key based social data access without relying on a logged-in browser session. 支持小红书、抖音、快手、Bilibili、微博、微信视频号、知乎、Instagram、X / Twitter、YouTube 和 TikTok。

This is a complement to browser-session adapters, not a replacement for them. `socialdatax` provides API Key based hosted read-only data access and does not use local browser sessions.

- Product: `SocialDataX` / `社媒数据助手`
- Website: <https://socialdatax.com>
- Platforms: 小红书 / Xiaohongshu / XHS / RedNote, 抖音 / Douyin, 快手 / Kuaishou / Kwai, Bilibili / 哔哩哔哩 / B站, 微博 / Weibo, 微信视频号 / WeChat Channels, 知乎 / Zhihu, Instagram, X / Twitter, YouTube, TikTok
- Capabilities: search and hot lists, content details, comments and replies, creator profiles and creator content lists; platform-specific read-only commands include Bilibili articles/dynamics/reactions, Weibo likers/reposts, WeChat Official Account article details, and Douyin creator short-drama series
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

调用 SocialDataX 数据命令前，先设置 API Key：

```bash
export SOCIALDATAX_API_KEY="<SOCIALDATAX_API_KEY>"
```

## API Key / API Key 获取

Request or manage API access from the official product website:

<https://socialdatax.com/ai?from=opencli>

Use the key as `SOCIALDATAX_API_KEY` for OpenCLI data calls. Do not commit real API keys to code, docs, issues, or screenshots.

## Commands / 命令

```bash
opencli socialdatax xhs-search --keyword "露营" -f json
opencli socialdatax xhs-hot-search -f table
opencli socialdatax xhs-detail --note-id "<note_id>" -f json
opencli socialdatax xhs-comments --note-id "<note_id>" -f table
opencli socialdatax xhs-comments --note-id "<note_id>" --sort-type time_descending -f table
opencli socialdatax xhs-sub-comments --note-id "<note_id>" --comment-id "<comment_id>" -f table
opencli socialdatax xhs-user-info --user-id "<user_id>" -f json
opencli socialdatax xhs-user-posts --user-id "<user_id>" -f table

opencli socialdatax douyin-hot-search -f table
opencli socialdatax douyin-search --keyword "露营" -f json
opencli socialdatax douyin-detail --aweme-id "<aweme_id>" -f json
opencli socialdatax douyin-comments --aweme-id "<aweme_id>" -f table
opencli socialdatax douyin-replies --aweme-id "<aweme_id>" --comment-id "<comment_id>" -f table
opencli socialdatax douyin-user-info --sec-user-id "<sec_user_id>" -f json
opencli socialdatax douyin-user-posts --sec-user-id "<sec_user_id>" -f table
opencli socialdatax douyin-user-series --sec-user-id "<sec_user_id>" -f table

opencli socialdatax kuaishou-search --keyword "露营" -f json
opencli socialdatax bilibili-search-videos --keyword "露营" -f json
opencli socialdatax weibo-hot-search -f table
opencli socialdatax wechat-search --keyword "露营" -f json
opencli socialdatax zhihu-hot-list -f table
opencli socialdatax instagram-search --keyword "camping" -f json
opencli socialdatax x-search --keyword "openai" -f json
opencli socialdatax youtube-search --keyword "openai" -f json
opencli socialdatax tiktok-search --keyword "openai" -f json
```

Command families by platform:

- `kuaishou-*`: hot search, content and creator search, detail, comments/replies, creator profile and posts
- `bilibili-*`: video/article search, detail, comments/replies, reactions, creator profile, videos, articles and dynamics
- `weibo-*`: hot search, search, detail, comments/replies, likers/reposts, creator profile and posts
- `wechat-*`: hot search, search, work detail, Official Account article detail, comments/replies, creator profile and posts
- `zhihu-*`: hot list, search, detail, comments/replies, creator profile and posts
- `instagram-*`, `x-*`, `tiktok-*`: search, detail, comments/replies, creator profile and posts
- `youtube-*`: search, detail, comments/replies, channel profile and channel videos/Shorts

Each command forwards to `npx -y socialdatax-skills@latest ...` and flattens returned JSON so OpenCLI can render table, JSON, YAML, or CSV output. 每个命令都会复用 `socialdatax-skills@latest`，把返回结果整理成 OpenCLI 适合展示的表格、JSON、YAML 或 CSV。

For XHS search and detail results, in every use of a returned `note_url`, such as final answers, display, references, storage, output, or forwarding, preserve it exactly as the full URL, including `xsec_token` query parameters. Do not modify, truncate, redact, normalize, rebuild, or replace it with a link assembled from `note_id`. If `note_url` is null, do not synthesize a public link from `note_id`.

For XHS `note_id`, copy the entire returned `note_id` exactly. Do not truncate, redact, or use only a prefix.

For commands that accept `--page-token`, continue only with the complete returned `next_page_token` from the same pagination chain. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.

For XHS comments, `--sort-type` accepts `default`, `time_descending`, or `like_count_descending`; omit it for the platform default comment order.

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
- `快手`
- `Kuaishou`
- `Kwai`
- `Bilibili`
- `哔哩哔哩`
- `微博`
- `Weibo`
- `微信视频号`
- `WeChat Channels`
- `知乎`
- `Zhihu`
- `Instagram`
- `X / Twitter`
- `YouTube`
- `TikTok`
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

Current package version: `0.2.0`.

Minor `0.2.0` expands the same hosted read-only OpenCLI integration from Xiaohongshu and Douyin to all 11 public SocialDataX platforms.

Patch `0.1.7` adds the `--sort-type <default|time_descending|like_count_descending>` option to `xhs-comments`.

Patch `0.1.6` updates Xiaohongshu search pagination to opaque `page_token` / `next_page_token` continuation.

Patch `0.1.5` exposes the Xiaohongshu search hot list command through OpenCLI and updates API Key guidance to the official SocialDataX website.

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
opencli list | rg 'socialdatax|小红书|抖音|快手|Bilibili|微博|视频号|知乎|Instagram|Twitter|YouTube|TikTok'
```
