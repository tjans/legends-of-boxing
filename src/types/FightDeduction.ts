import { UUID } from "@/types/UUID";
import { Attribute } from "@/types/Fighter";

export interface FightDeduction {
    id?: UUID;
    fightId: UUID;
    fighterId: UUID;
    attribute: Attribute;
    delta: number;
    round: number;
}
