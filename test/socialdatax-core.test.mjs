import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  buildSocialDataXArgs,
  buildSocialDataXCommandExample,
  buildSocialDataXProcess,
  flattenSocialDataXEnvelope,
  listSocialDataXCommands,
  runSocialDataXCommand,
} from "../lib/socialdatax-core.mjs";

const packageDir = fileURLToPath(new URL("..", import.meta.url));

test("missing API key tells users to set SOCIALDATAX_API_KEY", () => {
  assert.throws(
    () => buildSocialDataXProcess("xhs-search", { keyword: "露营" }, {}),
    /Set SOCIALDATAX_API_KEY/
  );
});

test("agent-facing examples include required or single-entrypoint arguments", () => {
  assert.equal(
    buildSocialDataXCommandExample("xhs-hot-search"),
    "opencli socialdatax xhs-hot-search -f json"
  );
  assert.equal(
    buildSocialDataXCommandExample("xhs-search", [
      { name: "keyword", type: "string", required: true },
      { name: "page-token", type: "string" },
    ]),
    'opencli socialdatax xhs-search --keyword "<keyword>" -f json'
  );
  assert.equal(
    buildSocialDataXCommandExample("xhs-detail", [
      { name: "note-id", type: "string" },
      { name: "url", type: "string" },
    ]),
    'opencli socialdatax xhs-detail --url "<url>" -f json'
  );
  assert.equal(
    buildSocialDataXCommandExample("wechat-comments", [
      { name: "object-id", type: "string" },
      { name: "object-nonce-id", type: "string" },
      { name: "url", type: "string" },
      { name: "page-token", type: "string" },
    ]),
    'opencli socialdatax wechat-comments --url "<url>" -f json'
  );
  assert.equal(
    buildSocialDataXCommandExample("bilibili-replies", [
      { name: "comment-object-id", type: "string", required: true },
      { name: "comment-object-type", type: "string", required: true },
      { name: "comment-id", type: "string", required: true },
      { name: "page-token", type: "string" },
    ]),
    'opencli socialdatax bilibili-replies --comment-object-id "<comment_object_id>" --comment-object-type "<comment_object_type>" --comment-id "<comment_id>" -f json'
  );
});

test("xhs command arguments map to socialdatax-skills CLI", () => {
  assert.deepEqual(
    buildSocialDataXArgs("xhs-hot-search", {}),
    ["xhs", "hot-search"]
  );
  assert.deepEqual(
    buildSocialDataXArgs("xhs-search", {
      keyword: "露营",
      pageToken: "next-search-token",
      sortType: "like_count_descending",
      noteType: "image",
      publishTimeRange: "week",
    }),
    [
      "xhs",
      "search",
      "--keyword",
      "露营",
      "--page-token",
      "next-search-token",
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
      "sort-type": "time_descending",
    }),
    [
      "xhs",
      "comments",
      "--note-id",
      "note-1",
      "--page-token",
      "next",
      "--sort-type",
      "time_descending",
    ]
  );
  assert.deepEqual(
    buildSocialDataXArgs("xhs-sub-comments", {
      noteId: "note-1",
      commentId: "comment-1",
    }),
    ["xhs", "sub-comments", "--note-id", "note-1", "--comment-id", "comment-1"]
  );
});

test("xhs search rejects legacy numeric page instead of silently restarting pagination", () => {
  assert.throws(
    () =>
      buildSocialDataXArgs("xhs-search", {
        keyword: "露营",
        page: 2,
      }),
    /Unsupported option page for xhs-search/
  );
});

test("douyin command arguments map to socialdatax-skills CLI", () => {
  assert.deepEqual(
    buildSocialDataXArgs("douyin-hot-search", {}),
    ["douyin", "hot-search"]
  );
  assert.deepEqual(
    buildSocialDataXArgs("douyin-search", {
      keyword: "露营",
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
      "露营",
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

test("all additional platform arguments map to socialdatax-skills CLI", () => {
  const cases = [
    [
      "kuaishou-user-search",
      { keyword: "露营", pageToken: "next" },
      ["kuaishou", "user-search", "--keyword", "露营", "--page-token", "next"],
    ],
    [
      "bilibili-search-videos",
      {
        keyword: "AI",
        "page-token": "next",
        "sort-type": "time_descending",
        "publish-time-start-date": "2026-08-01",
        "publish-time-end-date": "2026-08-31",
      },
      [
        "bilibili",
        "search-videos",
        "--keyword",
        "AI",
        "--page-token",
        "next",
        "--sort-type",
        "time_descending",
        "--publish-time-start-date",
        "2026-08-01",
        "--publish-time-end-date",
        "2026-08-31",
      ],
    ],
    [
      "bilibili-replies",
      { "comment-object-id": "123", "comment-object-type": "1", "comment-id": "456" },
      [
        "bilibili",
        "replies",
        "--comment-object-id",
        "123",
        "--comment-object-type",
        "1",
        "--comment-id",
        "456",
      ],
    ],
    [
      "weibo-comments",
      { postUrl: "https://weibo.com/1/abc", pageToken: "next" },
      [
        "weibo",
        "comments",
        "--post-url",
        "https://weibo.com/1/abc",
        "--page-token",
        "next",
      ],
    ],
    [
      "wechat-replies",
      { "object-id": "object-1", objectNonceId: "nonce-1", commentId: "comment-1" },
      [
        "wechat",
        "replies",
        "--object-id",
        "object-1",
        "--object-nonce-id",
        "nonce-1",
        "--comment-id",
        "comment-1",
      ],
    ],
    [
      "wechat-user-info",
      { url: "https://weixin.qq.com/sph/ANxgB9MB8i" },
      ["wechat", "user-info", "--url", "https://weixin.qq.com/sph/ANxgB9MB8i"],
    ],
    [
      "zhihu-search",
      { keyword: "AI", contentType: "video", sortType: "time_descending", pageToken: "next" },
      [
        "zhihu",
        "search",
        "--keyword",
        "AI",
        "--page-token",
        "next",
        "--content-type",
        "video",
        "--sort-type",
        "time_descending",
      ],
    ],
    [
      "instagram-user-info",
      { username: "socialdatax" },
      ["instagram", "user-info", "--username", "socialdatax"],
    ],
    [
      "socialdatax-x-user-posts",
      { "profile-url": "https://x.com/openai", "page-token": "next" },
      [
        "x",
        "user-posts",
        "--profile-url",
        "https://x.com/openai",
        "--page-token",
        "next",
      ],
    ],
    [
      "youtube-search",
      { keyword: "openai", videoType: "video", publishTimeRange: "this_week" },
      [
        "youtube",
        "search",
        "--keyword",
        "openai",
        "--video-type",
        "video",
        "--publish-time-range",
        "this_week",
      ],
    ],
    [
      "youtube-replies",
      { "reply-token": "reply-token", pageToken: "next" },
      ["youtube", "replies", "--reply-token", "reply-token", "--page-token", "next"],
    ],
    [
      "tiktok-comments",
      { postId: "123", "page-token": "next" },
      ["tiktok", "comments", "--post-id", "123", "--page-token", "next"],
    ],
  ];

  for (const [command, options, expected] of cases) {
    assert.deepEqual(buildSocialDataXArgs(command, options), expected, command);
  }
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
        next_page_token: "next-search-token",
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
        next_page_token: "next-search-token",
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
  assert.deepEqual(
    flattenSocialDataXEnvelope("kuaishou-hot-search", {
      data: {
        items: [{ rank: 1, keyword: "热点", hot_value: 100 }],
      },
    }),
    [{ rank: 1, keyword: "热点", hot_value: 100 }]
  );
  assert.deepEqual(
    flattenSocialDataXEnvelope("bilibili-search-videos", {
      data: {
        next_page_token: "next",
        items: [{ content_id: "BV1abc", author: { nickname: "作者" } }],
      },
    }),
    [
      {
        next_page_token: "next",
        content_id: "BV1abc",
        author_nickname: "作者",
      },
    ]
  );
});

test("new platform list results preserve confirmed top-level metadata", () => {
  const cases = [
    ["kuaishou-comments", { comment_count: 3 }],
    ["bilibili-comments", { comment_count: 4 }],
    ["bilibili-reactions", { post_id: "123", like_repost_count: 5 }],
    ["bilibili-user-articles", { article_count: 6 }],
    ["bilibili-user-dynamics", { dynamic_count: 7 }],
    ["weibo-comments", { comment_count: 8 }],
    ["wechat-comments", { comment_count: 9 }],
    ["zhihu-comments", { comment_count: 10 }],
    ["zhihu-replies", { reply_count: 11 }],
    ["instagram-comments", { post_url: "https://www.instagram.com/p/abc/", comment_count: 12 }],
    ["instagram-replies", { reply_count: 13 }],
    ["x-comments", { post_url: "https://x.com/user/status/123", comment_count: 14 }],
    ["youtube-comments", { comment_count: 15 }],
    ["tiktok-comments", { comment_count: 16 }],
    ["tiktok-replies", { reply_count: 17 }],
  ];

  for (const [command, metadata] of cases) {
    assert.deepEqual(
      flattenSocialDataXEnvelope(command, {
        data: {
          next_page_token: "next",
          ...metadata,
          items: [{ item_id: "item-1" }],
        },
      }),
      [{ next_page_token: "next", ...metadata, item_id: "item-1" }],
      command
    );
  }
});

test("empty paginated list preserves only a non-empty next page token", () => {
  assert.deepEqual(
    flattenSocialDataXEnvelope("x-search", {
      data: {
        items: [],
        next_page_token: "next",
      },
    }),
    [{ next_page_token: "next" }]
  );
  assert.deepEqual(
    flattenSocialDataXEnvelope("x-search", {
      data: {
        items: [],
        next_page_token: "",
      },
    }),
    []
  );
});

test("list rows expose later nested fields and keep pagination metadata last", () => {
  const rows = flattenSocialDataXEnvelope("x-search", {
    data: {
      items: [
        { post_id: "1", author: null },
        { post_id: "2", author: { user_id: "u2", username: "author2" } },
      ],
      next_page_token: "next",
    },
  });

  assert.deepEqual(Object.keys(rows[0]), [
    "post_id",
    "author",
    "author_user_id",
    "author_username",
    "next_page_token",
  ]);
  assert.deepEqual(rows, [
    {
      post_id: "1",
      author: "",
      author_user_id: undefined,
      author_username: undefined,
      next_page_token: "next",
    },
    {
      post_id: "2",
      author_user_id: "u2",
      author_username: "author2",
      next_page_token: "next",
    },
  ]);
  assert.deepEqual(JSON.parse(JSON.stringify(rows)), [
    {
      post_id: "1",
      author: "",
      next_page_token: "next",
    },
    {
      post_id: "2",
      author_user_id: "u2",
      author_username: "author2",
      next_page_token: "next",
    },
  ]);
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
    "快手",
    "Bilibili",
    "微博",
    "WeChat Channels",
    "知乎",
    "Instagram",
    "Twitter",
    "YouTube",
    "TikTok",
    "Xiaohongshu",
    "Douyin",
    "SocialDataX",
    "社媒数据助手",
  ]) {
    assert.match(combined, new RegExp(keyword));
  }
  assert.match(combined, /SOCIALDATAX_API_KEY/);
  assert.match(combined, /https:\/\/socialdatax\.com/);
  assert.match(combined, /xhs-hot-search/);
  assert.match(combined, /douyin-replies/);
  assert.match(combined, /kuaishou-search/);
  assert.match(combined, /bilibili-search-videos/);
  assert.match(combined, /weibo-hot-search/);
  assert.match(combined, /wechat-search/);
  assert.match(combined, /zhihu-hot-list/);
  assert.match(combined, /instagram-search/);
  assert.match(combined, /x-search/);
  assert.match(combined, /youtube-search/);
  assert.match(combined, /tiktok-search/);
  assert.match(combined, /do not infer alternate domains/);
  assert.doesNotMatch(combined, /socialdata\.tools/);
});

test("OpenCLI public surfaces preserve opaque tokens and XHS note URLs", () => {
  for (const file of ["socialdatax.ts", "socialdatax.js"]) {
    const content = readFileSync(join(packageDir, file), "utf8");
    const xhsSearchSection = content.slice(
      content.indexOf('"xhs-search"'),
      content.indexOf('"xhs-hot-search"')
    );
    assert.match(content, /complete returned `?next_page_token`?/);
    assert.match(xhsSearchSection, /pageTokenOption/);
    assert.doesNotMatch(xhsSearchSection, /name: "page"/);
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
    assert.match(content, /entire returned `note_id` exactly/);
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
  assert.match(entrypoint, /function localCommand\(name, description, options = \[\]\)/);
  assert.match(entrypoint, /xhs-search/);
  assert.match(entrypoint, /pageTokenOption/);
  assert.doesNotMatch(
    entrypoint.slice(entrypoint.indexOf('"xhs-search"'), entrypoint.indexOf('"xhs-hot-search"')),
    /name: "page"/
  );
  assert.match(entrypoint, /xhs-hot-search/);
  assert.match(entrypoint, /douyin-hot-search/);
  assert.match(entrypoint, /douyin-search/);
  assert.match(entrypoint, /douyin-replies/);
  assert.match(entrypoint, /douyin-user-series/);

  assert.doesNotMatch(entrypoint, /COMMON_COLUMNS|columns:\s*\[/);

  const registeredCommands = Array.from(
    entrypoint.matchAll(/localCommand\(\s*"([^"]+)"/g),
    (match) => match[1]
  );
  assert.deepEqual(registeredCommands.sort(), listSocialDataXCommands().sort());
});

test("package and OpenCLI manifest versions stay in sync", () => {
  const packageJson = JSON.parse(readFileSync(join(packageDir, "package.json"), "utf8"));
  const manifest = JSON.parse(readFileSync(join(packageDir, "opencli-plugin.json"), "utf8"));
  const readme = readFileSync(join(packageDir, "README.md"), "utf8");
  const skill = readFileSync(join(packageDir, "skills/socialdatax-opencli/SKILL.md"), "utf8");
  assert.equal(manifest.version, packageJson.version);
  assert.equal(packageJson.version, "0.2.1");
  assert.equal(packageJson.engines.node, ">=20.18.1");
  assert.equal(manifest.opencli, ">=1.2.0");
  assert.equal(packageJson.peerDependencies["@jackwener/opencli"], manifest.opencli);
  assert.match(readme, /Node\.js `20\.18\.1`/);
  assert.match(skill, /Node\.js `20\.18\.1`/);
  assert.match(readme, /GitHub 安装需要 OpenCLI `1\.2\.0`/);
  assert.match(readme, /本地目录安装需要 OpenCLI `1\.5\.1`/);
  assert.match(manifest.description, /11 public platforms|Xiaohongshu/);
  assert.match(manifest.description, /Kuaishou/);
  assert.match(manifest.description, /TikTok/);
  assert.match(manifest.description, /comments\/replies/);
  assert.match(manifest.description, /creator data/);
});
