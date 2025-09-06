import { queryOptions } from "@tanstack/react-query";
import { UUID } from "./UUID";
import { SafeQueryOptionsFor } from "@/types/SafeQueryOptions";
import { db } from "@/db";

export type Decision = "W" | "L" | "D" | "NC" | null;
export type FighterColor = "red" | "blue";

export type FightParams = {
    fightId: UUID;
}

export type Fight = {
    id?: UUID;
    rounds: number;
    redFighterId: UUID;
    blueFighterId: UUID;
    isTitleFight: boolean;
    winningFighterId: UUID | null;
    decision: Decision;
    date: number;
} | undefined;
    
export function createFightQueryOptions(
  params: FightParams,
  options?: SafeQueryOptionsFor<Fight>
) {
  return queryOptions({
    ...options,
    gcTime: 0,
    queryKey: ["fight", params],
    queryFn: async (): Promise<Fight> => {
        return await db.fights.get(params.fightId);
     },
  })
}