import { hcWithType } from "@repo/backend/src/hc";
const hc = hcWithType(process.env.EXPO_PUBLIC_API_URL || "");

export default hc;
