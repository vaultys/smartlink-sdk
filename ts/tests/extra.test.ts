import { config } from "dotenv";
import {
  client,
  deleteMembershipById,
  deleteFolderById,
  deleteAppByClientId,
  getApps,
  getFolderByIdApps,
  getFolderByIdMemberships,
  getMemberships,
  getMembershipsSearch,
  getOrganization,
  postApps,
  postApp,
  postFolder,
  postImportApps,
  postImportMemberships,
  postMembership,
  postMembershipByIdDeactivate,
  postMembershipByIdRegister,
} from "../src/client";
import type { App, Folder, Membership } from "../src/client";

config();

client.setConfig({
  baseUrl: process.env.API_BASE_URL,
  headers: {
    "x-api-key": process.env.API_KEY,
  },
});

const runId = `${Date.now()}`;

describe("Additional SDK coverage", () => {
  it("should get organization details", async () => {
    const response = await getOrganization();
    expect(response.data).toBeDefined();
    expect(typeof response.data?.id).toBe("number");
  });

  it("should create multiple apps", async () => {
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
    const createdApps = (apps.data?.apps ?? []).filter((app: App) =>
      [ `Batch App A ${runId}`, `Batch App B ${runId}` ].includes(app.title ?? ""),
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

  it("should support membership register and deactivate flows", async () => {
    const created = await postMembership({
      body: {
        firstName: `Register ${runId}`,
        name: "User",
        email: `register-${runId}@example.com`,
        phone: "+33600000000",
        isAdmin: false,
      },
    });

    const membershipId = created.data?.id;
    expect(membershipId).toBeDefined();

    const registered = await postMembershipByIdRegister({
      path: { id: membershipId as number },
      body: {
        sendMail: false,
      },
    });
    expect(registered.data?.registerLink).toBeDefined();
    expect(typeof registered.data?.mailSent).toBe("boolean");

    const deactivated = await postMembershipByIdDeactivate({
      path: { id: String(membershipId) },
    });
    expect(deactivated.data?.status).toBe("INACTIVE");

    if (membershipId) {
      await deleteMembershipById({
        path: { id: membershipId },
      });
    }
  });

  it("should search memberships", async () => {
    const created = await postMembership({
      body: {
        firstName: `Search ${runId}`,
        name: "User",
        email: `search-${runId}@example.com`,
        phone: "+33600000001",
        isAdmin: false,
      },
    });

    const membershipId = created.data?.id;
    expect(membershipId).toBeDefined();

    const response = await getMembershipsSearch({
      query: {
        page: 1,
        search: `search-${runId}@example.com`,
      },
    });

    expect(Array.isArray(response.data?.memberships)).toBe(true);
    expect(response.data?.count).toBeGreaterThanOrEqual(1);
    expect(
      response.data?.memberships?.some((membership: Membership) => membership.email === `search-${runId}@example.com`),
    ).toBe(true);

    if (membershipId) {
      await deleteMembershipById({
        path: { id: membershipId },
      });
    }
  });

  it("should import apps and list them in a folder", async () => {
    const folder = (await postFolder({
      body: {
        name: `Import Folder ${runId}`,
      },
    })).data as Folder;

    expect(folder.id).toBeDefined();
    expect(folder.name).toBe(`Import Folder ${runId}`);

    const folderResponse = await getFolderByIdApps({
      path: { id: folder.id as number },
      query: {
        page: 1,
        pageSize: 10,
      },
    });

    expect(Array.isArray(folderResponse.data?.apps)).toBe(true);
    expect(typeof folderResponse.data?.total).toBe("number");

    const folderPath = folder.path ?? `/${folder.name}/`;
    const imported = await postImportApps({
      body: {
        apps: [
          {
            title: `Imported App ${runId}`,
            url: "https://imported-app.example.com",
            type: "SMARTLINK",
            folders: [folderPath],
          },
        ],
      },
    });

    expect(imported.data?.count).toBe(1);

    const apps = await getApps();
    const createdApp = (apps.data?.apps ?? []).find((app: App) => app.title === `Imported App ${runId}`);
    expect(createdApp).toBeDefined();
    if (createdApp?.clientId) {
      await deleteAppByClientId({
        path: { clientId: createdApp.clientId },
      });
    }

    if (folder.id) {
      await deleteFolderById({
        path: { id: folder.id },
      });
    }
  });

  it("should import memberships and list them in a folder", async () => {
    const folder = (await postFolder({
      body: {
        name: `Membership Folder ${runId}`,
      },
    })).data as Folder;

    expect(folder.id).toBeDefined();

    const folderResponse = await getFolderByIdMemberships({
      path: { id: folder.id as number },
      query: {
        page: 1,
        pageSize: 10,
      },
    });

    expect(Array.isArray(folderResponse.data?.memberships)).toBe(true);
    expect(typeof folderResponse.data?.total).toBe("number");

    const folderPath = folder.path ?? `/${folder.name}/`;
    const imported = await postImportMemberships({
      body: {
        users: [
          {
            firstName: `Imported ${runId}`,
            name: "Member",
            email: `imported-${runId}@example.com`,
            phone: "+33600000002",
            folders: [folderPath],
          },
        ],
      },
    });

    expect(imported.data?.count).toBe(1);

    const memberships = await getMembershipsSearch({
      query: {
        page: 1,
        search: `imported-${runId}@example.com`,
      },
    });

    const createdMembership = memberships.data?.memberships?.find(
      (membership: Membership) => membership.email === `imported-${runId}@example.com`,
    );
    expect(createdMembership).toBeDefined();

    if (createdMembership?.id) {
      await deleteMembershipById({
        path: { id: createdMembership.id },
      });
    }

    if (folder.id) {
      await deleteFolderById({
        path: { id: folder.id },
      });
    }
  });
});
