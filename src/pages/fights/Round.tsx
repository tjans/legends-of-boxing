import React from "react";
import usePageTitle from '@/hooks/usePageTitle'
import { useState } from 'react';
import ContentWrapper from "@/components/ContentWrapper";
import useFight from '@/hooks/useFight';
import Button from '@/components/Elements/Button';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from 'react-icons/fa';
import { RoundSegment, UpdatableKeys, useDeleteRoundSegmentMutation, useSaveRoundSegmentMutation } from '@/types/RoundSegment';
import utilities from "@/utilities";
import { useNavigate } from "react-router-dom";

export default function RoundHome() {
  const fightData = useFight();
  const [showOther, setShowOther] = useState(false);
  const navigate = useNavigate();

  const saveRoundSegmentMutation = useSaveRoundSegmentMutation();
  const deleteRoundSegmentMutation = useDeleteRoundSegmentMutation();

  const handleUndo = async () => {
    const lastSegment = fightData.roundSegments && fightData.roundSegments.length > 0 ? fightData.roundSegments[fightData.roundSegments.length - 1] : null;
    console.log(lastSegment)
    if(lastSegment)
    {
      await deleteRoundSegmentMutation.mutate(lastSegment);
      if(lastSegment.segment == 1) {
        navigate(`/fight/${fightData.fight?.id}/mode-selection`);
      }
    }
  }

  const handleNextSegment = async () => {
    if(!fightData?.fight || !fightData.roundSegments || !fightData.currentRound) return;
    const segment: RoundSegment = {
            fightId: fightData.fight.id!,
            round: fightData.currentRound.number,
            segment: fightData.roundSegments.length + 1,
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
  }

  const handlePointsChange = async (key: UpdatableKeys, change: number) => {
    
    const currentSegment = {...fightData.roundSegments ? fightData.roundSegments[fightData.roundSegments.length - 1] : null};
    if(!currentSegment) return;

    currentSegment[key]! += change;
    currentSegment[key]! = Math.max(0, currentSegment[key]!); // Prevent negative values
    
    await saveRoundSegmentMutation.mutate(currentSegment as RoundSegment);
  }

  usePageTitle("Round Home");

  return (
    <>
    <div>Make sure undo/next can't go past the first/last segment</div>
    {(fightData.currentRound && fightData.roundSegments) && (
      <ContentWrapper>
        <h1 className="text-2xl font-bold">Round {fightData.currentRound.number}</h1>
        Show cut points for the entire match

        <table>
          <thead>
            <tr>
              {fightData.roundSegments.slice(-4).map((segment) => (
                <React.Fragment key={segment.id}>
                <th key={segment.id} className="text-center font-bold px-4">
                  {utilities.getSegmentTime(segment.segment)}
                </th>
                </React.Fragment>
              ))}
              <th className="px-4 text-center">F</th>
            </tr>
          </thead>
        
          <tbody>
            <tr>
            {fightData.roundSegments.slice(-4).map((segment) => (
                <td className="border border-black px-4 font-bold text-red-600 text-center" key={"red_" + segment.id}>
                  {segment.redPoints ? segment.redPoints : ""}
                  {segment.redFoulPoints !== 0 && (<span className="text-sm text-gray-500"> (F{segment.redFoulPoints})</span>)}
                </td>
            ))}
            <td className="border border-black px-4 font-bold text-red-600 text-center bg-gray-200">
              {fightData.roundSegments.reduce((total, seg) => total + seg.redPoints + seg.redFoulPoints, 0)}
            </td>
            </tr>

            <tr className="font-bold text-blue-600">
            {fightData.roundSegments.slice(-4).map((segment) => (
                <td className="border border-black px-4 font-bold text-blue-600 text-center" key={"blue_" + segment.id}>
                  {segment.bluePoints ? segment.bluePoints : ""}
                  {segment.blueFoulPoints !== 0 && (<span className="text-sm text-gray-500"> (F{segment.blueFoulPoints})</span>)}
                </td>
            ))}
            <td className="border border-black px-4 font-bold text-blue-600 text-center bg-gray-200">
              {fightData.roundSegments.reduce((total, seg) => total + seg.bluePoints + seg.blueFoulPoints, 0)}
            </td>
            </tr>
          </tbody>
        </table>

        <div className="flex gap-8">
            <div>
              <div>Show Cut/TKO points</div>

              <div className="font-bold mt-4">Punch</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-red-400 hover:bg-red-800 flex items-center justify-center`} onClick={() => handlePointsChange('redPoints', 1)}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-red-400 hover:bg-red-800 flex items-center justify-center`} onClick={() => handlePointsChange('redPoints', -1)}><FaChevronDown /></Button>
              </div>

              {showOther && 
              <>
              <div className="font-bold">Right Eye Cut</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-red-400 hover:bg-red-800 flex items-center justify-center`} onClick={() => handlePointsChange('redRightEyeCut', 1)}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-red-400 hover:bg-red-800 flex items-center justify-center`} onClick={() => handlePointsChange('redRightEyeCut', -1)}><FaChevronDown /></Button>

              </div>

              <div className="font-bold">Left Eye Cut</div>
              <div className="mb-4 flex gap-1">
                  <div className="mb-4 flex gap-1">
                      <Button className={`w-12 bg-red-400 hover:bg-red-800 flex items-center justify-center`} onClick={() => handlePointsChange('redLeftEyeCut', 1)}><FaChevronUp /></Button>
                      <Button className={`w-12 bg-red-400 hover:bg-red-800 flex items-center justify-center`} onClick={() => handlePointsChange('redLeftEyeCut', -1)}><FaChevronDown /></Button>
                  </div>
              </div>

              <div className="font-bold">Other Cut</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-red-400 hover:bg-red-800 flex items-center justify-center`} onClick={() => handlePointsChange('redOtherCut', 1)}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-red-400 hover:bg-red-800 flex items-center justify-center`} onClick={() => handlePointsChange('redOtherCut', -1)}><FaChevronDown /></Button>
              </div>

              <div className="font-bold">Foul</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-red-400 hover:bg-red-800 flex items-center justify-center`} onClick={() => handlePointsChange('redFoulPoints', 1)}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-red-400 hover:bg-red-800 flex items-center justify-center`} onClick={() => handlePointsChange('redFoulPoints', -1)}><FaChevronDown /></Button>
              </div>
              </>
              }
            </div>

            <div>
              <div>Show Cut/TKO points</div>

              <div className="font-bold mt-4">Punch</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-blue-100 hover:bg-blue-800 flex items-center justify-center`} onClick={() => handlePointsChange('bluePoints', 1)}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-blue-100 hover:bg-blue-800 flex items-center justify-center`} onClick={() => handlePointsChange('bluePoints', -1)}><FaChevronDown /></Button>
              </div>

          {showOther && 
              <>
              <div className="font-bold">Right Eye Cut</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-blue-100 hover:bg-blue-800 flex items-center justify-center`} onClick={() => handlePointsChange('blueRightEyeCut', 1)}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-blue-100 hover:bg-blue-800 flex items-center justify-center`} onClick={() => handlePointsChange('blueRightEyeCut', -1)}><FaChevronDown /></Button>

              </div>

              <div className="font-bold">Left Eye Cut</div>
              <div className="mb-4 flex gap-1">
                  <div className="mb-4 flex gap-1">
                      <Button className={`w-12 bg-blue-100 hover:bg-blue-800 flex items-center justify-center`} onClick={() => handlePointsChange('blueLeftEyeCut', 1)}><FaChevronUp /></Button>
                      <Button className={`w-12 bg-blue-100 hover:bg-blue-800 flex items-center justify-center`} onClick={() => handlePointsChange('blueLeftEyeCut', -1)}><FaChevronDown /></Button>
                  </div>
              </div>

              <div className="font-bold">Other Cut</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-blue-100 hover:bg-blue-800 flex items-center justify-center`} onClick={() => handlePointsChange('blueOtherCut', 1)}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-blue-100 hover:bg-blue-800 flex items-center justify-center`} onClick={() => handlePointsChange('blueOtherCut', -1)}><FaChevronDown /></Button>
              </div>

              <div className="font-bold">Foul</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-blue-100 hover:bg-blue-800 flex items-center justify-center`} onClick={() => handlePointsChange('blueFoulPoints', 1)}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-blue-100 hover:bg-blue-800 flex items-center justify-center`} onClick={() => handlePointsChange('blueFoulPoints', -1)}><FaChevronDown /></Button>
              </div>
              </>
              }
            </div>
  
        </div>



        <div className="space-x-2 my-4">
          {!showOther && (
                <Button onClick={() => setShowOther(true)}>Show Other</Button>
              )}
              {showOther && (
                <Button onClick={() => setShowOther(false)}>Hide Other</Button>
              )}
              
          <Button color="secondary" onClick={handleUndo}>Undo</Button>
         
          {fightData.roundSegments.length < 9 && (
            <Button color="success" onClick={handleNextSegment}>Next Segment</Button>
          )}
        </div>

      </ContentWrapper>
    )}
    </>
    
  );
}