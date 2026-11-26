import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getArcadeRank, computeArcadeBadges, type PublicWebProfile } from "./arcade-profile.ts";

describe("getArcadeRank", () => {
  it("returns correct rank thresholds", () => {
    assert.equal(getArcadeRank(0).title, "NOVATO");
    assert.equal(getArcadeRank(149).title, "NOVATO");
    assert.equal(getArcadeRank(150).title, "RETADOR");
    assert.equal(getArcadeRank(450).title, "LUCHADOR");
    assert.equal(getArcadeRank(900).title, "MAESTRO");
    assert.equal(getArcadeRank(1500).title, "GRAN MAESTRO");
    assert.equal(getArcadeRank(2000).title, "LEYENDA");
    assert.equal(getArcadeRank(5000).title, "LEYENDA");
  });
});

describe("computeArcadeBadges", () => {
  it("computes expected badges for a veteran 1CC champion", () => {
    const profile: PublicWebProfile = {
      username: "cjbaezilla",
      avatar_seed: "seed",
      bio: null,
      country_code: "CL",
      is_private: false,
      social_links: {},
      total_plays: 100,
      total_play_seconds: 250 * 3600,
      global_points: 2000,
      global_rank: 1,
      first_places: 2,
      podiums: 5,
      total_1cc: 10,
      verified_replays: 3,
      netplay_matches: 100,
      followers_count: 10,
      following_count: 5,
      high_scores: [],
      recent_matches: [],
    };

    const badges = computeArcadeBadges(profile);
    const ids = badges.map((b) => b.id);
    assert.ok(ids.includes("king"));
    assert.ok(ids.includes("podium"));
    assert.ok(ids.includes("1cc_master"));
    assert.ok(ids.includes("verified_replay"));
  });
});
