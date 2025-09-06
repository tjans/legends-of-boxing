// foundation
import ContentWrapper from "@/components/ContentWrapper";
import {useQuery, useMutation} from "@tanstack/react-query";
import {createFightQueryOptions, FightParams} from "@/types/Fight"
import { createCurrentRoundQueryOptions, RoundParams, saveRound } from "@/types/Round";
import { useParams } from 'react-router-dom';
import Button from "@/components/Elements/Button";
import { useNavigate } from "react-router-dom";
import useFight from "@/hooks/useFight";


export default function FightHome() {
  const { fightId } = useParams();
  const navigate = useNavigate();

  const saveRoundMutation = useMutation({
    mutationFn: () => saveRound({
      fightId: fightId!, 
      number: 1
    }),
    onSuccess: () => {
      navigate(`/fight/${fightId}/mode-selection`);
    }
  });

  const handleBeginRound = async () => {
    await saveRoundMutation.mutateAsync();
  }

  const { fight, currentRound } = useFight();

  return (
    <>
      <ContentWrapper>
        {fight && <pre>{JSON.stringify(fight, null, 2)}</pre>}
        
        {!currentRound && (
          <Button 
            onClick={handleBeginRound}
            loading={saveRoundMutation.isPending}
            disabled={saveRoundMutation.isPending}
          >
            Begin Round 1
          </Button>
        )}

        {currentRound && (
          <Button 
            onClick={() => navigate(`/fight/${fightId}/mode-selection`)}
          >
            Continue Round 1
          </Button>

        )}

        
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