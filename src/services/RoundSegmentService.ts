import { db } from '@/db';
import { RoundSegment, RoundSegmentListParams } from '@/types/RoundSegment';
import utilities from '@/utilities';


export const saveRoundSegment = async (roundSegment: RoundSegment): Promise<void> => {
    if(!roundSegment.id) roundSegment.id = utilities.newId();
    await db.roundSegments.put(roundSegment);
}

export const getRoundSegmentsByFightIdAndRound = async (params: RoundSegmentListParams): Promise<RoundSegment[] | null> => {
    const segments = await db.roundSegments.where({ fightId: params.fightId, round: params.round }).toArray() as RoundSegment[];
    if(!segments || segments.length === 0) return null;
    
    // Sort by segment number
    segments.sort((a, b) => a.segment - b.segment);
    return segments;
}