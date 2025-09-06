// foundation
import usePageTitle from '@/hooks/usePageTitle'
import ContentWrapper from "@/components/ContentWrapper";
import { Link } from 'react-router-dom';

// components


export default function Home() {

  usePageTitle("Home");
  //const [isNotAvailableModalOpen, setIsNotAvailableModalOpen] = useState(false);

  return (
    <>
      <ContentWrapper>
        <Link to={"/fight/ed59b878-fac5-4a98-975e-ae78322f95ca"}>Fight!</Link>
      </ContentWrapper>

      {/* <ConfirmationModal
        isModalOpen={isNotAvailableModalOpen}
        showYes={false}
        noText='Ok'
        onReject={() => setIsNotAvailableModalOpen(false)}
        title="Not available"
        message="This is a modal message" /> */}
    </>
  );
}