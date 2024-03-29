import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "../data/upgrade-costs";
import { MAX_STATS } from "../types";
import { calculateUpgradeCost } from "./calculateUpgradeCost";

expect.addSnapshotSerializer({
  test: (value) => typeof value === "number",
  print: (value) => new Intl.NumberFormat().format(value as number),
});

describe("calculateUpgradeCost", () => {
  describe("drones", () => {
    // TODO
  });

  describe("ships", () => {
    describe("tier 1", () => {
      it("should properly handle a ship that is not yet owned", () => {
        expect(
          calculateUpgradeCost(
            {
              level: 1,
              subLevel: 0,
            },
            MAX_STATS,
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 1,249,300,
      "gemsNeededForLevels": 8,840,
    },
    "without": Object {
      "cardsNeededForLevels": 1,900,
      "coinsNeededForLevels": 1,321,800,
      "gemsNeededForLevels": 720,
    },
  },
  "isEstimateComplete": true,
  "totalCardsRequired": 1,900,
}
`);
      });

      it("should properly calculate the cost of a full ship upgrade", () => {
        expect(
          calculateUpgradeCost(
            {
              level: 1,
              subLevel: 0,
            },
            MAX_STATS,
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 1,249,300,
      "gemsNeededForLevels": 8,840,
    },
    "without": Object {
      "cardsNeededForLevels": 1,900,
      "coinsNeededForLevels": 1,321,800,
      "gemsNeededForLevels": 720,
    },
  },
  "isEstimateComplete": true,
  "totalCardsRequired": 1,900,
}
`);
      });

      it("should properly calculate the cost of a ship that has been partially upgraded", () => {
        expect(
          calculateUpgradeCost(
            {
              level: 7,
              subLevel: 3,
            },
            MAX_STATS,
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 885,275,
      "gemsNeededForLevels": 4,780,
    },
    "without": Object {
      "cardsNeededForLevels": 1,000,
      "coinsNeededForLevels": 925,275,
      "gemsNeededForLevels": 300,
    },
  },
  "isEstimateComplete": true,
  "totalCardsRequired": 1,000,
}
`);
      });

      it("should properly calculate the coins cost of a ship that is at the last level but not fully upgraded", () => {
        expect(
          calculateUpgradeCost(
            {
              level: MAX_LEVEL_NUMBER,
              subLevel: 5,
            },
            MAX_STATS,
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 232,305,
      "gemsNeededForLevels": 0,
    },
    "without": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 232,305,
      "gemsNeededForLevels": 0,
    },
  },
  "isEstimateComplete": true,
  "totalCardsRequired": 0,
}
`);
      });

      it("should properly calculate the cost of a ship that has already been fully upgraded", () => {
        expect(
          calculateUpgradeCost(
            {
              level: MAX_LEVEL_NUMBER,
              subLevel: MAX_SUB_LEVEL_NUMBER,
            },
            MAX_STATS,
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 0,
      "gemsNeededForLevels": 0,
    },
    "without": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 0,
      "gemsNeededForLevels": 0,
    },
  },
  "isEstimateComplete": true,
  "totalCardsRequired": 0,
}
`);
      });

      it("should factor existing cards into counts needed", () => {
        expect(
          calculateUpgradeCost(
            {
              level: MAX_LEVEL_NUMBER,
              subLevel: 0,
            },
            MAX_STATS,
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 434,150,
      "gemsNeededForLevels": 0,
    },
    "without": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 434,150,
      "gemsNeededForLevels": 0,
    },
  },
  "isEstimateComplete": true,
  "totalCardsRequired": 0,
}
`);
      });
    });

    describe("tier 2", () => {
      it("should properly handle a ship that is not yet owned", () => {
        expect(
          calculateUpgradeCost(
            {
              level: 1,
              subLevel: 0,
            },
            MAX_STATS,
            "ship",
            2
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 12,056,015,
      "gemsNeededForLevels": 48,640,
    },
    "without": Object {
      "cardsNeededForLevels": 10,400,
      "coinsNeededForLevels": 12,451,015,
      "gemsNeededForLevels": 4,400,
    },
  },
  "isEstimateComplete": true,
  "totalCardsRequired": 10,400,
}
`);
      });

      it("should properly handle a partial upgrade", () => {
        expect(
          calculateUpgradeCost(
            {
              level: 2,
              subLevel: 0,
            },
            {
              level: 3,
              subLevel: 4,
            },
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 9,740,
      "gemsNeededForLevels": 600,
    },
    "without": Object {
      "cardsNeededForLevels": 80,
      "coinsNeededForLevels": 14,740,
      "gemsNeededForLevels": 40,
    },
  },
  "isEstimateComplete": true,
  "totalCardsRequired": 80,
}
`);
      });

      // TODO
    });

    describe("tier 3", () => {
      it("should properly handle a ship that is not yet owned", () => {
        expect(
          calculateUpgradeCost(
            {
              level: 1,
              subLevel: 0,
            },
            MAX_STATS,
            "ship",
            3
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 39,728,475,
      "gemsNeededForLevels": 149,400,
    },
    "without": Object {
      "cardsNeededForLevels": 30,000,
      "coinsNeededForLevels": 40,865,975,
      "gemsNeededForLevels": 22,000,
    },
  },
  "isEstimateComplete": true,
  "totalCardsRequired": 30,000,
}
`);
      });

      // TODO
    });
  });

  describe("stones", () => {
    // TODO
  });
});
