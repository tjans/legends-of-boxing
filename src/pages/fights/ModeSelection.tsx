import usePageTitle from '@/hooks/usePageTitle'
import ContentWrapper from "@/components/ContentWrapper";
import Button from '@/components/Elements/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCurrentRound, saveRound, Round, createCurrentRoundQueryOptions, RoundParams } from '@/types/Round';

import useFight from '@/hooks/useFight';
import ModeSelector from '@/components/app/ModeSelector';

export default function ModeSelection() {
  const { fightId } = useParams();
  if (!fightId) return;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { fight, currentRound, redFighter, blueFighter, roundSegments } = useFight();
  const roundParams: RoundParams = { fightId: fightId };

    // Mutation to save round updates
    const saveRoundMutation = useMutation({
        mutationFn: (round: Round) => saveRound(round),
        onSuccess: () => {            
            // Invalidate the current round query to refetch the data
            queryClient.invalidateQueries({
                queryKey: createCurrentRoundQueryOptions(roundParams).queryKey
            });
        }
    });

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

    const handleFight = () => {
        alert('Fight!');
    }

    const handleModeChange = (color: 'red' | 'blue', mode: any) => {
        if (!currentRound) return;
        
        const updatedRound = {
            ...currentRound,
            [color === 'red' ? 'redMode' : 'blueMode']: mode
        };
        
        saveRoundMutation.mutate(updatedRound);
    }

  return (
    <>
      <ContentWrapper>
        {!currentRound && 
            <>
            <div>You can't select a mode because there is no current round.</div>
                <div><Button onClick={() => navigate(`/fight/${fightId}`)}>Back to fight</Button></div>
            </>
        }

        {fight && currentRound && 
            <>
                <ModeSelector 
                    fighter={redFighter} 
                    variant="red" 
                    selectedMode={currentRound.redMode} 
                    onSelectMode={(mode) => handleModeChange('red', mode)} 
                />

                <ModeSelector 
                    fighter={blueFighter} 
                    variant="blue" 
                    selectedMode={currentRound.blueMode} 
                    onSelectMode={(mode) => handleModeChange('blue', mode)} 
                />

                <div>
                    {/* 
                        Don't want to allow undoing if the round has started, you can only undo by undoing the last segment
                        This really only matters if you leave mid-round and come back, you'll be prsented with this screen
                        again. If there are segments, the round has started.  If not, you can undo the round here.
                    */}
                    {!roundSegments && 
                    <Button color="secondary" onClick={handleUndo}>Undo</Button>}

                    {currentRound.blueMode && currentRound.redMode && 
                        <Button color="success" onClick={handleFight}>Fight!</Button>
                    }
                </div>

            </>
        }

        
      </ContentWrapper>
    </>
  );
}