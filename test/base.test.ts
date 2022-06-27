import { websiteOpenGraph } from "../src";

describe("blah", () => {
  it("twitter", async () => {
    // expect(await websiteOpenGraph('https://talkbase.io')).toEqual(2);
    expect(
      await websiteOpenGraph(
        "https://twitter.com/RoshanBliss/status/1540525520118599681"
      )
    ).toHaveProperty("title");
  });
  it("instagram", async () => {
    // expect(await websiteOpenGraph('https://talkbase.io')).toEqual(2);
    expect(
      await websiteOpenGraph("https://www.instagram.com/p/CfRjvX6spN7/?hl=en")
    ).toHaveProperty("title");
  });
});
