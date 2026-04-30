import { config } from "dotenv";
import { client, getOrganization } from "../src/client";

config();

client.setConfig({
  baseUrl: process.env.API_BASE_URL,
  headers: {
    "x-api-key": process.env.API_KEY,
  },
});

describe("Organization API", () => {
  it("should get organization details", async () => {
    const response = await getOrganization();
    expect(response.data).toBeDefined();
    expect(typeof response.data?.id).toBe("number");
  });
});
