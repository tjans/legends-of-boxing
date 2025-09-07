import usePageTitle from '@/hooks/usePageTitle'
import ContentWrapper from "@/components/ContentWrapper";
import useFight from '@/hooks/useFight';

export default function RoundHome() {
  const fight = useFight();

  usePageTitle("Round Home");
  //const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState(false);

  return (
    <>
      <ContentWrapper>
        <pre>
          {JSON.stringify(fight.roundSegments, null, 2)}
        </pre>
      </ContentWrapper>
    </>
  );
}