import { UUID } from "@/types/UUID";
import { SafeQueryOptionsFor } from "./SafeQueryOptions";
import { queryOptions } from "@tanstack/react-query";
import { db } from "@/db";

export type RoundSegment = {
    id: string;
    fightId: UUID;
    round: number;
    segment: number;

    redPoints: number;
    redRightEyeCut: number;
    redLeftEyeCut: number;
    redOtherCut: number;
    redFoulPoints: number;

    bluePoints: number;
    blueRightEyeCut: number;
    blueLeftEyeCut: number;
    blueOtherCut: number;
    blueFoulPoints: number;
};


export const getRoundSegmentsByFightIdAndRound = async (params: RoundSegmentListParams): Promise<RoundSegment[] | null> => {
    const segments = await db.roundSegments.where({ fightId: params.fightId, round: params.round }).toArray() as RoundSegment[];
    if(!segments || segments.length === 0) return null;
    
    // Sort by segment number
    segments.sort((a, b) => a.segment - b.segment);
    return segments;
}

export type RoundSegmentListParams = {
    fightId: UUID;
    round: number;
}

// Public query options
export function createRoundSegmentListQueryOptions(
  params: RoundSegmentListParams,
  options?: SafeQueryOptionsFor<RoundSegment[]>
) {
  return queryOptions({
    ...options,
    gcTime: 0,
    queryKey: ["RoundSegment_list", params],
    queryFn: async (): Promise<RoundSegment[]> => {
      let segments = await getRoundSegmentsByFightIdAndRound(params) || [] as RoundSegment[];
      return segments;
    },
  })
}
