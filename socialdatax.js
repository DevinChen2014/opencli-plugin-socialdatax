import { cli, Strategy } from "@jackwener/opencli/registry";
import {
  buildSocialDataXCommandExample,
  runSocialDataXCommand,
} from "./lib/socialdatax-core.mjs";

const pageTokenOption = {
  name: "page-token",
  type: "string",
  help: "Opaque pagination token. Continue only with the complete returned next_page_token from the same pagination chain. Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses.",
};

function localCommand(name, description, options = []) {
  return cli({
    site: "socialdatax",
    name,
    description,
    access: "read",
    example: buildSocialDataXCommandExample(name, options),
    strategy: Strategy.LOCAL,
    browser: false,
    args: options,
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
    pageTokenOption,
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
    { name: "sort-type", type: "string", help: "default, time_descending, or like_count_descending." },
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

localCommand("kuaishou-hot-search", "Fetch the current 快手 / Kuaishou / Kwai hot-search list.");
localCommand(
  "kuaishou-search",
  "Search 快手 / Kuaishou / Kwai works with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    pageTokenOption,
  ]
);
localCommand(
  "kuaishou-user-search",
  "Search 快手 / Kuaishou / Kwai creators.",
  [
    { name: "keyword", type: "string", required: true, help: "Creator search keyword." },
    pageTokenOption,
  ]
);
localCommand(
  "kuaishou-detail",
  "Read one 快手 / Kuaishou / Kwai work detail.",
  [
    { name: "photo-id", type: "string", help: "Known Kuaishou photo_id." },
    { name: "url", type: "string", help: "Kuaishou content URL, short link, or share text." },
  ]
);
localCommand(
  "kuaishou-comments",
  "Fetch 快手 / Kuaishou / Kwai first-level comments.",
  [
    { name: "photo-id", type: "string", help: "Known Kuaishou photo_id." },
    { name: "url", type: "string", help: "Kuaishou content URL, short link, or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "kuaishou-replies",
  "Fetch 快手 / Kuaishou / Kwai replies under one comment.",
  [
    { name: "photo-id", type: "string", required: true, help: "Known Kuaishou photo_id." },
    { name: "comment-id", type: "string", required: true, help: "First-level comment ID." },
    pageTokenOption,
  ]
);
localCommand(
  "kuaishou-user-info",
  "Read 快手 / Kuaishou / Kwai creator profile data.",
  [
    { name: "user-id", type: "string", help: "Known Kuaishou user ID." },
    { name: "profile-url", type: "string", help: "Kuaishou profile URL or share text." },
  ]
);
localCommand(
  "kuaishou-user-posts",
  "Fetch 快手 / Kuaishou / Kwai creator works.",
  [
    { name: "user-id", type: "string", help: "Known Kuaishou user ID." },
    { name: "profile-url", type: "string", help: "Kuaishou profile URL or share text." },
    pageTokenOption,
  ]
);

localCommand(
  "bilibili-search-videos",
  "Search Bilibili / 哔哩哔哩 / B站 videos with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    pageTokenOption,
    { name: "sort-type", type: "string", help: "general, view_count_descending, time_descending, danmaku_count_descending, or collect_count_descending." },
    { name: "publish-time-range", type: "string", help: "all, day, week, or half_year." },
    { name: "publish-time-start-date", type: "string", help: "Custom publish-time start date." },
    { name: "publish-time-end-date", type: "string", help: "Custom publish-time end date." },
    { name: "duration-range", type: "string", help: "all, under_10_minutes, between_10_and_30_minutes, between_30_and_60_minutes, or over_60_minutes." },
  ]
);
localCommand(
  "bilibili-search-articles",
  "Search Bilibili / 哔哩哔哩 / B站 articles with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    pageTokenOption,
    { name: "sort-type", type: "string", help: "general, time_descending, view_count_descending, like_count_descending, or comment_count_descending." },
    { name: "category", type: "string", help: "all, animation, gaming, film_and_tv, lifestyle, hobbies, light_novel, technology, or notes." },
  ]
);
localCommand(
  "bilibili-detail",
  "Read one Bilibili / 哔哩哔哩 / B站 video, article, or dynamic detail.",
  [
    { name: "content-id", type: "string", help: "Known Bilibili content ID." },
    { name: "url", type: "string", help: "Bilibili content URL or share text." },
  ]
);
localCommand(
  "bilibili-comments",
  "Fetch Bilibili / 哔哩哔哩 / B站 content comments.",
  [
    { name: "content-id", type: "string", help: "Known Bilibili content ID." },
    { name: "url", type: "string", help: "Bilibili content URL or share text." },
    pageTokenOption,
    { name: "sort-type", type: "string", help: "hot or time_descending." },
  ]
);
localCommand(
  "bilibili-replies",
  "Fetch Bilibili / 哔哩哔哩 / B站 replies under one comment.",
  [
    { name: "comment-object-id", type: "string", required: true, help: "Comment object ID returned by content comments." },
    { name: "comment-object-type", type: "string", required: true, help: "Numeric comment object type returned by content comments." },
    { name: "comment-id", type: "string", required: true, help: "First-level comment ID." },
    pageTokenOption,
  ]
);
localCommand(
  "bilibili-reactions",
  "Fetch likes and reposts for one Bilibili / 哔哩哔哩 / B站 dynamic or opus.",
  [
    { name: "post-id", type: "string", help: "Known Bilibili post ID." },
    { name: "url", type: "string", help: "Bilibili opus or dynamic URL or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "bilibili-user-info",
  "Read Bilibili / 哔哩哔哩 / B站 creator profile data.",
  [
    { name: "user-id", type: "string", help: "Known Bilibili user ID." },
    { name: "profile-url", type: "string", help: "Bilibili profile URL or share text." },
  ]
);
localCommand(
  "bilibili-user-videos",
  "Fetch Bilibili / 哔哩哔哩 / B站 creator videos.",
  [
    { name: "user-id", type: "string", help: "Known Bilibili user ID." },
    { name: "profile-url", type: "string", help: "Bilibili profile URL or share text." },
    pageTokenOption,
    { name: "sort-type", type: "string", help: "time_descending, view_count_descending, or collect_count_descending." },
  ]
);
localCommand(
  "bilibili-user-articles",
  "Fetch Bilibili / 哔哩哔哩 / B站 creator articles.",
  [
    { name: "user-id", type: "string", help: "Known Bilibili user ID." },
    { name: "profile-url", type: "string", help: "Bilibili profile URL or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "bilibili-user-dynamics",
  "Fetch Bilibili / 哔哩哔哩 / B站 creator dynamics.",
  [
    { name: "user-id", type: "string", help: "Known Bilibili user ID." },
    { name: "profile-url", type: "string", help: "Bilibili profile URL or share text." },
    pageTokenOption,
  ]
);

localCommand("weibo-hot-search", "Fetch the current 微博 / Weibo hot-search list.");
localCommand(
  "weibo-search",
  "Search 微博 / Weibo posts with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    pageTokenOption,
  ]
);
localCommand(
  "weibo-detail",
  "Read one 微博 / Weibo post detail.",
  [
    { name: "post-id", type: "string", help: "Known Weibo post ID." },
    { name: "post-url", type: "string", help: "Weibo post URL or share text." },
  ]
);
localCommand(
  "weibo-comments",
  "Fetch 微博 / Weibo first-level comments.",
  [
    { name: "post-id", type: "string", help: "Known Weibo post ID." },
    { name: "post-url", type: "string", help: "Weibo post URL or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "weibo-replies",
  "Fetch 微博 / Weibo replies under one comment.",
  [
    { name: "post-id", type: "string", required: true, help: "Known Weibo post ID." },
    { name: "comment-id", type: "string", required: true, help: "First-level comment ID." },
    pageTokenOption,
  ]
);
localCommand(
  "weibo-likers",
  "Fetch the liker list for one 微博 / Weibo post.",
  [
    { name: "post-id", type: "string", required: true, help: "Known Weibo post ID." },
    pageTokenOption,
  ]
);
localCommand(
  "weibo-reposts",
  "Fetch the repost list for one 微博 / Weibo post.",
  [
    { name: "post-id", type: "string", required: true, help: "Known Weibo post ID." },
    pageTokenOption,
  ]
);
localCommand(
  "weibo-user-info",
  "Read 微博 / Weibo creator profile data.",
  [
    { name: "user-id", type: "string", help: "Known Weibo user ID." },
    { name: "profile-url", type: "string", help: "Weibo profile URL." },
  ]
);
localCommand(
  "weibo-user-posts",
  "Fetch 微博 / Weibo creator posts.",
  [
    { name: "user-id", type: "string", help: "Known Weibo user ID." },
    { name: "profile-url", type: "string", help: "Weibo profile URL." },
    pageTokenOption,
  ]
);

localCommand("wechat-hot-search", "Fetch the current 微信视频号 / WeChat Channels hot-search list.");
localCommand(
  "wechat-search",
  "Search 微信视频号 / WeChat Channels works with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    pageTokenOption,
    { name: "sort-type", type: "string", help: "all, time_descending, or collect_count_descending." },
    { name: "duration-range", type: "string", help: "all, under_5_min, between_5_and_20_min, or over_20_min." },
  ]
);
localCommand(
  "wechat-detail",
  "Read one 微信视频号 / WeChat Channels work detail.",
  [
    { name: "encrypted-object-id", type: "string", help: "Known encrypted_object_id." },
    { name: "url", type: "string", help: "WeChat Channels work URL or share text." },
  ]
);
localCommand(
  "wechat-article",
  "Read one WeChat Official Account article detail and body text.",
  [{ name: "url", type: "string", required: true, help: "WeChat Official Account article URL or share text." }]
);
localCommand(
  "wechat-comments",
  "Fetch 微信视频号 / WeChat Channels first-level comments.",
  [
    { name: "object-id", type: "string", help: "Known object_id; use together with object-nonce-id." },
    { name: "object-nonce-id", type: "string", help: "Known object_nonce_id; use together with object-id." },
    { name: "url", type: "string", help: "WeChat Channels work URL or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "wechat-replies",
  "Fetch 微信视频号 / WeChat Channels replies under one comment.",
  [
    { name: "object-id", type: "string", required: true, help: "Known object_id." },
    { name: "object-nonce-id", type: "string", required: true, help: "Known object_nonce_id." },
    { name: "comment-id", type: "string", required: true, help: "First-level comment ID." },
    pageTokenOption,
  ]
);
localCommand(
  "wechat-user-info",
  "Read 微信视频号 / WeChat Channels creator profile data.",
  [
    { name: "user-id", type: "string", help: "Known v2_finder_user_id." },
    { name: "url", type: "string", help: "WeChat Channels video or image-post URL or share text." },
  ]
);
localCommand(
  "wechat-user-posts",
  "Fetch 微信视频号 / WeChat Channels creator works.",
  [
    { name: "user-id", type: "string", help: "Known v2_finder_user_id." },
    { name: "url", type: "string", help: "WeChat Channels work URL or share text." },
    pageTokenOption,
  ]
);

localCommand("zhihu-hot-list", "Fetch the current 知乎 / Zhihu hot list.");
localCommand(
  "zhihu-search",
  "Search 知乎 / Zhihu content with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    pageTokenOption,
    { name: "content-type", type: "string", help: "all, answer, article, or video." },
    { name: "sort-type", type: "string", help: "general, upvote_count_descending, or time_descending." },
    { name: "publish-time-range", type: "string", help: "all, day, week, month, three_months, half_year, or year." },
  ]
);
localCommand(
  "zhihu-detail",
  "Read one 知乎 / Zhihu answer, article, or video detail.",
  [{ name: "content-url", type: "string", required: true, help: "Zhihu content URL or share text." }]
);
localCommand(
  "zhihu-comments",
  "Fetch 知乎 / Zhihu content comments.",
  [
    { name: "content-url", type: "string", required: true, help: "Zhihu content URL or share text." },
    pageTokenOption,
    { name: "sort-type", type: "string", help: "default or time_descending." },
  ]
);
localCommand(
  "zhihu-replies",
  "Fetch 知乎 / Zhihu replies under one comment.",
  [
    { name: "content-url", type: "string", required: true, help: "Zhihu content URL or share text." },
    { name: "comment-id", type: "string", required: true, help: "First-level comment ID." },
    pageTokenOption,
  ]
);
localCommand(
  "zhihu-user-info",
  "Read 知乎 / Zhihu creator profile data.",
  [{ name: "profile-url", type: "string", required: true, help: "Zhihu profile URL or share text." }]
);
localCommand(
  "zhihu-user-posts",
  "Fetch 知乎 / Zhihu creator articles.",
  [
    { name: "profile-url", type: "string", required: true, help: "Zhihu profile URL or share text." },
    pageTokenOption,
  ]
);

localCommand(
  "instagram-search",
  "Search Instagram posts with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    pageTokenOption,
  ]
);
localCommand(
  "instagram-detail",
  "Read one Instagram post detail.",
  [
    { name: "post-id", type: "string", help: "Known Instagram post ID." },
    { name: "post-url", type: "string", help: "Instagram post URL or share text." },
  ]
);
localCommand(
  "instagram-comments",
  "Fetch Instagram first-level comments.",
  [
    { name: "post-url", type: "string", required: true, help: "Instagram post URL or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "instagram-replies",
  "Fetch Instagram replies under one comment.",
  [
    { name: "post-id", type: "string", required: true, help: "Known Instagram post ID." },
    { name: "comment-id", type: "string", required: true, help: "First-level comment ID." },
    pageTokenOption,
  ]
);
localCommand(
  "instagram-user-info",
  "Read Instagram creator profile data.",
  [
    { name: "username", type: "string", help: "Instagram username." },
    { name: "profile-url", type: "string", help: "Instagram profile URL or share text." },
  ]
);
localCommand(
  "instagram-user-posts",
  "Fetch Instagram creator posts.",
  [
    { name: "username", type: "string", help: "Instagram username." },
    { name: "profile-url", type: "string", help: "Instagram profile URL or share text." },
    pageTokenOption,
  ]
);

localCommand(
  "x-search",
  "Search X / Twitter posts with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    pageTokenOption,
    { name: "sort-type", type: "string", help: "hot or time_descending." },
  ]
);
localCommand(
  "x-detail",
  "Read one X / Twitter post detail.",
  [
    { name: "post-id", type: "string", help: "Known X / Twitter post ID." },
    { name: "post-url", type: "string", help: "X / Twitter post URL or share text." },
  ]
);
localCommand(
  "x-comments",
  "Fetch X / Twitter first-level comments.",
  [
    { name: "post-id", type: "string", help: "Known X / Twitter post ID." },
    { name: "post-url", type: "string", help: "X / Twitter post URL or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "x-replies",
  "Fetch X / Twitter replies under one comment.",
  [
    { name: "post-id", type: "string", required: true, help: "Known X / Twitter post ID." },
    { name: "comment-id", type: "string", required: true, help: "First-level comment ID." },
    pageTokenOption,
  ]
);
localCommand(
  "x-user-info",
  "Read X / Twitter creator profile data.",
  [
    { name: "user-id", type: "string", help: "Known X / Twitter user ID." },
    { name: "username", type: "string", help: "X / Twitter username." },
    { name: "profile-url", type: "string", help: "X / Twitter profile URL or share text." },
  ]
);
localCommand(
  "x-user-posts",
  "Fetch X / Twitter creator posts.",
  [
    { name: "user-id", type: "string", help: "Known X / Twitter user ID." },
    { name: "username", type: "string", help: "X / Twitter username." },
    { name: "profile-url", type: "string", help: "X / Twitter profile URL or share text." },
    pageTokenOption,
  ]
);

localCommand(
  "youtube-search",
  "Search YouTube videos with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    pageTokenOption,
    { name: "sort-type", type: "string", help: "general, time_descending, view_count_descending, or rating." },
    { name: "video-type", type: "string", help: "all, video, or movie." },
    { name: "publish-time-range", type: "string", help: "all, last_hour, today, this_week, this_month, or this_year." },
    { name: "duration-range", type: "string", help: "all, under_4_min, between_4_and_20_min, or over_20_min." },
  ]
);
localCommand(
  "youtube-detail",
  "Read one YouTube video detail.",
  [{ name: "url", type: "string", required: true, help: "YouTube video URL." }]
);
localCommand(
  "youtube-comments",
  "Fetch YouTube first-level comments.",
  [
    { name: "url", type: "string", required: true, help: "YouTube video URL." },
    pageTokenOption,
    { name: "sort-type", type: "string", help: "hot or time_descending." },
  ]
);
localCommand(
  "youtube-replies",
  "Fetch YouTube replies using a returned reply_token.",
  [
    { name: "reply-token", type: "string", required: true, help: "Complete reply_token returned by a first-level comment." },
    pageTokenOption,
  ]
);
localCommand(
  "youtube-channel-info",
  "Read YouTube channel profile data.",
  [{ name: "channel-url", type: "string", required: true, help: "YouTube channel URL." }]
);
localCommand(
  "youtube-user-posts",
  "Fetch YouTube channel videos or Shorts.",
  [
    { name: "channel-url", type: "string", required: true, help: "YouTube channel URL." },
    pageTokenOption,
    { name: "video-type", type: "string", help: "video or short." },
  ]
);

localCommand(
  "tiktok-search",
  "Search TikTok posts with SocialDataX / 社媒数据助手.",
  [
    { name: "keyword", type: "string", required: true, help: "Search keyword." },
    pageTokenOption,
    { name: "content-type", type: "string", help: "all, video, or image." },
  ]
);
localCommand(
  "tiktok-detail",
  "Read one TikTok post detail.",
  [{ name: "url", type: "string", required: true, help: "TikTok post URL or share text." }]
);
localCommand(
  "tiktok-comments",
  "Fetch TikTok first-level comments.",
  [
    { name: "post-id", type: "string", help: "Known TikTok post ID." },
    { name: "url", type: "string", help: "TikTok post URL or share text." },
    pageTokenOption,
  ]
);
localCommand(
  "tiktok-replies",
  "Fetch TikTok replies under one comment.",
  [
    { name: "post-id", type: "string", required: true, help: "Known TikTok post ID." },
    { name: "comment-id", type: "string", required: true, help: "First-level comment ID." },
    pageTokenOption,
  ]
);
localCommand(
  "tiktok-user-info",
  "Read TikTok creator profile data.",
  [
    { name: "tiktok-id", type: "string", help: "Known TikTok creator ID." },
    { name: "profile-url", type: "string", help: "TikTok profile URL or share text." },
  ]
);
localCommand(
  "tiktok-user-posts",
  "Fetch TikTok creator posts.",
  [
    { name: "tiktok-id", type: "string", help: "Known TikTok creator ID." },
    { name: "profile-url", type: "string", help: "TikTok profile URL or share text." },
    pageTokenOption,
  ]
);
