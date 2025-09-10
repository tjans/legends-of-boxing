import { useAllRoundSegments } from "./RoundSegment";
import { UUID } from "./UUID";

export interface HealthStats {
    tkoPoints: number;
    rightEyeCut: number;
    leftEyeCut: number;
    otherCut: number;
    foulPoints: number;
}

export type HealthParams = {
    fightId: UUID;
    fighterId: UUID;
}

// export const useFighterHealth = (fightId: UUID, fighterId: UUID): {health: HealthStats} | null => {
//     console.log('fightId, fighterId', fightId, fighterId);
//     const allRoundSegmentsQuery = useAllRoundSegments(fightId, {enabled: fightId != undefined});
//     if(!allRoundSegmentsQuery.data) return null;

//     // console.log("All Round Segments:", allRoundSegmentsQuery.data, fighterId);

//     return null;
// }