import { websiteOpenGraph } from "../src";

describe("blah", () => {
  it("twitter", async () => {
    // expect(await websiteOpenGraph('https://talkbase.io')).toEqual(2);
    const result = await websiteOpenGraph(
      "https://twitter.com/RoshanBliss/status/1540525520118599681"
    );
    expect(result).toHaveProperty("data");
  });
  it("pulumi", async () => {
    // expect(await websiteOpenGraph('https://talkbase.io')).toEqual(2);
    const result = await websiteOpenGraph("https://app.pulumi.com");
    expect(result).toHaveProperty("data");
    expect(result.data).toHaveProperty("favicon");
    expect(
      result.data.favicon === "https://app.pulumi.com/favicon.ico"
    ).toBeTruthy();
  });
  it("talkbase", async () => {
    // expect(await websiteOpenGraph('https://talkbase.io')).toEqual(2);
    const result = await websiteOpenGraph("https://talkbase.io");
    expect(result).toHaveProperty("data");
    expect(result.data).toHaveProperty("title");
    expect(typeof result.data.title === "string").toBeTruthy();
  });
});
