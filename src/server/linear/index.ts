import { env } from "@/env.mjs";
import { LinearClient } from "@linear/sdk";

const linear = new LinearClient({
  apiKey: env.LINEAR_API_KEY,
});

export default linear;
