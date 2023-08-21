import { LevelUpgradeCost } from "../types";

export const MAX_LEVEL = 9;
export const MAX_UPGRADE = 10;

function processChunk(csv: string): LevelUpgradeCost[] {
  const levelUpgradeCosts: LevelUpgradeCost[] = [];

  const [
    upgrade1,
    upgrade2,
    upgrade3,
    upgrade4,
    upgrade5,
    upgrade6,
    upgrade7,
    upgrade8,
    upgrade9,
    upgrade10,
    gold,
    cards,
    gems,
  ] = csv
    .trim()
    .split("\n")
    .map((line) =>
      line
        .split(",")
        .slice(1)
        .map((value) => parseInt(value, 10))
    );

  for (let index = 0; index < MAX_LEVEL; index++) {
    levelUpgradeCosts.push({
      cardCost: cards[index],
      gemCost: gems[index],
      goldCosts: [
        upgrade1[index],
        upgrade2[index],
        upgrade3[index],
        upgrade4[index],
        upgrade5[index],
        upgrade6[index],
        upgrade7[index],
        upgrade8[index],
        upgrade9[index],
        upgrade10[index],
      ],
    });
  }

  return levelUpgradeCosts;
}

export const TIER_1_SHIP_AND_STONE = processChunk(`
upgrade1,5,320,1495,3800,7430,12540,19270,27740,38055
upgrade2,10,395,1670,4100,7870,13140,20040,28685,39195
upgrade3,20,475,1860,4415,8330,13755,20820,29650,40350
upgrade4,35,570,2060,4745,8800,14385,21625,30635,41525
upgrade5,55,670,2270,5085,9290,15030,22445,31640,42720
upgrade6,80,780,2495,5440,3790,15695,23280,32330,43940
upgrade7,110,905,2730,5810,10310,16375,24135,33700,45175
upgrade8,150,1035,2980,6190,10845,17075,25010,34760,46430
upgrade9,200,1175,3240,6590,11395,17790,25900,35840,47705
upgrade10,255,1330,3515,7005,11960,18520,26810,36940,49005
goldAllUpgrades,920,7655,24315,53180,96020,154305,229335,321920,434100
cards,0,40,80,120,160,200,300,400,600
gems,0,20,40,60,80,100,120,140,160
`);

export const TIER_2_SHIP_AND_STONE = `
upgrade1,50320,64625,81060,93705,120635,143925,163650,197875,228665,
upgrade2,51655,66170,82825,101630,122855,146330,172360,200840,231890,
upgrade3,53015,67740,84610,103705,125100,148875,175095,203825,235135,
upgrade4,54395,63330,86415,105740,127370,151385,177855,206840,238410,
upgrade5,55790,70340,88245,107735,123655,153920,180640,209880,241715,
upgrade6,57210,72570,90035,103880,131980,156480,183445,212945,245040,
upgrade7,58655,74225,31975,111980,134320,153065,186280,216040,248395,
upgrade8,60115,75900,33875,114110,136685,161675,183140,213155,251775,
upgrade9,61595,77600,95795,116260,133075,164310,192030,222300,255185,
upgrade10,63100,79320,97735,118435,141430,166970,134340,225470,258620
goldAllUpgrades,565850,718420,892630,1089300,1309165,1552995,1821435,2115170,2434830
cards,0,600,800,1000,1200,1400,1600,1800,2000
gems,200,200,300,400,500,600,700,800,900,4600
`;

export const TIER_3_SHIP_AND_STONE = `
upgrade1,262080,298185,337035,378630,423200,470625,521010,574410,630870
upgrade2,265570,301345,341075,383010,427810,475530,526210,579915,636690
upgrade3,269085,305735,345140,387360,432450,480460,531445,585455,642535
upgrade4,272630,309550,343235,331740,437120,485425,536710,531025,648415
upgrade5,276200,313395,353360,336150,441820,430420,542005,596625,654325
upgrade6,279795,317625,357510,400585,446545,495440,547330,602255,660265
upgrade7,283420,321165,361690,405050,451300,500435,552685,607315,666240
upgrade8,287070,325090,365895,403545,456090,505580,558070,613610,672245
upgrade9,230745,329045,370130,414065,460905,510630,563485,619330,678280
upgrade10,294455,333025,374335,418620,465750,515835,568930,625085,684345
goldAllUpgrades,2781050,3154760,3555465,3984815,4442990,4.930.500,5447880,5995625,6574210
cards,0,2000,2500,3000,3500,4000,4500,5000,5500
gems,1000,1000,1500,2000,2500,3000,3500,4000,4500
`;

export const TIER_1_DRONE = `
upgrade1,2,160,748,1900,3716,6270,9636,13870,19028
upgrade2,6,198,836,2050,3936,6570,10020,14342,19598
upgrade3,10,238,930,2208,4166,6878,10410,14826,20176
upgrade4,18,286,1030,2372,4400,7192,10812,15318,20762
upgrade5,28,336,1136,2542,4646,7516,11222,15820,21360
upgrade6,40,330,1248,2720,4896,7848,11640,16330,21370
upgrade7,56,452,1366,2306,5156,8188,12068,16850,22588
upgrade8,76,518,1430,3036,5422,8538,12506,17380,23216
upgrade9,100,588,1620,3236,5698,8896,12950,17920,23852
upgrade10,128,666,1758,3502,5980,3260,13406,18470,24502
goldAllUpgrades,464,3832,12162,26592,48016,77156,114670,161126,217052
cards,0,40,80,120,160,200,300,400,600
gems,0,10,20,30,40,50,60,70,80
`;

export const TIER_2_DRONE = `
upgrade1,
upgrade2,
upgrade3,
upgrade4,
upgrade5,
upgrade6,
upgrade7,
upgrade8,
upgrade9,
upgrade10,
goldAllUpgrades,282930,359212,446320,544652,654509,776500,910720,1057586,1217418
cards,0,600,800,1000,1200,1400,1600,1800,2000
gems,100,100,150,200,250,300,350,400,450
`;

export const TIER_3_DRONE = `
upgrade1,
upgrade2,
upgrade3,
upgrade4,
upgrade5,
upgrade6,
upgrade7,
upgrade8,
upgrade9,
upgrade10,
goldAllUpgrades,1390528,1577200,1777738,1992410,2221498,2465252,2723944,2997816,3287106
cards,0,2000,2500,3000,3500,4000,4500,5000,5500
gems,500,500,750,1000,1250,1500,1750,2000,2250
`;
