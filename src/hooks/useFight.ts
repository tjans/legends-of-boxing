import { createFightQueryOptions, FightParams } from "@/types/Fight";
import { createFighterQueryOptions, FighterParams } from "@/types/Fighter";
import { createCurrentRoundQueryOptions, RoundParams } from "@/types/Round";
import { createRoundSegmentListQueryOptions, RoundSegmentListParams } from "@/types/RoundSegment";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useFight = () => {
    const { fightId } = useParams();

    // Only run the query if fightId is defined
    const {data: fight} = useQuery(createFightQueryOptions(
        {fightId: fightId!} as FightParams
    ));

    // Fetch the current round
    const {data: currentRound} = useQuery(createCurrentRoundQueryOptions(
        {fightId: fightId!} as RoundParams,
        {enabled: fight != undefined}
    ));

    // Fetch the fighters
    const {data: redFighter} = useQuery(createFighterQueryOptions(
        {fighterId: fight?.redFighterId, fightId: fight?.id} as FighterParams,
        {enabled: fight != undefined}
    ));

    const {data: blueFighter} = useQuery(createFighterQueryOptions(
        {fighterId: fight?.blueFighterId, fightId: fight?.id} as FighterParams,
        {enabled: fight != undefined}
    ));

    // Fetch the round segments for the current round
    const {data: roundSegments} = useQuery(createRoundSegmentListQueryOptions(
        {fightId: fightId!, round: currentRound?.number!} as RoundSegmentListParams,
        {enabled: currentRound != undefined}
    ));

    return {
        fight,
        currentRound,
        redFighter,
        blueFighter,
        roundSegments
    };
}

export default useFight;