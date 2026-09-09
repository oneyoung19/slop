import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    slug: "claude-devtools",

    name: "Claude DevTools",

    tagline: "Inspect Claude Code's API traffic, tools and token usage.",

    category: "web-app",

    status: "building",

    tags: ["Claude", "Agent", "DevTools", "HTTP", "TypeScript"],

    createdAt: "2026-04-29",

    motivation:
      "Claude Code's system prompts, tool calls and token usage are opaque by default. I wanted a way to actually see what was going in and out of the model while iterating on agent workflows.",

    summary:
      "A developer tool for inspecting Claude Code's API requests through a local reverse proxy — system prompts, messages, tool definitions and token accounting, all visible in one place.",

    learnings: [
      "A local reverse proxy is the simplest way to observe traffic without modifying the client.",
      "Token accounting is more useful when broken down per message role, not just totals.",
    ],

    logs: [
      {
        date: "2026-04-29",
        title: "Project started",
        content:
          "Set up a local reverse proxy to intercept and log Claude Code API requests.",
      },
    ],
  },

  {
    slug: "conversation-transfer",

    name: "Conversation Transfer",

    tagline:
      "Export and transfer conversations between ChatGPT, Claude and other AI platforms.",

    category: "web-extension",

    status: "building",

    tags: ["Chrome", "ChatGPT", "Claude", "DOM", "AI", "Export"],

    createdAt: "2026-09-09",

    motivation:
      "AI conversations increasingly contain useful context, but moving that context between platforms is unnecessarily difficult.",

    summary:
      "A browser extension for exporting, transforming and transferring conversations between ChatGPT, Claude and future AI platforms.",

    learnings: [
      "Conversation extraction should use an intermediate schema.",
      "Platform-specific DOM parsing should remain isolated from export logic.",
      "Export and transfer should be treated as separate product capabilities.",
    ],

    logs: [
      {
        date: "2026-09-09",
        title: "Project started",
        content:
          "Defined the initial product direction around conversation export and cross-platform transfer.",
      },
    ],
  },
]
