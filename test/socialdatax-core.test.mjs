import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  buildSocialDataXArgs,
  buildSocialDataXProcess,
  flattenSocialDataXEnvelope,
  runSocialDataXCommand,
} from "../lib/socialdatax-core.mjs";

const packageDir = fileURLToPath(new URL("..", import.meta.url));

test("missing API key tells users to set SOCIALDATAX_API_KEY", () => {
  assert.throws(
    () => buildSocialDataXProcess("xhs-search", { keyword: "露营桌" }, {}),
    /Set SOCIALDATAX_API_KEY/
  );
});

test("xhs command arguments map to socialdatax-skills CLI", () => {
  assert.deepEqual(
    buildSocialDataXArgs("xhs-hot-search", {}),
    ["xhs", "hot-search"]
  );
  assert.deepEqual(
    buildSocialDataXArgs("xhs-search", {
      keyword: "露营桌",
      page: 2,
      sortType: "like_count_descending",
      noteType: "image",
      publishTimeRange: "week",
    }),
    [
      "xhs",
      "search",
      "--keyword",
      "露营桌",
      "--page",
      "2",
      "--sort-type",
      "like_count_descending",
      "--note-type",
      "image",
      "--publish-time-range",
      "week",
    ]
  );
  assert.deepEqual(
    buildSocialDataXArgs("socialdatax-xhs-comments", {
      "note-id": "note-1",
      "page-token": "next",
    }),
    ["xhs", "comments", "--note-id", "note-1", "--page-token", "next"]
  );
  assert.deepEqual(
    buildSocialDataXArgs("xhs-sub-comments", {
      noteId: "note-1",
      commentId: "comment-1",
    }),
    ["xhs", "sub-comments", "--note-id", "note-1", "--comment-id", "comment-1"]
  );
});

test("douyin command arguments map to socialdatax-skills CLI", () => {
  assert.deepEqual(
    buildSocialDataXArgs("douyin-hot-search", {}),
    ["douyin", "hot-search"]
  );
  assert.deepEqual(
    buildSocialDataXArgs("douyin-search", {
      keyword: "露营桌",
      pageToken: "page-2",
      sortType: "time_descending",
      publishTimeRange: "day",
      durationRange: "under_1_minute",
      contentType: "video",
    }),
    [
      "douyin",
      "search",
      "--keyword",
      "露营桌",
      "--page-token",
      "page-2",
      "--sort-type",
      "time_descending",
      "--publish-time-range",
      "day",
      "--duration-range",
      "under_1_minute",
      "--content-type",
      "video",
    ]
  );
  assert.deepEqual(
    buildSocialDataXArgs("douyin-user-posts", {
      "sec-user-id": "sec-1",
      "page-token": "next",
    }),
    ["douyin", "user-posts", "--sec-user-id", "sec-1", "--page-token", "next"]
  );
  assert.deepEqual(
    buildSocialDataXArgs("douyin-replies", {
      "aweme-id": "aweme-1",
      "comment-id": "comment-1",
      "page-token": "next",
    }),
    [
      "douyin",
      "replies",
      "--aweme-id",
      "aweme-1",
      "--comment-id",
      "comment-1",
      "--page-token",
      "next",
    ]
  );
  assert.deepEqual(
    buildSocialDataXArgs("douyin-user-series", {
      "profile-url": "https://www.douyin.com/user/sec-1",
      "page-token": "next",
    }),
    [
      "douyin",
      "user-series",
      "--profile-url",
      "https://www.douyin.com/user/sec-1",
      "--page-token",
      "next",
    ]
  );
});

test("process builder uses npx by default and mock bin for tests", () => {
  assert.deepEqual(
    buildSocialDataXProcess(
      "douyin-detail",
      { awemeId: "aweme-1" },
      { SOCIALDATAX_API_KEY: "key" }
    ),
    {
      file: "npx",
      args: ["-y", "socialdatax-skills@latest", "douyin", "detail", "--aweme-id", "aweme-1"],
    }
  );
  assert.deepEqual(
    buildSocialDataXProcess(
      "douyin-detail",
      { awemeId: "aweme-1" },
      { SOCIALDATAX_API_KEY: "key", SOCIALDATAX_OPENCLI_SKILLS_BIN: "/tmp/mock" }
    ),
    {
      file: "/tmp/mock",
      args: ["douyin", "detail", "--aweme-id", "aweme-1"],
    }
  );
});

test("list results are flattened with pagination metadata", () => {
  assert.deepEqual(
    flattenSocialDataXEnvelope("xhs-search", {
      data: {
        next_page: 2,
        total_count: 12,
        items: [
          {
            note_id: "note-1",
            author: { nickname: "作者" },
            image_urls: ["https://example.com/a.jpg"],
          },
        ],
      },
    }),
    [
      {
        next_page: 2,
        total_count: 12,
        note_id: "note-1",
        author_nickname: "作者",
        image_urls: "[\"https://example.com/a.jpg\"]",
      },
    ]
  );
  assert.deepEqual(
    flattenSocialDataXEnvelope("douyin-comments", {
      data: {
        next_page_token: "next",
        comment_count: 5,
        items: [{ comment_id: "c1", author: { nickname: "评论者" } }],
      },
    }),
    [
      {
        next_page_token: "next",
        comment_count: 5,
        comment_id: "c1",
        author_nickname: "评论者",
      },
    ]
  );
  assert.deepEqual(
    flattenSocialDataXEnvelope("douyin-replies", {
      data: {
        next_page_token: "reply-next",
        comment_count: 2,
        items: [{ comment_id: "reply-1", author: { nickname: "回复者" } }],
      },
    }),
    [
      {
        next_page_token: "reply-next",
        comment_count: 2,
        comment_id: "reply-1",
        author_nickname: "回复者",
      },
    ]
  );
  assert.deepEqual(
    flattenSocialDataXEnvelope("xhs-hot-search", {
      data: {
        items: [
          {
            title: "热点",
            hot_value: 123,
          },
        ],
      },
    }),
    [
      {
        title: "热点",
        hot_value: 123,
      },
    ]
  );
  assert.deepEqual(
    flattenSocialDataXEnvelope("douyin-hot-search", {
      data: {
        hot_items: [
          {
            rank: 1,
            keyword: "热点",
            tag: "社会",
          },
        ],
      },
    }),
    [
      {
        rank: 1,
        keyword: "热点",
        tag: "社会",
      },
    ]
  );
});

test("single-object results are flattened as one row", () => {
  assert.deepEqual(
    flattenSocialDataXEnvelope("douyin-user-info", {
      data: {
        sec_user_id: "sec-1",
        profile: { nickname: "创作者" },
      },
    }),
    [
      {
        sec_user_id: "sec-1",
        profile_nickname: "创作者",
      },
    ]
  );
});

test("runner can use a mock socialdatax-skills bin", async () => {
  const calls = [];
  const rows = await runSocialDataXCommand(
    "xhs-user-posts",
    { userId: "user-1" },
    {
      env: {
        SOCIALDATAX_API_KEY: "key",
        SOCIALDATAX_OPENCLI_SKILLS_BIN: "/tmp/mock-socialdatax",
      },
      async spawn(file, args) {
        calls.push({ file, args });
        return {
          data: {
            next_page_token: "next",
            items: [{ note_id: "note-1", title: "标题" }],
          },
        };
      },
    }
  );

  assert.deepEqual(calls, [
    {
      file: "/tmp/mock-socialdatax",
      args: ["xhs", "user-posts", "--user-id", "user-1"],
    },
  ]);
  assert.deepEqual(rows, [
    {
      next_page_token: "next",
      note_id: "note-1",
      title: "标题",
    },
  ]);
});

test("metadata docs and skill contain bilingual search keywords", () => {
  const files = [
    "package.json",
    "opencli-plugin.json",
    "README.md",
    "skills/socialdatax-opencli/SKILL.md",
  ];
  const combined = files
    .map((file) => readFileSync(join(packageDir, file), "utf8"))
    .join("\n");
  for (const keyword of [
    "小红书",
    "抖音",
    "Xiaohongshu",
    "Douyin",
    "SocialDataX",
    "社媒数据助手",
  ]) {
    assert.match(combined, new RegExp(keyword));
  }
  assert.match(combined, /SOCIALDATAX_API_KEY/);
  assert.match(combined, /https:\/\/socialdatax\.52choujiang\.com/);
  assert.match(combined, /xhs-hot-search/);
  assert.match(combined, /douyin-replies/);
  assert.match(combined, /do not infer alternate domains/);
  assert.doesNotMatch(combined, /socialdata\.tools/);
});

test("OpenCLI public surfaces preserve opaque tokens and XHS note URLs", () => {
  for (const file of ["socialdatax.ts", "socialdatax.js"]) {
    const content = readFileSync(join(packageDir, file), "utf8");
    assert.match(content, /complete returned `?next_page_token`?/);
    assert.match(
      content,
      /Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses/
    );
    assert.doesNotMatch(content, /Opaque pagination token returned by the previous page/);
  }

  for (const file of [
    "README.md",
    "skills/socialdatax-opencli/SKILL.md",
  ]) {
    const content = readFileSync(join(packageDir, file), "utf8");
    assert.match(content, /complete returned `next_page_token`/);
    assert.match(
      content,
      /Do not modify, truncate, redact, mask, omit, normalize, rebuild, generate, or replace the middle with ellipses/
    );
    assert.match(
      content,
      /in every use of a returned `note_url`, such as final answers, display, references, storage, output, or forwarding/
    );
    assert.match(content, /including `xsec_token` query parameters/);
    assert.match(
      content,
      /Do not modify, truncate, redact, normalize, rebuild, or replace it with a link assembled from `note_id`/
    );
    assert.match(content, /complete 24-character lowercase hex ID/);
    assert.match(content, /If `note_url` is null, do not synthesize a public link from `note_id`/);
  }
});

test("package ships a precompiled OpenCLI JS entrypoint", () => {
  const packageJson = JSON.parse(readFileSync(join(packageDir, "package.json"), "utf8"));
  assert.ok(packageJson.files.includes("socialdatax.js"));

  const entrypoint = readFileSync(join(packageDir, "socialdatax.js"), "utf8");
  assert.equal(entrypoint, readFileSync(join(packageDir, "socialdatax.ts"), "utf8"));
  assert.match(entrypoint, /@jackwener\/opencli\/registry/);
  assert.match(entrypoint, /site: "socialdatax"/);
  assert.match(entrypoint, /xhs-search/);
  assert.match(entrypoint, /xhs-hot-search/);
  assert.match(entrypoint, /"hot_value"/);
  assert.match(entrypoint, /douyin-hot-search/);
  assert.match(entrypoint, /douyin-search/);
  assert.match(entrypoint, /douyin-replies/);
  assert.match(entrypoint, /douyin-user-series/);
});

test("package and OpenCLI manifest versions stay in sync", () => {
  const packageJson = JSON.parse(readFileSync(join(packageDir, "package.json"), "utf8"));
  const manifest = JSON.parse(readFileSync(join(packageDir, "opencli-plugin.json"), "utf8"));
  assert.equal(manifest.version, packageJson.version);
  assert.equal(packageJson.engines.node, ">=20.18.1");
  assert.match(manifest.description, /Xiaohongshu search hot list/);
  assert.match(manifest.description, /Douyin hot search/);
  assert.match(manifest.description, /comments\/replies/);
  assert.match(manifest.description, /creator short-drama series/);
});
