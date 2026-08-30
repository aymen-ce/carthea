import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { FORMATS, findFormat } from "../catalog";

export default defineTool({
  name: "get_format_specs",
  title: "Get packaging specs",
  description:
    "Get the full technical sheet of one CARTHÉA packaging format: every capacity with real height, body width, empty weight, brimful volume and neck finish (in mm / g / ml).",
  inputSchema: {
    format_id: z
      .string()
      .min(1)
      .describe("Packaging id: dorica, marasca, biolio, bidon or pet."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ format_id }) => {
    const format = findFormat(format_id);
    if (!format) {
      throw new ToolError(
        `Unknown format "${format_id}". Available: ${FORMATS.map((f) => f.id).join(", ")}.`,
      );
    }
    const payload = {
      id: format.id,
      name: format.name,
      material: format.material,
      description: format.desc,
      use: format.use,
      neck: format.neck,
      dimensions_source: format.source,
      capacities: format.capacities.map((c) => ({
        label: c.label,
        liters: c.liters,
        height_mm: c.height,
        body_width_mm: c.width,
        empty_weight_g: c.weight ?? null,
        brimful_ml: c.brimful ?? null,
        notes: c.extra ?? null,
      })),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
