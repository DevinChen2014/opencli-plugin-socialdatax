---
name: socialdatax-opencli
description: Use SocialDataX / 社媒数据助手 through OpenCLI for read-only 小红书 / Xiaohongshu / XHS / RedNote and 抖音 / Douyin social data workflows including search, hot search, details, comments, creator profiles, creator posts, and creator short-drama series.
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

Use this skill when the user asks to use OpenCLI for SocialDataX / 社媒数据助手, 小红书 / Xiaohongshu / XHS / RedNote, or 抖音 / Douyin read-only data workflows.

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
```

If the OpenCLI plugin is not installed, fall back to the direct CLI:

```bash
npx -y socialdatax-skills@latest xhs search --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest xhs hot-search --pretty
npx -y socialdatax-skills@latest douyin search --keyword "<keyword>" --pretty
```

Set `SOCIALDATAX_API_KEY` before data calls. This skill is read-only: do not use it for login, posting, liking, commenting, following, editing, deleting, or other account actions.

For XHS search and detail results, in every use of a returned `note_url`, such as final answers, display, references, storage, output, or forwarding, preserve it exactly as the full URL, including `xsec_token` query parameters. Do not modify, truncate, redact, normalize, rebuild, or replace it with a link assembled from `note_id`. If `note_url` is null, do not synthesize a public link from `note_id`.

For XHS `note_id`, copy the entire returned `note_id` exactly. Do not truncate, redact, or use only a prefix.

For commands that accept `--page-token`, continue only with the complete returned `next_page_token` from the same pagination chain. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.

For XHS comments, `--sort-type` accepts `default`, `time_descending`, or `like_count_descending`; omit it for the platform default comment order.

OpenCLI's built-in `xiaohongshu` adapter is browser-session based. `opencli socialdatax ...` is API Key based hosted data access and covers both 小红书 / Xiaohongshu / XHS / RedNote and 抖音 / Douyin.
