import { spawn } from "node:child_process";

export const PRODUCT_NAME = "SocialDataX / 社媒数据助手";
export const PRIMARY_API_KEY_ENV = "SOCIALDATAX_API_KEY";
export const DEFAULT_PACKAGE_SPEC = "socialdatax-skills@latest";

const TOOL_COMMANDS = {
  "xhs-search": {
    platform: "xhs",
    action: "search",
    listPath: ["data", "items"],
    pageMeta: ["next_page", "total_count"],
    options: {
      keyword: "--keyword",
      page: "--page",
      sortType: "--sort-type",
      noteType: "--note-type",
      publishTimeRange: "--publish-time-range",
    },
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
};

const OPTION_ALIASES = {
  "aweme-id": "awemeId",
  "comment-id": "commentId",
  "content-type": "contentType",
  "duration-range": "durationRange",
  keyword: "keyword",
  "note-id": "noteId",
  "note-type": "noteType",
  page: "page",
  "page-token": "pageToken",
  "profile-url": "profileUrl",
  "publish-time-range": "publishTimeRange",
  "sec-user-id": "secUserId",
  "sort-type": "sortType",
  url: "url",
  "user-id": "userId",
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

export function buildSocialDataXArgs(commandName, inputOptions = {}) {
  const normalizedCommand = normalizeCommandName(commandName);
  const command = TOOL_COMMANDS[normalizedCommand];
  if (!command) {
    throw new Error(
      `Unsupported SocialDataX command "${commandName}". Use one of: ${listSocialDataXCommands().join(", ")}.`
    );
  }

  const options = normalizeOptions(inputOptions);
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
  return items.map((item) => flattenObject({ ...meta, ...item }));
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
