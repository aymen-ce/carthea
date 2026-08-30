import { defineMcp } from "@lovable.dev/mcp-js";

import getBrandInfoTool from "./tools/get-brand-info";
import getFormatSpecsTool from "./tools/get-format-specs";
import listFormatsTool from "./tools/list-formats";
import listLabelVariantsTool from "./tools/list-label-variants";

export default defineMcp({
  name: "build-your-site",
  title: "Build Your Site",
  version: "0.1.0",
  instructions:
    "Public catalogue tools for CARTHÉA, a Tunisian extra virgin olive oil brand. Use `list_packaging_formats` to browse packaging, `get_format_specs` for real technical dimensions of one packaging, `list_label_variants` for the three label designs, and `get_brand_info` for brand and origin details.",
  tools: [listFormatsTool, getFormatSpecsTool, listLabelVariantsTool, getBrandInfoTool] as Parameters<
    typeof defineMcp
  >[0]["tools"],
});
