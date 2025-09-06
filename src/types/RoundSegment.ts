import { UUID } from "@/types/UUID";

export interface RoundSegment {
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
}
