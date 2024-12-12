import { config } from "dotenv";
import { client, getFolders, postFolder, getFolderById, deleteFolderById, Folder } from "../src/client";

config();

client.setConfig({
  baseUrl: process.env.API_BASE_URL,
  headers: {
    "x-api-key": process.env.API_KEY,
  },
});

describe("Folders API", () => {
  let folderId: number;

  beforeAll(async () => {
    const folders = (await getFolders()).data;
    for (const folder of folders ?? []) {
      if (folder.id)
        await deleteFolderById({
          path: { id: folder.id },
        });
    }
  });

  it("should create a new folder", async () => {
    const response = await postFolder({
      body: {
        name: "Test Folder",
      },
    });
    folderId = response.data?.id ?? -1;
    expect(response.data?.name).toBe("Test Folder");
  });

  it("should create a new folder inside another", async () => {
    const folder = (
      await getFolderById({
        path: { id: folderId },
      })
    ).data as Folder;
    const response = await postFolder({
      body: {
        name: "Child folder",
        parentId: folder.id,
      },
    });
    expect(response.data?.name).toBe("Child folder");
    expect(response.data?.parentId).toBe(folder.id);
    expect(response.data?.path).toBe(`/${folder.name}/`);
  });

  it("should get all folders", async () => {
    const response = await getFolders();
    expect(Array.isArray(response.data)).toBe(true);
    const folderExists = response.data?.some((folder: Folder) => folder.id === folderId);
    expect(folderExists).toBe(true);
  });

  it("should get a folder by ID", async () => {
    const response = await getFolderById({
      path: { id: folderId },
    });
    expect(response.data?.id).toBe(folderId);
  });

  it("should delete a folder by ID", async () => {
    const response = await deleteFolderById({
      path: { id: folderId },
    });
    expect(response.data?.id).toBe(folderId);
  });
});
