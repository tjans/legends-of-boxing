import { UUID } from "@/types/UUID";
import { SafeQueryOptionsFor } from "./SafeQueryOptions";
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

import { getRoundSegmentsByFightIdAndRound, saveRoundSegment } from "@/services/RoundSegmentService";

//#region Types
export type RoundSegment = {
    id?: string;
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

// Use keyof to get only the numeric properties from RoundSegment
export type UpdatableKeys = 'redPoints' | 'redRightEyeCut' | 'redLeftEyeCut' | 'redOtherCut' | 'redFoulPoints' | 'bluePoints' | 'blueRightEyeCut' | 'blueLeftEyeCut' | 'blueOtherCut' | 'blueFoulPoints';

export type RoundSegmentListParams = {
    fightId: UUID;
    round: number;
}

//#endregion

//#region Query options
export function roundSegmentListQueryOptions(
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
//#endregion




//#region Mutation Hooks
export function useSaveRoundSegmentMutation() {
    const queryClient = useQueryClient(); // Use the existing query client from context

    return useMutation({
        mutationFn: async (roundSegment: RoundSegment) => saveRoundSegment(roundSegment),
        onSuccess: (_data, variables: RoundSegment) => {
            
            // Use the original variables (the roundSegment you passed to mutate)
            const params: RoundSegmentListParams = { 
                fightId: variables.fightId, 
                round: variables.round 
            };
            
            queryClient.invalidateQueries({
                queryKey: roundSegmentListQueryOptions(params).queryKey
            });
        }
    });
} 
// #endregion