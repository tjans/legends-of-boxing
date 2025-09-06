// foundation
import ContentWrapper from "@/components/ContentWrapper";
import {useQuery} from "@tanstack/react-query";
import {createFightQueryOptions, FightParams} from "@/types/Fight"
import { createCurrentRoundQueryOptions, RoundParams } from "@/types/Round";
import { useParams } from 'react-router-dom';
import Button from "@/components/Elements/Button";
import { useNavigate } from "react-router-dom";


export default function FightHome() {
  const { fightId } = useParams();
  const navigate = useNavigate();

  const handleBeginRound = () => {
    // Logic to begin the round goes here
    console.log("create a Round and send user to mode selection screen");
    navigate(`/fight/${fightId}/mode-selection`);
  }

  // Only run the query if fightId is defined
  const {data: fight} = useQuery(createFightQueryOptions(
      {fightId: fightId!} as FightParams
  ));

  const {data: currentRound} = useQuery(createCurrentRoundQueryOptions(
      {fightId: fightId!} as RoundParams,
      {enabled: fight != undefined}
  ));

  return (
    <>
      <ContentWrapper>
        {fight && <pre>{JSON.stringify(fight, null, 2)}</pre>}

        {!currentRound && <Button onClick={handleBeginRound}>Begin Fight</Button>}

        
          <p>If there is no round, show button for begin fight that will create a Round and send user to mode selection screen</p>
          <p>If there is a round but no segments, round hasn't started - show a button to set the mode for the fighters</p>
          <p>If there is a round that has segments with more segments remaining, show a button to "continue fight" that takes them to the Round screen</p>
          <p>If there is a round that has segments and we've completed the last segment, show a button to "End of Round Scoring"</p>
          <p>Permanent deductions can be entered here?</p>
          <p>Show fight results here</p>

      </ContentWrapper>
    </>
  );
}