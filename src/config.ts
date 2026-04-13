import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "diff-checker",
  slug: "diff-checker",
  description: "Compare two texts and show line-by-line differences with additions, deletions, and unchanged lines.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/diff",
      price: "$0.002",
      description: "Compare two texts and show line-by-line differences",
      toolName: "text_compare_diff",
      toolDescription: "Use this when you need to compare two pieces of text and see what changed between them. Shows line-by-line additions, deletions, and unchanged lines. Returns a structured diff with summary stats (lines added, removed, unchanged). Do NOT use for text classification — use text_classify_content. Do NOT use for sentiment — use text_analyze_sentiment.",
      inputSchema: {
        type: "object",
        properties: {
          text1: { type: "string", description: "The original text (base)" },
          text2: { type: "string", description: "The modified text to compare against" },
        },
        required: ["text1", "text2"],
      },
    },
  ],
};
