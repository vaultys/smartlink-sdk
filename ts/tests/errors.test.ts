import { config } from "dotenv";
import { client, getApps, putAppByClientId } from "../src/client";
import { createClient } from "@hey-api/client-fetch";

config();

client.setConfig({
  baseUrl: process.env.API_BASE_URL,
  headers: {
    "x-api-key": process.env.API_KEY,
  },
});

describe("Tests errors return codes", () => {
  it("using the wrong api key should return error", async () => {
    const localClient = createClient({
      baseUrl: process.env.API_BASE_URL,
      headers: {
        "x-api-key": "wrong-api-key",
      },
    });
    const res = await getApps({ client: localClient });
    expect(res.error).toBeDefined();
    expect((res.error as { error: string }).error).toBe("Not authorized");
  });

  it("update app with unknown id should return error", async () => {
    const res = await putAppByClientId({
      path: { clientId: "unknown-id" },
      body: {
        title: "Updated Test App",
        url: "https://updatedtestapp.com",
        iconUrl: "https://updatedtestapp.com/icon.png",
        description: "Updated Test App Description",
        slug: "updated-test-app",
      },
    });
    expect(res.error).toBeDefined();
  });
});
