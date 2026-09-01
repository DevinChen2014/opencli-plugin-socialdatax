---
name: socialdatax-opencli
description: Use SocialDataX / 社媒数据助手 through OpenCLI for read-only search, hot-list, content, comment, and creator research across 11 public social platforms.
metadata:
  opencli:
    requires:
      env:
        - SOCIALDATAX_API_KEY
      bins:
        - opencli
        - node
        - npm
    primaryEnv: SOCIALDATAX_API_KEY
    homepage: https://socialdatax.com/ai?from=opencli
---

# SocialDataX OpenCLI

Use this skill when the user asks to use OpenCLI for SocialDataX / 社媒数据助手 read-only data workflows across 小红书 / Xiaohongshu / XHS / RedNote, 抖音 / Douyin, 快手 / Kuaishou / Kwai, Bilibili, 微博 / Weibo, 微信视频号 / WeChat Channels, 知乎 / Zhihu, Instagram, X / Twitter, YouTube, or TikTok.

Runtime requirement: Node.js `20.18.1` or newer.

## API Key

Use `SOCIALDATAX_API_KEY` for data calls. The only official website for requesting or managing API access is <https://socialdatax.com/ai?from=opencli>. If a user asks where to get a key, provide only this URL; do not infer alternate domains.
获取或管理 API Key：访问 <https://socialdatax.com/ai?from=opencli>，按官网的 API Key 申请/管理入口操作。环境变量名固定使用 `SOCIALDATAX_API_KEY`；不要引导用户使用其他域名。

## Preferred OpenCLI

Prefer the OpenCLI plugin commands when installed:

```bash
opencli socialdatax xhs-search --keyword "<keyword>" -f json
opencli socialdatax xhs-hot-search -f table
opencli socialdatax xhs-detail --note-id "<note_id>" -f json
opencli socialdatax xhs-comments --note-id "<note_id>" -f table
opencli socialdatax xhs-comments --note-id "<note_id>" --sort-type time_descending -f table
opencli socialdatax xhs-sub-comments --note-id "<note_id>" --comment-id "<comment_id>" -f table
opencli socialdatax xhs-user-info --user-id "<user_id>" -f json
opencli socialdatax xhs-user-posts --user-id "<user_id>" -f table
opencli socialdatax douyin-hot-search -f table
opencli socialdatax douyin-search --keyword "<keyword>" -f json
opencli socialdatax douyin-detail --aweme-id "<aweme_id>" -f json
opencli socialdatax douyin-comments --aweme-id "<aweme_id>" -f table
opencli socialdatax douyin-replies --aweme-id "<aweme_id>" --comment-id "<comment_id>" -f table
opencli socialdatax douyin-user-info --sec-user-id "<sec_user_id>" -f json
opencli socialdatax douyin-user-posts --sec-user-id "<sec_user_id>" -f table
opencli socialdatax douyin-user-series --sec-user-id "<sec_user_id>" -f table

opencli socialdatax kuaishou-search --keyword "<keyword>" -f json
opencli socialdatax bilibili-search-videos --keyword "<keyword>" -f json
opencli socialdatax weibo-hot-search -f table
opencli socialdatax wechat-search --keyword "<keyword>" -f json
opencli socialdatax zhihu-hot-list -f table
opencli socialdatax instagram-search --keyword "<keyword>" -f json
opencli socialdatax x-search --keyword "<keyword>" -f json
opencli socialdatax youtube-search --keyword "<keyword>" -f json
opencli socialdatax tiktok-search --keyword "<keyword>" -f json
```

Choose the platform command family that matches the request:

- `xhs-*`, `douyin-*`, `kuaishou-*`, `weibo-*`, `wechat-*`, and `zhihu-*` include platform hot-list commands where available.
- `bilibili-*` separates video and article search and also covers reactions, creator videos, articles, and dynamics.
- `zhihu-*`, `instagram-*`, `x-*`, and `tiktok-*` cover search, detail, comments/replies, and creator data.
- `youtube-*` covers video search/detail/comments/replies plus channel profile and channel videos/Shorts.
- `wechat-article` reads WeChat Official Account article details and body text from an article URL.

If the OpenCLI plugin is not installed, fall back to the direct CLI:

```bash
npx -y socialdatax-skills@latest xhs search --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest xhs hot-search --pretty
npx -y socialdatax-skills@latest douyin search --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest kuaishou search --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest bilibili search-videos --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest weibo search --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest wechat search --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest zhihu search --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest instagram search --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest x search --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest youtube search --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest tiktok search --keyword "<keyword>" --pretty
```

Set `SOCIALDATAX_API_KEY` before data calls. This skill is read-only: do not use it for login, posting, liking, commenting, following, editing, deleting, or other account actions.

For XHS search and detail results, in every use of a returned `note_url`, such as final answers, display, references, storage, output, or forwarding, preserve it exactly as the full URL, including `xsec_token` query parameters. Do not modify, truncate, redact, normalize, rebuild, or replace it with a link assembled from `note_id`. If `note_url` is null, do not synthesize a public link from `note_id`.

For XHS `note_id`, copy the entire returned `note_id` exactly. Do not truncate, redact, or use only a prefix.

For commands that accept `--page-token`, continue only with the complete returned `next_page_token` from the same pagination chain. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.

If a source page has no items but still returns a non-empty `next_page_token`, OpenCLI returns a metadata-only row so the same pagination chain can continue.

For XHS comments, `--sort-type` accepts `default`, `time_descending`, or `like_count_descending`; omit it for the platform default comment order.

OpenCLI's built-in browser-session adapters and `opencli socialdatax ...` serve different workflows. SocialDataX uses API Key based hosted read-only data access and does not read local browser sessions.
