import { defineTool } from "@lovable.dev/mcp-js";

import { BRAND } from "../catalog";

export default defineTool({
  name: "get_brand_info",
  title: "Get brand info",
  description:
    "Get public information about the CARTHÉA brand: producer, origin of the groves, positioning and website.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(BRAND, null, 2) }],
    structuredContent: BRAND,
  }),
});
