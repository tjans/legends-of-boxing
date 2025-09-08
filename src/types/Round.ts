import { queryOptions } from "@tanstack/react-query";
import { UUID } from "./UUID";
import { SafeQueryOptionsFor } from "@/types/SafeQueryOptions";
import { FighterColor } from "@/types/Fight";
import { getRoundsByFightId } from "@/services/roundService";

export type RoundMode = "INS" | "OUT" | "PRS" | "ELU";
export type JudgeIndex = 1 | 2 | 3;
export type JudgeKey = `${FighterColor}Judge${JudgeIndex}`;
export type OpenActionResult = "CHESS" | "NORMAL" | "BRAWL";
export type RoundModeKey = "redMode" | "blueMode";

// Extract takes two types (keyof Round, JudgeKey) and produces a new type that includes only the values of Round that are 
// assignable to JudgeKey.  Why is this needed?  In my case, keyof Round contains ALL property names (including non-judge 
// related ones)
export type RoundJudgeKey = Extract<keyof Round, JudgeKey>;

//export type JudgeDecision = "H" | "L" | "E" | "F" | "R" | "B" | "H2" | null;

export interface Round {
    id?: string;
    fightId: UUID;
    number: number;
    redMode?: RoundMode | null;
    blueMode?: RoundMode | null;
    redJudge1?: number | null;
    redJudge2?: number | null;
    redJudge3?: number | null;
    blueJudge1?: number | null;
    blueJudge2?: number | null;
    blueJudge3?: number | null;
}

export type RoundParams = {
    fightId: UUID;
}

// Public query options
export function roundListQueryOptions(
  params: RoundParams,
  options?: SafeQueryOptionsFor<Round[]>
) {
  return queryOptions({
    ...options,
    gcTime: 0,
    queryKey: ["Round_list", params],
    queryFn: async (): Promise<Round[]> => {
      let rounds = await getRoundsByFightId(params.fightId) || [] as Round[];
      return rounds;
    },
  })
}

export function currentRoundQueryOptions(
  params: RoundParams,
  options?: SafeQueryOptionsFor<Round | null>
) {
  return queryOptions({
    ...options,
    gcTime: 0,
    queryKey: ["Round_currentRound", params],
    queryFn: async (): Promise<Round | null> => {
      let rounds = await getRoundsByFightId(params.fightId);
      if(!rounds) return null;
      return rounds[rounds.length - 1] || null;
    },
  })
}