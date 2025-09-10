import { UUID } from "@/types/UUID";
import { SafeQueryOptionsFor } from "./SafeQueryOptions";
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteRoundSegment, getAllRoundSegmentsByFight, getRoundSegmentsByFightIdAndRound, saveRoundSegment } from "@/services/RoundSegmentService";

//#region Types
export type RoundSegment = {
    id?: string;
    fightId: string;
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

// #region Keys
export const roundSegmentKeys = {
    base: ['fight', 'round', 'segments'] as const,
    listByFight: (fightId: UUID) => [...roundSegmentKeys.base, fightId] as const,
    listByRound: (fightId: UUID, round: number) => [...roundSegmentKeys.listByFight(fightId), round] as const,
};
// #endregion

//#region Query options
export const useAllRoundSegments = (fightId: UUID, options?:SafeQueryOptionsFor<RoundSegment[]>) => 
  useQuery({
    queryKey: roundSegmentKeys.listByFight(fightId),
    queryFn: () => getAllRoundSegmentsByFight(fightId),
    ...options
  }) 

export function useRoundSegmentsByRound(
    params: RoundSegmentListParams,
    options?: SafeQueryOptionsFor<RoundSegment[]>
) {
    return useQuery({
        queryKey: roundSegmentKeys.listByRound(params.fightId, params.round),
        queryFn: async (): Promise<RoundSegment[]> => {
            const segments = await getRoundSegmentsByFightIdAndRound(params) || [];
            return segments;
        },
        ...options,
        gcTime: 0,
    });
}
//#endregion

//#region Mutation Hooks
export function useDeleteRoundSegmentMutation() {
  const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (roundSegment: RoundSegment) => deleteRoundSegment(roundSegment.id!),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: roundSegmentKeys.base});
        }
    });
}

export function useSaveRoundSegmentMutation() {
    const queryClient = useQueryClient(); // Use the existing query client from context

    return useMutation({
        mutationFn: async (roundSegment: RoundSegment) => saveRoundSegment(roundSegment),
        onSuccess: () => {
            // Invalidate all queries that start with ['fight', 'round', 'segments']
            queryClient.invalidateQueries({
                queryKey: roundSegmentKeys.base
            });
        }
    });
} 
// #endregion