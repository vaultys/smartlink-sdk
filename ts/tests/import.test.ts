import { config } from "dotenv";
import {
  client,
  deleteAppByClientId,
  deleteFolderById,
  deleteMembershipById,
  getApps,
  getFolderByIdApps,
  getFolderByIdMemberships,
  getMembershipsSearch,
  postFolder,
  postImportApps,
  postImportMemberships,
  type App,
  type Folder,
  type Membership,
} from "../src/client";

config();

client.setConfig({
  baseUrl: process.env.API_BASE_URL,
  headers: {
    "x-api-key": process.env.API_KEY,
  },
});

describe("Import API", () => {
  it("should import apps and list them in a folder", async () => {
    const runId = `${Date.now()}`;
    const folder = (await postFolder({
      body: {
        name: `Import Folder ${runId}`,
      },
    })).data as Folder;

    expect(folder.id).toBeDefined();
    expect(folder.name).toBe(`Import Folder ${runId}`);

    try {
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
    } finally {
      if (folder.id) {
        await deleteFolderById({
          path: { id: folder.id },
        });
      }
    }
  });

  it("should import memberships and list them in a folder", async () => {
    const runId = `${Date.now()}`;
    const folder = (await postFolder({
      body: {
        name: `Membership Folder ${runId}`,
      },
    })).data as Folder;

    expect(folder.id).toBeDefined();

    try {
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
    } finally {
      if (folder.id) {
        await deleteFolderById({
          path: { id: folder.id },
        });
      }
    }
  });
});
