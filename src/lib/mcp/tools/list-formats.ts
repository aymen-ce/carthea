import { defineTool } from "@lovable.dev/mcp-js";

import { FORMATS } from "../catalog";

export default defineTool({
  name: "list_packaging_formats",
  title: "List packaging formats",
  description:
    "List every CARTHÉA packaging format (Dorica, Marasca, Biolio, metal tin, PET) with its material, use cases and available capacities.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const formats = FORMATS.map((f) => ({
      id: f.id,
      name: f.name,
      material: f.material,
      description: f.desc,
      use: f.use,
      capacities: f.capacities.map((c) => c.label),
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(formats, null, 2) }],
      structuredContent: { formats },
    };
  },
});
