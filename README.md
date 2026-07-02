# Diff Checker API

[![MCP Server](https://img.shields.io/badge/MCP-server-blue)](https://diff-checker.api.klymax402.com/mcp)
[![x402](https://img.shields.io/badge/payments-x402-6E56CF)](https://x402.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Compare two texts line-by-line. Returns structured diff with additions, deletions, unchanged lines, and summary stats. Pay-per-call via [x402](https://x402.org) (USDC on Base L2) -- no API key, no signup, no rate-limit wall.

Part of the [klymax402](https://klymax402.com) marketplace -- 100 x402 micropayment APIs for AI agents, one wallet, USDC on Base.

## Quickstart -- MCP

Add to your MCP client config (Claude Desktop, Cursor, ElizaOS, etc.):

```json
{
  "mcpServers": {
    "diff-checker": {
      "url": "https://diff-checker.api.klymax402.com/mcp"
    }
  }
}
```

## Quickstart -- HTTP (x402)

```bash
curl -X POST "https://diff-checker.api.klymax402.com/api/diff" \
  -H "Content-Type: application/json" \
  -d '{"text1":"...","text2":"..."}'
# -> 402 Payment Required, with an x402 payment challenge in the response body
```

Any x402-aware client ([`@x402/fetch`](https://www.npmjs.com/package/@x402/fetch), [`x402-agent-tools`](https://www.npmjs.com/package/x402-agent-tools), ATXP) handles the 402 -> sign -> retry cycle automatically.

## Tools

| Tool | Method | Path | Price | Description |
|---|---|---|---|---|
| `text_compare_diff` | POST | `/api/diff` | $0.002 | Compare two texts and show line-by-line differences |

### `text_compare_diff`

Use this when you need to compare two pieces of text and identify exactly what changed between them. Returns a structured line-by-line diff with summary statistics.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `text1` | string | yes | The original text (base) |
| `text2` | string | yes | The modified text to compare against |

Example response:

```json
{"changes":[{"type":"unchanged","content":"line 1"},{"type":"removed","content":"old line 2"},{"type":"added","content":"new line 2"}],"linesAdded":1,"linesRemoved":1,"linesUnchanged":1,"similarity":66.7}
```

**When to use**: code review (comparing before/after), tracking document revisions, verifying config file changes, or auditing template modifications. Use this BEFORE deploying config changes to understand what differs.

**Not for**: text classification (use `text_classify_content`), sentiment analysis (use `text_analyze_sentiment`), word counting (use `text_count_words`).

## Example agent prompts

- "Compare two pieces of text and identify exactly what changed between them"

## Payment

- Protocol: [x402](https://x402.org) -- HTTP-native pay-per-call, no signup, no API key
- Network: Base L2 (`eip155:8453`)
- Asset: USDC
- Facilitator: Coinbase CDP (primary), PayAI (fallback)
- Also reachable via [ATXP](https://atxp.ai) (OAuth-wrapped x402, RFC 9728 protected-resource metadata)

## Part of klymax402

100 x402 micropayment APIs for AI agents -- one wallet, USDC on Base, zero signup.

- Catalog: https://klymax402.com/llms.txt
- Full API reference: https://klymax402.com/llms-full.txt
- Live stats: https://klymax402.com/stats

## License

MIT
