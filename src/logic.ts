import type { Hono } from "hono";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  lineNumber: { old?: number; new?: number };
  content: string;
}

function computeDiff(text1: string, text2: string): DiffLine[] {
  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");
  const m = lines1.length;
  const n = lines2.length;

  // LCS dynamic programming
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (lines1[i - 1] === lines2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build diff
  const diff: DiffLine[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
      diff.unshift({ type: "unchanged", lineNumber: { old: i, new: j }, content: lines1[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.unshift({ type: "added", lineNumber: { new: j }, content: lines2[j - 1] });
      j--;
    } else {
      diff.unshift({ type: "removed", lineNumber: { old: i }, content: lines1[i - 1] });
      i--;
    }
  }

  return diff;
}

export function registerRoutes(app: Hono) {
  app.post("/api/diff", async (c) => {
    const body = await c.req.json().catch(() => null);
    if (!body?.text1 || !body?.text2) {
      return c.json({ error: "Missing required fields: text1 and text2" }, 400);
    }

    const text1: string = body.text1;
    const text2: string = body.text2;
    const diff = computeDiff(text1, text2);

    const added = diff.filter((d) => d.type === "added").length;
    const removed = diff.filter((d) => d.type === "removed").length;
    const unchanged = diff.filter((d) => d.type === "unchanged").length;

    return c.json({
      diff,
      summary: {
        totalLines: diff.length,
        added,
        removed,
        unchanged,
        identical: added === 0 && removed === 0,
      },
    });
  });
}
