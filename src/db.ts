import Dexie, { Table } from "dexie";
import { Fighter } from "@/types/Fighter";
import { Fight } from "@/types/Fight";
import { Round } from "@/types/Round";
import { RoundSegment } from "@/types/RoundSegment";
import utilities from "@/utilities";
import { FightDeduction } from "./types/FightDeduction";
import { HealthStats } from "@/types/HealthStats";

class LegendsOfBoxingDatabase extends Dexie {
    fighters!: Table<Fighter, string>;
    fights!: Table<Fight, string>;
    rounds!: Table<Round, string>;
    roundSegments!: Table<RoundSegment, string>;
    fightDeductions!: Table<FightDeduction, string>;
    healthStats!: Table<HealthStats, string>;

  constructor() {
    super("legends-of-boxing");

    this.version(1).stores({
      fighters: "id",
      fights: "id",
      rounds: "id, fightId, [fightId+number]",
      roundSegments: "id, [fightId+round]",
      fightDeductions: "id, [fightId+fighterId], [fightId+round]",
    });
  }
}

export const db = new LegendsOfBoxingDatabase();


async function seedIfEmpty() {
  const fighterCount = await db.fighters.count();
  const fightCount = await db.fights.count();
  const fightId = "ed59b878-fac5-4a98-975e-ae78322f95ca";
  
  if (fighterCount === 0 && fightCount === 0) {
    const redFighterId = utilities.newId();
    const blueFighterId = utilities.newId();

    const redFighter: Fighter = {
      id: redFighterId,
      name: "Red Redemption",
      age: 18,
      type: 'Tactical',
      reputation: 0,
      tControl: 6,
      pControl: 6,
      DEF: 2,
      POW: 3,
      DUR: 6,
      CHN: 9,
      CUT: 6,
      WIL: 6,
      FIN: -1,

      competitionLevel: "Regional",
      developmentStage: "Novice",
      foulRating: "CLN",
      outsideRange: "1-5",
      insideRange: "6-10",
      elusiveRange: "11-15",
      pressureRange: "16-20",
      wins: 0,
      losses: 0,
      draws: 0,
      knockouts: 0,
      isStarred: true,
    };

    const blueFighter: Fighter = {
      id: blueFighterId,
      name: "Blue Thunder",
      age: 18,
      type: 'Physical',
      reputation: 0,
      tControl: 6,
      pControl: 6,
      DEF: 2,
      POW: 3,
      DUR: 6,
      CHN: 9,
      CUT: 6,
      WIL: 6,
      FIN: -1,

      competitionLevel: "Regional",
      developmentStage: "Novice",
      foulRating: "CLN",
      outsideRange: "1-5",
      insideRange: "6-10",
      elusiveRange: "11-15",
      pressureRange: "16-20",
      wins: 0,
      losses: 0,
      draws: 0,
      knockouts: 0,
      isStarred: true,
    };

    const fight: Fight = {
      id: fightId,
      rounds: 4,
      redFighterId,
      blueFighterId,
      isTitleFight: true,
      winningFighterId: null,
      decision: null,
      date: Date.now(),
    };

    await db.transaction("rw", db.fighters, db.fights, async () => {
      await db.fighters.bulkAdd([redFighter, blueFighter]);
      await db.fights.add(fight);
    });

    console.log("Dexie seed data inserted!");
  }
}

// Run the seeding once at startup
seedIfEmpty().catch(console.error);