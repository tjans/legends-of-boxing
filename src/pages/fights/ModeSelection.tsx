import usePageTitle from '@/hooks/usePageTitle'
import ContentWrapper from "@/components/ContentWrapper";
import Button from '@/components/Elements/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Round, currentRoundQueryOptions, RoundParams, RoundModeKey, RoundMode } from '@/types/Round';
import { deleteCurrentRound, saveRound } from '@/services/roundService';

import useFight from '@/hooks/useFight';
import ModeSelector from '@/components/app/ModeSelector';
import { RoundSegment, roundSegmentListQueryOptions } from '@/types/RoundSegment';
import { saveRoundSegment } from '@/services/RoundSegmentService';
import { UUID } from '@/types/UUID';

export default function ModeSelection() {
const { fightId } = useParams<{ fightId: UUID }>();
  if (!fightId) return;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { fight, currentRound, redFighter, blueFighter, roundSegments } = useFight();
  const roundParams: RoundParams = { fightId: fightId };
  const roundSegmentListParams = { fightId: fightId, round: currentRound ? currentRound.number : 1 };

    // Mutation to save round updates
    const saveRoundMutation = useMutation({
        mutationFn: async (round: Round) => saveRound(round),
        onSuccess: () => {            
            // Invalidate the current round query to refetch the data
            queryClient.invalidateQueries({
                queryKey: currentRoundQueryOptions(roundParams).queryKey
            });
        }
    });

    const saveRoundSegmentMutation = useMutation({
        mutationFn: async (roundSegment: RoundSegment) => saveRoundSegment(roundSegment),
        onSuccess: () => {
            // Invalidate round segments query if needed
            queryClient.invalidateQueries({
                queryKey: roundSegmentListQueryOptions(roundSegmentListParams).queryKey
            });
        }        
    });

    // Allows for undoing the current round if it hasn't started yet
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

    const handleFight = async () => {
        if (!fightId) return;
        const segment: RoundSegment = {
            fightId: fightId,
            round: currentRound ? currentRound.number : 1,
            segment: roundSegments ? roundSegments.length + 1 : 1,
            redPoints: 0,
            redRightEyeCut: 0,
            redLeftEyeCut: 0,
            redOtherCut: 0,
            redFoulPoints: 0,
            blueRightEyeCut: 0,
            blueLeftEyeCut: 0,
            blueOtherCut: 0,
            blueFoulPoints: 0,
            bluePoints: 0,
        };
        await saveRoundSegmentMutation.mutateAsync(segment);
        navigate(`/fight/${fightId}/round`);
    }

    const handleModeChange = (color: 'red' | 'blue', mode: RoundMode) => {
        if (!currentRound) return;
        
        const key: RoundModeKey = color === 'red' ? 'redMode' : 'blueMode';
        const updatedRound: Round = {
            ...currentRound,
            [key]: mode
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
                    <Button color="secondary" onClick={() => navigate(`/fight/${fightId}`)}>Back</Button>

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