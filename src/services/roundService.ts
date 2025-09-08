import { db } from '@/db';
import { UUID } from '@/types/UUID';
import { Round, RoundParams } from '@/types/Round';
import utilities from '@/utilities';

export const getRoundsByFightId = async (fightId: UUID): Promise<Round[] | null> => {
    try {
        let rounds = await db.rounds.where("fightId").equals(fightId).toArray();
        
        if (!rounds || rounds.length === 0) {
            return null;
        }
        
        rounds.sort((a, b) => a.number - b.number);
        return rounds;
    } catch (error) {
        console.error("Error in getRoundsByFightId:", error);
        return null;
    }
}

export const deleteCurrentRound = async (fightId: UUID): Promise<void> => {
    let rounds = await getRoundsByFightId(fightId);
    if(!rounds) return;

    let round = rounds.pop();
    await db.rounds.delete(round!.id!);
}

export const saveRound = async (round: Round): Promise<void> => {
    if(!round.id) round.id = utilities.newId();
    await db.rounds.put(round);
}