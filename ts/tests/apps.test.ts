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
    expect(Array.isArray(response.data?.apps)).toBe(true);
    expect(typeof response.data?.total).toBe("number");
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

  it("should create multiple apps", async () => {
    const runId = `${Date.now()}`;
    const first = await postApp({
      body: {
        title: `Batch App A ${runId}`,
        url: "https://batch-a.example.com",
        iconUrl: "https://batch-a.example.com/icon.png",
        description: "Batch App A",
        slug: `batch-app-a-${runId}`,
      },
    });
    const second = await postApp({
      body: {
        title: `Batch App B ${runId}`,
        url: "https://batch-b.example.com",
        iconUrl: "https://batch-b.example.com/icon.png",
        description: "Batch App B",
        slug: `batch-app-b-${runId}`,
      },
    });

    expect(first.error).toBeUndefined();
    expect(second.error).toBeUndefined();

    const apps = await getApps();
    const createdApps = (apps.data?.apps ?? []).filter((app) =>
      [`Batch App A ${runId}`, `Batch App B ${runId}`].includes(app.title ?? ""),
    );

    expect(createdApps).toHaveLength(2);

    for (const app of createdApps) {
      if (app.clientId) {
        await deleteAppByClientId({
          path: { clientId: app.clientId },
        });
      }
    }
  });
});
