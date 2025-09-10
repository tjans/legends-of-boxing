import { db } from '@/db';
import { HealthParams, HealthStats } from '@/types/HealthStats';

export const getHealth = async (health: HealthParams): Promise<HealthStats | undefined> => {
    try {
        let healthStats = await db.healthStats.where({ fightId: health.fightId, fighterId: health.fighterId }).first();
        return healthStats;
    } catch (error) {
        console.error("Error in getHealth:", error);
        return undefined;
    }
}   