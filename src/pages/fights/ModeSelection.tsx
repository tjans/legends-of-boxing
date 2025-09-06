import usePageTitle from '@/hooks/usePageTitle'
import ContentWrapper from "@/components/ContentWrapper";
import Button from '@/components/Elements/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createCurrentRoundQueryOptions, RoundParams, deleteCurrentRound } from '@/types/Round';

export default function ModeSelection() {
  const { fightId } = useParams();
  const navigate = useNavigate();

    // Fetch the current round
    const {data: currentRound} = useQuery(createCurrentRoundQueryOptions(
        {fightId: fightId!} as RoundParams,
        {enabled: fightId != undefined}
    ));

    // Need to create a mutation that deletes the current round.
    const deleteRoundMutation = useMutation({
        mutationFn: () => deleteCurrentRound(fightId!),
        onSuccess: () => {
          navigate(`/fight/${fightId}`);
        }
      });

    usePageTitle("Mode Selection");

    const handleUndo = async () => {
        await deleteRoundMutation.mutateAsync();
        navigate(`/fight/${fightId}`);
    }

  return (
    <>
      <ContentWrapper>
        Mode Selection

        {currentRound && <pre>{JSON.stringify(currentRound, null, 2)}</pre>}

        <div><Button onClick={handleUndo}>Undo</Button></div>
      </ContentWrapper>
    </>
  );
}