import { hcWithType } from "@repo/backend/dist/hc";
const hc = hcWithType(process.env.EXPO_PUBLIC_API_URL || "");

export default hc;
