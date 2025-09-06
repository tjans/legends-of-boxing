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
    

/*
    Testing out this pattern.  Basically, you provide a query factory that returns you the
    query options for a react query.  It takes in a params object and additional options
    you want to append to the existing options (like enabled, etc).  The body of the function
    applies the additional options, and also returns a query function that fetches the data.

    the params object is typed to the expected input for the query function, including things
    like fightId, or other things needed to fetch the data.

    The SafeQueryOptionsFor<T> type is a utility type that omits the queryKey and queryFn
    from the UseQueryOptions type, so you can't provide them when calling the function.
*/

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