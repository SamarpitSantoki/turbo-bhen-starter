import { z } from "zod";

const errorContent = {
  content: {
    "application/json": {
      schema: z.object({
        message: z.string(),
      }),
    },
  },
  description: "Error Response",
};

export default errorContent;
