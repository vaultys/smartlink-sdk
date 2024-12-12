import { config } from "dotenv";
import { client, getAppByClientId, postApp, putAppByClientId, deleteAppByClientId, getApps } from "../src/client";

config();

client.setConfig({
  baseUrl: process.env.API_BASE_URL,
  headers: {
    "x-api-key": process.env.API_KEY,
  },
});

describe("Applications API", () => {
  let appId: string = "";

  it("should create a new app", async () => {
    const response = await postApp({
      body: {
        title: "Test App",
        url: "https://testapp.com",
        iconUrl: "https://testapp.com/icon.png",
        description: "Test App Description",
        slug: "test-app",
      },
    });
    expect(response.data).toBeDefined();
    appId = response.data?.clientId ?? "";
    expect(response.data?.title).toBe("Test App");
  });

  it("should get all apps", async () => {
    const response = await getApps();
    expect(Array.isArray(response.data)).toBe(true);
  });

  it("should get an app by client ID", async () => {
    const response = await getAppByClientId({
      path: { clientId: appId },
    });
    expect(response.data).toBeDefined();
    expect(response.data?.clientId).toBe(appId);
  });

  it("should update an app by client ID", async () => {
    const response = await putAppByClientId({
      path: { clientId: appId },
      body: {
        title: "Updated Test App",
        url: "https://updatedtestapp.com",
        iconUrl: "https://updatedtestapp.com/icon.png",
        description: "Updated Test App Description",
        slug: "updated-test-app",
      },
    });
    expect(response.data).toBeDefined();
    expect(response.data?.title).toBe("Updated Test App");
  });

  it("should delete an app by client ID", async () => {
    const response = await deleteAppByClientId({
      path: { clientId: appId },
    });
    expect(response.data).toBeDefined();
    expect(response.data?.clientId).toBe(appId);
  });
});
