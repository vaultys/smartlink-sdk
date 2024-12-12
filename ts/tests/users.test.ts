import { config } from "dotenv";
import { client, getMemberships, postMembership, getMembershipById, deleteMembershipById, putMembershipById } from "../src/client";

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
      body: { ...user, sendMail: false, isAdmin: false },
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
    const userExists = response.data?.some((user) => user.id === userId);
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
});
