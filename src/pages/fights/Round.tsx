import usePageTitle from '@/hooks/usePageTitle'
import { useState } from 'react';
import ContentWrapper from "@/components/ContentWrapper";
import useFight from '@/hooks/useFight';
import Button from '@/components/Elements/Button';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from 'react-icons/fa';

export default function RoundHome() {
  const fightData = useFight();
  if(!fightData.currentRound || !fightData.roundSegments) return <div>Loading...</div>

  const [showOther, setShowOther] = useState(false);

  usePageTitle("Round Home");

  return (
    <>
      <ContentWrapper>
        <h1 className="text-2xl font-bold">Round {fightData.currentRound.number}</h1>
        Show cut points for the entire match

        <table>
          <thead>
            <tr>
              {fightData.roundSegments.slice(-4).map((segment) => (
                <>
                <th key={segment.id} className="text-center font-bold px-4">
                  {segment.segment}
                </th>
                <th className="px-4 text-center">F</th>
                </>
              ))}
            </tr>
          </thead>
        
          <tbody>
            <tr>
            {fightData.roundSegments.slice(-4).map((segment) => (
                <td className="border border-black px-4 font-bold text-red-600 text-center" key={"red_" + segment.id}>
                  {segment.redPoints + segment.redFoulPoints}
                </td>
            ))}
            <td className="border border-black px-4 font-bold text-red-600 text-center bg-gray-200">?</td>
            </tr>

            <tr className="font-bold text-blue-600">
            {fightData.roundSegments.slice(-4).map((segment) => (
                <td className="border border-black px-4 font-bold text-blue-600 text-center" key={"blue_" + segment.id}>
                  {segment.bluePoints + segment.blueFoulPoints}
                </td>
            ))}
            <td className="border border-black px-4 font-bold text-blue-600 text-center bg-gray-200">?</td>
            </tr>
          </tbody>
        </table>

        <div className="flex gap-8">
            <div>
              <div className="font-bold mt-4">Punch</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-red-400 flex items-center justify-center`}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-red-400 flex items-center justify-center`}><FaChevronDown /></Button>
              </div>

              {showOther && 
              <>
              <div className="font-bold">Right Eye Cut</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-red-400 flex items-center justify-center`}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-red-400 flex items-center justify-center`}><FaChevronDown /></Button>

              </div>

              <div className="font-bold">Left Eye Cut</div>
              <div className="mb-4 flex gap-1">
                  <div className="mb-4 flex gap-1">
                      <Button className={`w-12 bg-red-400 flex items-center justify-center`}><FaChevronUp /></Button>
                      <Button className={`w-12 bg-red-400 flex items-center justify-center`}><FaChevronDown /></Button>
                  </div>
              </div>

              <div className="font-bold">Other Cut</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-red-400 flex items-center justify-center`}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-red-400 flex items-center justify-center`}><FaChevronDown /></Button>
              </div>

              <div className="font-bold">Foul</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-red-400 flex items-center justify-center`}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-red-400 flex items-center justify-center`}><FaChevronDown /></Button>
              </div>
              </>
              }
            </div>

            <div>
              <div className="font-bold mt-4">Punch</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-blue-400 flex items-center justify-center`}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-blue-400 flex items-center justify-center`}><FaChevronDown /></Button>
              </div>

          {showOther && 
              <>
              <div className="font-bold">Right Eye Cut</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-blue-400 flex items-center justify-center`}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-blue-400 flex items-center justify-center`}><FaChevronDown /></Button>

              </div>

              <div className="font-bold">Left Eye Cut</div>
              <div className="mb-4 flex gap-1">
                  <div className="mb-4 flex gap-1">
                      <Button className={`w-12 bg-blue-400 flex items-center justify-center`}><FaChevronUp /></Button>
                      <Button className={`w-12 bg-blue-400 flex items-center justify-center`}><FaChevronDown /></Button>
                  </div>
              </div>

              <div className="font-bold">Other Cut</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-blue-400 flex items-center justify-center`}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-blue-400 flex items-center justify-center`}><FaChevronDown /></Button>
              </div>

              <div className="font-bold">Foul</div>
              <div className="mb-4 flex gap-1">
                  <Button className={`w-12 bg-blue-400 flex items-center justify-center`}><FaChevronUp /></Button>
                  <Button className={`w-12 bg-blue-400 flex items-center justify-center`}><FaChevronDown /></Button>
              </div>
              </>
              }
            </div>
  
        </div>



        <div className="space-x-2 my-4">
          <Button>Undo</Button>
        </div>

        <pre>
          {JSON.stringify(fightData.roundSegments, null, 2)}

        </pre>
      </ContentWrapper>
    </>
  );
}