import { UUID } from "@/types/UUID";
import { SafeQueryOptionsFor } from "./SafeQueryOptions";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { db } from "@/db";
import { getAllRoundSegmentsByFight } from "@/services/RoundSegmentService";

export type CompetitionLevel = "Regional" | "National" | "Continental" | "World";
export type DevelopmentStage = "Novice" | "Seasoned" | "Adept" | "Prime" | "Ring Attrition";
export type FoulType = "CLN" | "AVG" | "DIR";
export type FighterType = "Tactical" | "Physical";
export type Attribute = "tControl" | "pControl" | "DEF" | "POW" | "DUR" | "CHN" | "CUT" | "WIL" | "END";

export type Fighter = {
    id: UUID;
    name: string;
    age: number;
    reputation: number;
    type: FighterType;
    tControl: number;
    pControl: number;
    DEF: number;
    POW: number;
    DUR: number;
    CHN: number;
    CUT: number;
    WIL: number;
    FIN: number;
    competitionLevel: CompetitionLevel;
    developmentStage: DevelopmentStage;
    foulRating: FoulType;
    outsideRange: string;
    insideRange: string;
    elusiveRange: string;
    pressureRange: string;
    wins: number;
    losses: number;
    draws: number;
    knockouts: number;
    isStarred: boolean;
} | undefined;

export type FighterParams = {
    fighterId: UUID;
    fightId: UUID;
}

export function fighterQueryOptions(
  params: FighterParams,
  options?: SafeQueryOptionsFor<Fighter>
) {
  return queryOptions({
    ...options,
    gcTime: 0,
    queryKey: ["fight", params],
    queryFn: async (): Promise<Fighter> => {
        return await db.fighters.get(params.fighterId);
     },
  })
}
