import { fightQueryOptions, FightParams } from "@/types/Fight";
import { fighterQueryOptions, FighterParams } from "@/types/Fighter";
import { currentRoundQueryOptions, RoundParams } from "@/types/Round";
import { RoundSegmentListParams, useRoundSegmentsByRound, useAllRoundSegments } from "@/types/RoundSegment";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
//import { HealthStats, useFighterHealth } from "@/types/HealthStats";

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

    const {data: roundSegments} = useRoundSegmentsByRound(
        {fightId: fightId!, round: currentRound?.number!} as RoundSegmentListParams,
        {enabled: currentRound != undefined}
    );

    const allRoundSegmentsQuery = useAllRoundSegments(fightId!, {enabled: fightId != undefined});

    const getFighterHealth = () : {health: any} | null => {
        
        if(!allRoundSegmentsQuery.data) return null;

        // allRoundSegments is a list of all rounds and all segments fo reach round
        // we need to iterate over this by round.  On each segment, we need to increment the cut points and foul points per fighter
        // for each round, we also need to find out how many TKO points they gained (every 6 points in a round is 1 TKO point for the opponent)
        // Foul points also count towards TKO points.  When we're done, we'll return a compound object of HealthStats for red fighter and health stats
        // for blue fighter
        const redHealth = {
            tkoPoints: 0,
            rightEyeCut: 0,
            leftEyeCut: 0,
            otherCut: 0,
            foulPoints: 0
        };

        const blueHealth = {
            tkoPoints: 0,
            rightEyeCut: 0,
            leftEyeCut: 0,
            otherCut: 0,
            foulPoints: 0
        };

        // Find the max round number
        const maxRound = Math.max(...allRoundSegmentsQuery.data.map(rs => rs.round));
        for(let roundNumber = 1; roundNumber <= maxRound; roundNumber++) {
            const segmentsThisRound = allRoundSegmentsQuery.data.filter(rs => rs.round === roundNumber);
            let redPointsThisRound = 0;
            let bluePointsThisRound = 0;
            let redFoulPointsThisRound = 0;
            let blueFoulPointsThisRound = 0;

            for(const segment of segmentsThisRound) {
                redHealth.rightEyeCut += segment.redRightEyeCut;
                redHealth.leftEyeCut += segment.redLeftEyeCut;
                redHealth.otherCut += segment.redOtherCut;
                redHealth.foulPoints += segment.redFoulPoints;
                redFoulPointsThisRound += segment.redFoulPoints;
                redPointsThisRound += segment.redPoints;

                blueHealth.rightEyeCut += segment.blueRightEyeCut;
                blueHealth.leftEyeCut += segment.blueLeftEyeCut;
                blueHealth.otherCut += segment.blueOtherCut;
                blueHealth.foulPoints += segment.blueFoulPoints;
                blueFoulPointsThisRound += segment.blueFoulPoints;
                bluePointsThisRound += segment.bluePoints;
            }

            // Calculate TKO points
            blueHealth.tkoPoints += Math.floor((redPointsThisRound + redFoulPointsThisRound) / 6);
            redHealth.tkoPoints += Math.floor((bluePointsThisRound + blueFoulPointsThisRound) / 6);
        }

        return {health: {red: redHealth, blue: blueHealth}};
    }
    

    return {
        fight,
        currentRound,
        redFighter,
        blueFighter,
        roundSegments,
        getFighterHealth
    };
}

export default useFight;