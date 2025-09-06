import { UUID } from "@/types/UUID";

export type CompetitionLevel = "Regional" | "National" | "Continental" | "World";
export type DevelopmentStage = "Novice" | "Seasoned" | "Adept" | "Prime" | "Ring Attrition";
export type FoulType = "CLN" | "AVG" | "DIR";
export type FighterType = "Tactical" | "Physical";
export type Attribute = "tControl" | "pControl" | "DEF" | "POW" | "DUR" | "CHN" | "CUT" | "WIL" | "END";

export interface Fighter {
    id: UUID;
    name: string;
    age: number;
    reputation: number;
    type: FighterType;
    tControl: number;
    pControl: number;
    DEF: number;
    POW: number;
    DUR: number;
    CHN: number;
    CUT: number;
    WIL: number;
    FIN: number;
    competitionLevel: CompetitionLevel;
    developmentStage: DevelopmentStage;
    foulRating: FoulType;
    outsideRange: string;
    insideRange: string;
    elusiveRange: string;
    pressureRange: string;
    wins: number;
    losses: number;
    draws: number;
    knockouts: number;
    isStarred: boolean;
}
