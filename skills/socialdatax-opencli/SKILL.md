---
name: socialdatax-opencli
description: Use SocialDataX / 社媒数据助手 through OpenCLI for read-only 小红书 / Xiaohongshu / XHS / RedNote and 抖音 / Douyin social data workflows including search, details, comments, creator profiles, and creator posts.
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
    homepage: https://socialdatax.com
---

# SocialDataX OpenCLI

Use this skill when the user asks to use OpenCLI for SocialDataX / 社媒数据助手, 小红书 / Xiaohongshu / XHS / RedNote, or 抖音 / Douyin read-only data workflows.

Prefer the OpenCLI plugin commands when installed:

```bash
opencli socialdatax xhs-search --keyword "<keyword>" -f json
opencli socialdatax xhs-detail --note-id "<note_id>" -f json
opencli socialdatax xhs-comments --note-id "<note_id>" -f table
opencli socialdatax xhs-sub-comments --note-id "<note_id>" --comment-id "<comment_id>" -f table
opencli socialdatax xhs-user-info --user-id "<user_id>" -f json
opencli socialdatax xhs-user-posts --user-id "<user_id>" -f table
opencli socialdatax douyin-search --keyword "<keyword>" -f json
opencli socialdatax douyin-detail --aweme-id "<aweme_id>" -f json
opencli socialdatax douyin-comments --aweme-id "<aweme_id>" -f table
opencli socialdatax douyin-user-info --sec-user-id "<sec_user_id>" -f json
opencli socialdatax douyin-user-posts --sec-user-id "<sec_user_id>" -f table
```

If the OpenCLI plugin is not installed, fall back to the direct CLI:

```bash
npx -y socialdatax-skills@latest xhs search --keyword "<keyword>" --pretty
npx -y socialdatax-skills@latest douyin search --keyword "<keyword>" --pretty
```

Set `SOCIALDATAX_API_KEY` before data calls. This skill is read-only: do not use it for login, posting, liking, commenting, following, editing, deleting, or other account actions.

OpenCLI's built-in `xiaohongshu` adapter is browser-session based. `opencli socialdatax ...` is API Key based hosted data access and covers both 小红书 / Xiaohongshu / XHS / RedNote and 抖音 / Douyin.
