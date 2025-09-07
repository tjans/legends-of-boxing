import { fightQueryOptions, FightParams } from "@/types/Fight";
import { fighterQueryOptions, FighterParams } from "@/types/Fighter";
import { currentRoundQueryOptions, RoundParams } from "@/types/Round";
import { RoundSegmentListParams, roundSegmentListQueryOptions } from "@/types/RoundSegment";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useFight = () => {
    const { fightId } = useParams();

    // Only run the query if fightId is defined
    const {data: fight} = useQuery(fightQueryOptions(
        {fightId: fightId!} as FightParams
    ));

    // Fetch the current round
    const {data: currentRound} = useQuery(currentRoundQueryOptions(
        {fightId: fightId!} as RoundParams,
        {enabled: fight != undefined}
    ));

    // Fetch the fighters
    const {data: redFighter} = useQuery(fighterQueryOptions(
        {fighterId: fight?.redFighterId, fightId: fight?.id} as FighterParams,
        {enabled: fight != undefined}
    ));

    const {data: blueFighter} = useQuery(fighterQueryOptions(
        {fighterId: fight?.blueFighterId, fightId: fight?.id} as FighterParams,
        {enabled: fight != undefined}
    ));

    // Fetch the round segments for the current round
    const {data: roundSegments} = useQuery(roundSegmentListQueryOptions(
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