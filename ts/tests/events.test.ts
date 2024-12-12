import { config } from "dotenv";
import { client, getEvents } from "../src/client";

config();

client.setConfig({
  baseUrl: process.env.API_BASE_URL,
  headers: {
    "x-api-key": process.env.API_KEY,
  },
});

describe("Events API", () => {
  it("should get all events", async () => {
    const response = await getEvents();
    expect(Array.isArray(response.data)).toBe(true);
  });
});
