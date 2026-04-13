import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "diff-checker",
  slug: "diff-checker",
  description: "Compare two texts line-by-line. Returns structured diff with additions, deletions, unchanged lines, and summary stats.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/diff",
      price: "$0.002",
      description: "Compare two texts and show line-by-line differences",
      toolName: "text_compare_diff",
      toolDescription: `Use this when you need to compare two pieces of text and identify exactly what changed between them. Returns a structured line-by-line diff with summary statistics.

1. changes -- array of diff entries, each with type (added, removed, unchanged) and content
2. linesAdded -- total number of new lines in text2
3. linesRemoved -- total number of lines deleted from text1
4. linesUnchanged -- total number of identical lines
5. similarity -- percentage similarity between the two texts (0-100)

Example output: {"changes":[{"type":"unchanged","content":"line 1"},{"type":"removed","content":"old line 2"},{"type":"added","content":"new line 2"}],"linesAdded":1,"linesRemoved":1,"linesUnchanged":1,"similarity":66.7}

Use this FOR code review (comparing before/after), tracking document revisions, verifying config file changes, or auditing template modifications. Use this BEFORE deploying config changes to understand what differs.

Do NOT use for text classification -- use text_classify_content instead. Do NOT use for sentiment analysis -- use text_analyze_sentiment instead. Do NOT use for word counting -- use text_count_words instead.`,
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
