import { defineTool } from "@lovable.dev/mcp-js";

import { VARIANTS } from "../catalog";

export default defineTool({
  name: "list_label_variants",
  title: "List label variants",
  description:
    "List the three CARTHÉA label variants (Classique, Premium, 100% Bio) with their colour palette and certifications.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(VARIANTS, null, 2) }],
    structuredContent: { variants: VARIANTS },
  }),
});
