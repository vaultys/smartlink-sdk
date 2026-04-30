import { config } from "dotenv";
import {
  client,
  getMemberships,
  postMembership,
  getMembershipById,
  deleteMembershipById,
  putMembershipById,
  getMembershipsSearch,
  postMembershipByIdRegister,
  postMembershipByIdDeactivate,
} from "../src/client";

config();

client.setConfig({
  baseUrl: process.env.API_BASE_URL,
  headers: {
    "x-api-key": process.env.API_KEY,
  },
});

describe("Users API", () => {
  let userId: number;

  it("should create a new user", async () => {
    const user = {
      firstName: "John",
      name: "Doe",
      phone: "+336...",
      email: "john.doe@fake.com",
    };
    const response = await postMembership({
      body: { ...user, isAdmin: false },
    });
    userId = response.data?.id ?? -1;
    expect(response.data).toMatchObject(user);
  });

  it("should update user", async () => {
    const user = {
      firstName: "Jane",
      name: "Doe",
      phone: "+336...",
      email: "jane.doe@fake.com",
      role: "ADMIN",
      status: "INACTIVE",
    };
    const response = await putMembershipById({
      path: { id: userId },
      body: user,
    });
    expect(response.data).toMatchObject(user);
  });

  it("should get all users", async () => {
    const response = await getMemberships();
    expect(Array.isArray(response.data)).toBe(true);
    const userExists = response.data?.some((user: { id?: number }) => user.id === userId);
    expect(userExists).toBe(true);
  });

  it("should get a user by ID", async () => {
    const response = await getMembershipById({
      path: { id: userId },
    });
    expect(response.data?.id).toBe(userId);
  });

  it("should delete a user by ID", async () => {
    const response = await deleteMembershipById({
      path: { id: userId },
    });
    expect(response.data?.id).toBe(userId);
  });

  it("should register and deactivate a user", async () => {
    const runId = `${Date.now()}`;
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
    const runId = `${Date.now()}`;
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
      response.data?.memberships?.some((membership) => membership.email === `search-${runId}@example.com`),
    ).toBe(true);

    if (membershipId) {
      await deleteMembershipById({
        path: { id: membershipId },
      });
    }
  });
});
