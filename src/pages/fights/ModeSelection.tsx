import usePageTitle from '@/hooks/usePageTitle'
import ContentWrapper from "@/components/ContentWrapper";
import Button from '@/components/Elements/Button';
import { useParams, useNavigate } from 'react-router-dom';

export default function ModeSelection() {
  const { fightId } = useParams();
  const navigate = useNavigate();

  usePageTitle("Mode Selection");

    const handleUndo = () => {
        // Logic to undo the last action goes here
        navigate(`/fight/${fightId}`);
    }

  return (
    <>
      <ContentWrapper>
        Mode Selection

        <div><Button onClick={handleUndo}>Undo</Button></div>
      </ContentWrapper>
    </>
  );
}