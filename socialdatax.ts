import { cli, Strategy } from "@jackwener/opencli/registry";
import { runSocialDataXCommand } from "./lib/socialdatax-core.mjs";

const COMMON_COLUMNS = [
  "note_id",
  "note_url",
  "aweme_id",
  "sec_user_id",
  "comment_id",
  "rank",
  "keyword",
  "tag",
  "hot_value",
  "title",
  "desc",
  "content",
  "nickname",
  "author_nickname",
  "profile_nickname",
  "like_count",
  "comment_count",
  "top_level_comment_count",
  "next_page",
  "next_page_token",
];

const pageTokenOption = {
  name: "page-token",
  type: "string",
  help: "Opaque pagination token. Continue only with the complete returned next_page_token from the same pagination chain. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.",
};

function localCommand(name, description, options = {}) {
  return cli({
    site: "socialdatax",
    name,
    description,
    access: "read",
    example: `opencli socialdatax ${name} -f json`,
    strategy: Strategy.LOCAL,
    browser: false,
    args: options,
    columns: COMMON_COLUMNS,
    async func(argv) {
      return runSocialDataXCommand(name, argv);
    },
  });
}

localCommand(
  "xhs-search",
  "Search 小红书 / Xiaohongshu / XHS / RedNote notes with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    { name: "page", type: "int", help: "1-based page number." },
    { name: "sort-type", type: "string", help: "general, time_descending, like_count_descending, comment_count_descending, or collect_count_descending." },
    { name: "note-type", type: "string", help: "all, image, or video." },
    { name: "publish-time-range", type: "string", help: "all, day, week, or half_year." },
  ]
);
localCommand(
  "xhs-hot-search",
  "Fetch the current 小红书 / Xiaohongshu / XHS / RedNote search hot list.",
);
localCommand(
  "xhs-detail",
  "Read one 小红书 / Xiaohongshu / XHS / RedNote note detail.",
  [
    { name: "note-id", type: "string", help: "Known XHS note ID." },
    { name: "url", type: "string", help: "XHS note URL, short link, or share text." },
  ]
);
localCommand(
  "xhs-comments",
  "Fetch 小红书 / Xiaohongshu / XHS / RedNote first-level comments.",
  [
    { name: "note-id", type: "string", help: "Known XHS note ID." },
    { name: "url", type: "string", help: "XHS note URL, short link, or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "xhs-sub-comments",
  "Fetch 小红书 / Xiaohongshu / XHS / RedNote replies under one comment.",
  [
    { name: "note-id", type: "string", required: true, help: "Known XHS note ID." },
    { name: "comment-id", type: "string", required: true, help: "First-level comment ID." },
    pageTokenOption,
  ]
);
localCommand(
  "xhs-user-info",
  "Read 小红书 / Xiaohongshu / XHS / RedNote creator profile data.",
  [
    { name: "user-id", type: "string", help: "Known XHS user ID." },
    { name: "profile-url", type: "string", help: "XHS profile URL, short link, or share text." },
  ]
);
localCommand(
  "xhs-user-posts",
  "Fetch 小红书 / Xiaohongshu / XHS / RedNote creator notes.",
  [
    { name: "user-id", type: "string", help: "Known XHS user ID." },
    { name: "profile-url", type: "string", help: "XHS profile URL, short link, or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "douyin-hot-search",
  "Fetch the current 抖音 / Douyin main hot search list.",
);
localCommand(
  "douyin-search",
  "Search 抖音 / Douyin works with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    pageTokenOption,
    { name: "sort-type", type: "string", help: "general, time_descending, or like_count_descending." },
    { name: "publish-time-range", type: "string", help: "all, day, week, or half_year." },
    { name: "duration-range", type: "string", help: "all, under_1_minute, one_to_five_minutes, or over_5_minutes." },
    { name: "content-type", type: "string", help: "all, video, or image." },
  ]
);
localCommand(
  "douyin-detail",
  "Read one 抖音 / Douyin work detail.",
  [
    { name: "aweme-id", type: "string", help: "Known Douyin aweme_id." },
    { name: "url", type: "string", help: "Douyin content URL, short link, or share text." },
  ]
);
localCommand(
  "douyin-comments",
  "Fetch 抖音 / Douyin first-level comments.",
  [
    { name: "aweme-id", type: "string", help: "Known Douyin aweme_id." },
    { name: "url", type: "string", help: "Douyin content URL, short link, or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "douyin-replies",
  "Fetch 抖音 / Douyin replies under one first-level comment.",
  [
    { name: "aweme-id", type: "string", required: true, help: "Known Douyin aweme_id." },
    { name: "comment-id", type: "string", required: true, help: "First-level comment ID." },
    pageTokenOption,
  ]
);
localCommand(
  "douyin-user-info",
  "Read 抖音 / Douyin creator profile data.",
  [
    { name: "sec-user-id", type: "string", help: "Known Douyin sec_user_id." },
    { name: "profile-url", type: "string", help: "Douyin profile URL, short link, or share text." },
  ]
);
localCommand(
  "douyin-user-posts",
  "Fetch 抖音 / Douyin creator works.",
  [
    { name: "sec-user-id", type: "string", help: "Known Douyin sec_user_id." },
    { name: "profile-url", type: "string", help: "Douyin profile URL, short link, or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "douyin-user-series",
  "Fetch 抖音 / Douyin creator short-drama series.",
  [
    { name: "sec-user-id", type: "string", help: "Known Douyin sec_user_id." },
    { name: "profile-url", type: "string", help: "Douyin profile URL, short link, or share text." },
    pageTokenOption,
  ]
);
