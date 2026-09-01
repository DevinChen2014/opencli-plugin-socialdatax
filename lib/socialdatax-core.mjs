import { spawn } from "node:child_process";

export const PRODUCT_NAME = "SocialDataX / 社媒数据助手";
export const PRIMARY_API_KEY_ENV = "SOCIALDATAX_API_KEY";
export const DEFAULT_PACKAGE_SPEC = "socialdatax-skills@latest";

const TOOL_COMMANDS = {
  "xhs-search": {
    platform: "xhs",
    action: "search",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "total_count"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
      sortType: "--sort-type",
      noteType: "--note-type",
      publishTimeRange: "--publish-time-range",
    },
  },
  "xhs-hot-search": {
    platform: "xhs",
    action: "hot-search",
    listPath: ["data", "items"],
    pageMeta: [],
    options: {},
  },
  "xhs-detail": {
    platform: "xhs",
    action: "detail",
    options: {
      noteId: "--note-id",
      url: "--url",
    },
  },
  "xhs-comments": {
    platform: "xhs",
    action: "comments",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "comment_count", "top_level_comment_count"],
    options: {
      noteId: "--note-id",
      url: "--url",
      pageToken: "--page-token",
      sortType: "--sort-type",
    },
  },
  "xhs-sub-comments": {
    platform: "xhs",
    action: "sub-comments",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      noteId: "--note-id",
      commentId: "--comment-id",
      pageToken: "--page-token",
    },
  },
  "xhs-user-info": {
    platform: "xhs",
    action: "user-info",
    options: {
      userId: "--user-id",
      profileUrl: "--profile-url",
    },
  },
  "xhs-user-posts": {
    platform: "xhs",
    action: "user-posts",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      userId: "--user-id",
      profileUrl: "--profile-url",
      pageToken: "--page-token",
    },
  },
  "douyin-hot-search": {
    platform: "douyin",
    action: "hot-search",
    listPath: ["data", "hot_items"],
    pageMeta: [],
    options: {},
  },
  "douyin-search": {
    platform: "douyin",
    action: "search",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
      sortType: "--sort-type",
      publishTimeRange: "--publish-time-range",
      durationRange: "--duration-range",
      contentType: "--content-type",
    },
  },
  "douyin-detail": {
    platform: "douyin",
    action: "detail",
    options: {
      awemeId: "--aweme-id",
      url: "--url",
    },
  },
  "douyin-comments": {
    platform: "douyin",
    action: "comments",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "comment_count"],
    options: {
      awemeId: "--aweme-id",
      url: "--url",
      pageToken: "--page-token",
    },
  },
  "douyin-replies": {
    platform: "douyin",
    action: "replies",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "comment_count"],
    options: {
      awemeId: "--aweme-id",
      commentId: "--comment-id",
      pageToken: "--page-token",
    },
  },
  "douyin-user-info": {
    platform: "douyin",
    action: "user-info",
    options: {
      secUserId: "--sec-user-id",
      profileUrl: "--profile-url",
    },
  },
  "douyin-user-posts": {
    platform: "douyin",
    action: "user-posts",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      secUserId: "--sec-user-id",
      profileUrl: "--profile-url",
      pageToken: "--page-token",
    },
  },
  "douyin-user-series": {
    platform: "douyin",
    action: "user-series",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      secUserId: "--sec-user-id",
      profileUrl: "--profile-url",
      pageToken: "--page-token",
    },
  },
  "kuaishou-hot-search": {
    platform: "kuaishou",
    action: "hot-search",
    listPath: ["data", "items"],
    pageMeta: [],
    options: {},
  },
  "kuaishou-search": {
    platform: "kuaishou",
    action: "search",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
    },
  },
  "kuaishou-user-search": {
    platform: "kuaishou",
    action: "user-search",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
    },
  },
  "kuaishou-detail": {
    platform: "kuaishou",
    action: "detail",
    options: {
      photoId: "--photo-id",
      url: "--url",
    },
  },
  "kuaishou-comments": {
    platform: "kuaishou",
    action: "comments",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "comment_count"],
    options: {
      photoId: "--photo-id",
      url: "--url",
      pageToken: "--page-token",
    },
  },
  "kuaishou-replies": {
    platform: "kuaishou",
    action: "replies",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      photoId: "--photo-id",
      commentId: "--comment-id",
      pageToken: "--page-token",
    },
  },
  "kuaishou-user-info": {
    platform: "kuaishou",
    action: "user-info",
    options: {
      userId: "--user-id",
      profileUrl: "--profile-url",
    },
  },
  "kuaishou-user-posts": {
    platform: "kuaishou",
    action: "user-posts",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      userId: "--user-id",
      profileUrl: "--profile-url",
      pageToken: "--page-token",
    },
  },
  "bilibili-search-videos": {
    platform: "bilibili",
    action: "search-videos",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
      sortType: "--sort-type",
      publishTimeRange: "--publish-time-range",
      publishTimeStartDate: "--publish-time-start-date",
      publishTimeEndDate: "--publish-time-end-date",
      durationRange: "--duration-range",
    },
  },
  "bilibili-search-articles": {
    platform: "bilibili",
    action: "search-articles",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
      sortType: "--sort-type",
      category: "--category",
    },
  },
  "bilibili-detail": {
    platform: "bilibili",
    action: "detail",
    options: {
      contentId: "--content-id",
      url: "--url",
    },
  },
  "bilibili-comments": {
    platform: "bilibili",
    action: "comments",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "comment_count"],
    options: {
      contentId: "--content-id",
      url: "--url",
      pageToken: "--page-token",
      sortType: "--sort-type",
    },
  },
  "bilibili-replies": {
    platform: "bilibili",
    action: "replies",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      commentObjectId: "--comment-object-id",
      commentObjectType: "--comment-object-type",
      commentId: "--comment-id",
      pageToken: "--page-token",
    },
  },
  "bilibili-reactions": {
    platform: "bilibili",
    action: "reactions",
    listPath: ["data", "items"],
    pageMeta: ["post_id", "next_page_token", "like_repost_count"],
    options: {
      postId: "--post-id",
      url: "--url",
      pageToken: "--page-token",
    },
  },
  "bilibili-user-info": {
    platform: "bilibili",
    action: "user-info",
    options: {
      userId: "--user-id",
      profileUrl: "--profile-url",
    },
  },
  "bilibili-user-videos": {
    platform: "bilibili",
    action: "user-videos",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      userId: "--user-id",
      profileUrl: "--profile-url",
      pageToken: "--page-token",
      sortType: "--sort-type",
    },
  },
  "bilibili-user-articles": {
    platform: "bilibili",
    action: "user-articles",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "article_count"],
    options: {
      userId: "--user-id",
      profileUrl: "--profile-url",
      pageToken: "--page-token",
    },
  },
  "bilibili-user-dynamics": {
    platform: "bilibili",
    action: "user-dynamics",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "dynamic_count"],
    options: {
      userId: "--user-id",
      profileUrl: "--profile-url",
      pageToken: "--page-token",
    },
  },
  "weibo-hot-search": {
    platform: "weibo",
    action: "hot-search",
    listPath: ["data", "items"],
    pageMeta: [],
    options: {},
  },
  "weibo-search": {
    platform: "weibo",
    action: "search",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
    },
  },
  "weibo-detail": {
    platform: "weibo",
    action: "detail",
    options: {
      postId: "--post-id",
      postUrl: "--post-url",
    },
  },
  "weibo-comments": {
    platform: "weibo",
    action: "comments",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "comment_count"],
    options: {
      postId: "--post-id",
      postUrl: "--post-url",
      pageToken: "--page-token",
    },
  },
  "weibo-replies": {
    platform: "weibo",
    action: "replies",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      postId: "--post-id",
      commentId: "--comment-id",
      pageToken: "--page-token",
    },
  },
  "weibo-likers": {
    platform: "weibo",
    action: "likers",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      postId: "--post-id",
      pageToken: "--page-token",
    },
  },
  "weibo-reposts": {
    platform: "weibo",
    action: "reposts",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      postId: "--post-id",
      pageToken: "--page-token",
    },
  },
  "weibo-user-info": {
    platform: "weibo",
    action: "user-info",
    options: {
      userId: "--user-id",
      profileUrl: "--profile-url",
    },
  },
  "weibo-user-posts": {
    platform: "weibo",
    action: "user-posts",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      userId: "--user-id",
      profileUrl: "--profile-url",
      pageToken: "--page-token",
    },
  },
  "wechat-hot-search": {
    platform: "wechat",
    action: "hot-search",
    listPath: ["data", "items"],
    pageMeta: [],
    options: {},
  },
  "wechat-search": {
    platform: "wechat",
    action: "search",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
      sortType: "--sort-type",
      durationRange: "--duration-range",
    },
  },
  "wechat-detail": {
    platform: "wechat",
    action: "detail",
    options: {
      encryptedObjectId: "--encrypted-object-id",
      url: "--url",
    },
  },
  "wechat-article": {
    platform: "wechat",
    action: "article",
    options: {
      url: "--url",
    },
  },
  "wechat-comments": {
    platform: "wechat",
    action: "comments",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "comment_count"],
    options: {
      objectId: "--object-id",
      objectNonceId: "--object-nonce-id",
      url: "--url",
      pageToken: "--page-token",
    },
  },
  "wechat-replies": {
    platform: "wechat",
    action: "replies",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      objectId: "--object-id",
      objectNonceId: "--object-nonce-id",
      commentId: "--comment-id",
      pageToken: "--page-token",
    },
  },
  "wechat-user-info": {
    platform: "wechat",
    action: "user-info",
    options: {
      userId: "--user-id",
      url: "--url",
    },
  },
  "wechat-user-posts": {
    platform: "wechat",
    action: "user-posts",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      userId: "--user-id",
      url: "--url",
      pageToken: "--page-token",
    },
  },
  "zhihu-hot-list": {
    platform: "zhihu",
    action: "hot-list",
    listPath: ["data", "items"],
    pageMeta: [],
    options: {},
  },
  "zhihu-search": {
    platform: "zhihu",
    action: "search",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
      contentType: "--content-type",
      sortType: "--sort-type",
      publishTimeRange: "--publish-time-range",
    },
  },
  "zhihu-detail": {
    platform: "zhihu",
    action: "detail",
    options: {
      contentUrl: "--content-url",
    },
  },
  "zhihu-comments": {
    platform: "zhihu",
    action: "comments",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "comment_count"],
    options: {
      contentUrl: "--content-url",
      pageToken: "--page-token",
      sortType: "--sort-type",
    },
  },
  "zhihu-replies": {
    platform: "zhihu",
    action: "replies",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "reply_count"],
    options: {
      contentUrl: "--content-url",
      commentId: "--comment-id",
      pageToken: "--page-token",
    },
  },
  "zhihu-user-info": {
    platform: "zhihu",
    action: "user-info",
    options: {
      profileUrl: "--profile-url",
    },
  },
  "zhihu-user-posts": {
    platform: "zhihu",
    action: "user-posts",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      profileUrl: "--profile-url",
      pageToken: "--page-token",
    },
  },
  "instagram-search": {
    platform: "instagram",
    action: "search",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
    },
  },
  "instagram-detail": {
    platform: "instagram",
    action: "detail",
    options: {
      postId: "--post-id",
      postUrl: "--post-url",
    },
  },
  "instagram-comments": {
    platform: "instagram",
    action: "comments",
    listPath: ["data", "items"],
    pageMeta: ["post_url", "next_page_token", "comment_count"],
    options: {
      postUrl: "--post-url",
      pageToken: "--page-token",
    },
  },
  "instagram-replies": {
    platform: "instagram",
    action: "replies",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "reply_count"],
    options: {
      postId: "--post-id",
      commentId: "--comment-id",
      pageToken: "--page-token",
    },
  },
  "instagram-user-info": {
    platform: "instagram",
    action: "user-info",
    options: {
      username: "--username",
      profileUrl: "--profile-url",
    },
  },
  "instagram-user-posts": {
    platform: "instagram",
    action: "user-posts",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      username: "--username",
      profileUrl: "--profile-url",
      pageToken: "--page-token",
    },
  },
  "x-search": {
    platform: "x",
    action: "search",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
      sortType: "--sort-type",
    },
  },
  "x-detail": {
    platform: "x",
    action: "detail",
    options: {
      postId: "--post-id",
      postUrl: "--post-url",
    },
  },
  "x-comments": {
    platform: "x",
    action: "comments",
    listPath: ["data", "items"],
    pageMeta: ["post_url", "next_page_token", "comment_count"],
    options: {
      postId: "--post-id",
      postUrl: "--post-url",
      pageToken: "--page-token",
    },
  },
  "x-replies": {
    platform: "x",
    action: "replies",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      postId: "--post-id",
      commentId: "--comment-id",
      pageToken: "--page-token",
    },
  },
  "x-user-info": {
    platform: "x",
    action: "user-info",
    options: {
      userId: "--user-id",
      username: "--username",
      profileUrl: "--profile-url",
    },
  },
  "x-user-posts": {
    platform: "x",
    action: "user-posts",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      userId: "--user-id",
      username: "--username",
      profileUrl: "--profile-url",
      pageToken: "--page-token",
    },
  },
  "youtube-search": {
    platform: "youtube",
    action: "search",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
      sortType: "--sort-type",
      videoType: "--video-type",
      publishTimeRange: "--publish-time-range",
      durationRange: "--duration-range",
    },
  },
  "youtube-detail": {
    platform: "youtube",
    action: "detail",
    options: {
      url: "--url",
    },
  },
  "youtube-comments": {
    platform: "youtube",
    action: "comments",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "comment_count"],
    options: {
      url: "--url",
      pageToken: "--page-token",
      sortType: "--sort-type",
    },
  },
  "youtube-replies": {
    platform: "youtube",
    action: "replies",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      replyToken: "--reply-token",
      pageToken: "--page-token",
    },
  },
  "youtube-channel-info": {
    platform: "youtube",
    action: "channel-info",
    options: {
      channelUrl: "--channel-url",
    },
  },
  "youtube-user-posts": {
    platform: "youtube",
    action: "user-posts",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      channelUrl: "--channel-url",
      pageToken: "--page-token",
      videoType: "--video-type",
    },
  },
  "tiktok-search": {
    platform: "tiktok",
    action: "search",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      keyword: "--keyword",
      pageToken: "--page-token",
      contentType: "--content-type",
    },
  },
  "tiktok-detail": {
    platform: "tiktok",
    action: "detail",
    options: {
      url: "--url",
    },
  },
  "tiktok-comments": {
    platform: "tiktok",
    action: "comments",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "comment_count"],
    options: {
      postId: "--post-id",
      url: "--url",
      pageToken: "--page-token",
    },
  },
  "tiktok-replies": {
    platform: "tiktok",
    action: "replies",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token", "reply_count"],
    options: {
      postId: "--post-id",
      commentId: "--comment-id",
      pageToken: "--page-token",
    },
  },
  "tiktok-user-info": {
    platform: "tiktok",
    action: "user-info",
    options: {
      tiktokId: "--tiktok-id",
      profileUrl: "--profile-url",
    },
  },
  "tiktok-user-posts": {
    platform: "tiktok",
    action: "user-posts",
    listPath: ["data", "items"],
    pageMeta: ["next_page_token"],
    options: {
      tiktokId: "--tiktok-id",
      profileUrl: "--profile-url",
      pageToken: "--page-token",
    },
  },
};

const OPTION_ALIASES = {
  "aweme-id": "awemeId",
  category: "category",
  "channel-url": "channelUrl",
  "comment-id": "commentId",
  "comment-object-id": "commentObjectId",
  "comment-object-type": "commentObjectType",
  "content-id": "contentId",
  "content-type": "contentType",
  "content-url": "contentUrl",
  "duration-range": "durationRange",
  "encrypted-object-id": "encryptedObjectId",
  keyword: "keyword",
  "note-id": "noteId",
  "note-type": "noteType",
  "object-id": "objectId",
  "object-nonce-id": "objectNonceId",
  "page-token": "pageToken",
  "photo-id": "photoId",
  "post-id": "postId",
  "post-url": "postUrl",
  "profile-url": "profileUrl",
  "publish-time-end-date": "publishTimeEndDate",
  "publish-time-range": "publishTimeRange",
  "publish-time-start-date": "publishTimeStartDate",
  "reply-token": "replyToken",
  "sec-user-id": "secUserId",
  "sort-type": "sortType",
  "tiktok-id": "tiktokId",
  url: "url",
  "user-id": "userId",
  username: "username",
  "video-type": "videoType",
};

export function listSocialDataXCommands() {
  return Object.keys(TOOL_COMMANDS);
}

export function normalizeCommandName(commandName) {
  return commandName.replace(/^socialdatax[-:]/, "");
}

export function normalizeOptions(input = {}) {
  const normalized = {};
  for (const [key, value] of Object.entries(input)) {
    const canonical = OPTION_ALIASES[key] || key;
    normalized[canonical] = value;
  }
  return normalized;
}

export function buildSocialDataXCommandExample(commandName, options = []) {
  const requiredOptions = options.filter((option) => option.required);
  const urlOption = options.find((option) =>
    option.name === "url" || option.name.endsWith("-url")
  );
  const exampleOptions = requiredOptions.length > 0
    ? requiredOptions
    : [urlOption || options[0]].filter(Boolean);
  const parts = ["opencli", "socialdatax", commandName];

  for (const option of exampleOptions) {
    parts.push(`--${option.name}`);
    if (option.type !== "bool" && option.type !== "boolean") {
      parts.push(`"<${option.name.replaceAll("-", "_")}>"`);
    }
  }

  parts.push("-f", "json");
  return parts.join(" ");
}

export function buildSocialDataXArgs(commandName, inputOptions = {}) {
  const normalizedCommand = normalizeCommandName(commandName);
  const command = TOOL_COMMANDS[normalizedCommand];
  if (!command) {
    throw new Error(
      `Unsupported SocialDataX command "${commandName}". Use one of: ${listSocialDataXCommands().join(", ")}.`
    );
  }

  const options = normalizeOptions(inputOptions);
  validateRemovedOptions(normalizedCommand, options);
  const args = [command.platform, command.action];
  for (const [optionKey, cliFlag] of Object.entries(command.options)) {
    const value = options[optionKey];
    if (value === undefined || value === null || value === false || value === "") {
      continue;
    }
    args.push(cliFlag, String(value));
  }
  return args;
}

function validateRemovedOptions(commandName, options) {
  if (commandName === "xhs-search" && Object.prototype.hasOwnProperty.call(options, "page")) {
    throw new Error(
      "Unsupported option page for xhs-search. Use pageToken or page-token with the returned next_page_token."
    );
  }
}

export function buildSocialDataXProcess(commandName, inputOptions = {}, env = process.env) {
  const apiKey = env[PRIMARY_API_KEY_ENV];
  if (!apiKey) {
    throw new Error(`Missing API Key. Set ${PRIMARY_API_KEY_ENV} before running SocialDataX OpenCLI commands.`);
  }

  const mockBin = env.SOCIALDATAX_OPENCLI_SKILLS_BIN;
  if (mockBin) {
    return {
      file: mockBin,
      args: buildSocialDataXArgs(commandName, inputOptions),
    };
  }

  return {
    file: "npx",
    args: ["-y", env.SOCIALDATAX_OPENCLI_PACKAGE_SPEC || DEFAULT_PACKAGE_SPEC, ...buildSocialDataXArgs(commandName, inputOptions)],
  };
}

export async function runSocialDataXCommand(commandName, inputOptions = {}, runtime = {}) {
  const env = runtime.env || process.env;
  const spawn = runtime.spawn || spawnJsonCommand;
  const processSpec = buildSocialDataXProcess(commandName, inputOptions, env);
  const envelope = await spawn(processSpec.file, processSpec.args, {
    env: { ...env },
  });
  return flattenSocialDataXEnvelope(commandName, envelope);
}

export async function spawnJsonCommand(file, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(file, args, {
      env: options.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (status) => {
      if (status !== 0) {
        reject(new Error(trimError(stderr) || `socialdatax-skills exited with status ${status}.`));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (error) {
        reject(new Error(`Failed to parse socialdatax-skills JSON output: ${error.message}`));
      }
    });
  });
}

export function flattenSocialDataXEnvelope(commandName, envelope) {
  const normalizedCommand = normalizeCommandName(commandName);
  const command = TOOL_COMMANDS[normalizedCommand];
  if (!command) {
    throw new Error(`Unsupported SocialDataX command "${commandName}".`);
  }
  if (!command.listPath) {
    return [flattenObject(envelope?.data ?? envelope)];
  }

  const items = getPath(envelope, command.listPath);
  if (!Array.isArray(items)) {
    return [];
  }

  const meta = {};
  for (const key of command.pageMeta || []) {
    if (envelope?.data && Object.prototype.hasOwnProperty.call(envelope.data, key)) {
      meta[key] = envelope.data[key];
    }
  }

  if (items.length === 0) {
    const nextPageToken = meta.next_page_token;
    return nextPageToken === undefined || nextPageToken === null || nextPageToken === ""
      ? []
      : [flattenObject(meta)];
  }

  const rows = exposeAllColumnsOnFirstRow(items.map((item) => flattenObject(item)));
  const flattenedMeta = flattenObject(meta);
  return rows.map((row) => appendMissingFields(row, flattenedMeta));
}

function exposeAllColumnsOnFirstRow(rows) {
  const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const firstRow = {};
  for (const key of keys) {
    firstRow[key] = Object.prototype.hasOwnProperty.call(rows[0], key)
      ? rows[0][key]
      : undefined;
  }
  return [firstRow, ...rows.slice(1)];
}

function appendMissingFields(row, fields) {
  const merged = { ...row };
  for (const [key, value] of Object.entries(fields)) {
    if (!Object.prototype.hasOwnProperty.call(merged, key)) {
      merged[key] = value;
    }
  }
  return merged;
}

export function flattenObject(value, prefix = "", output = {}) {
  if (value === null || value === undefined) {
    if (prefix) {
      output[prefix] = value ?? "";
    }
    return output;
  }
  if (Array.isArray(value)) {
    if (prefix) {
      output[prefix] = JSON.stringify(value);
    }
    return output;
  }
  if (typeof value !== "object") {
    if (prefix) {
      output[prefix] = value;
    }
    return output;
  }
  for (const [key, child] of Object.entries(value)) {
    const childKey = prefix ? `${prefix}_${key}` : key;
    if (child && typeof child === "object" && !Array.isArray(child)) {
      flattenObject(child, childKey, output);
    } else if (Array.isArray(child)) {
      output[childKey] = JSON.stringify(child);
    } else {
      output[childKey] = child ?? "";
    }
  }
  return output;
}

function getPath(value, path) {
  return path.reduce((current, key) => current?.[key], value);
}

function trimError(text) {
  return String(text || "").trim();
}
