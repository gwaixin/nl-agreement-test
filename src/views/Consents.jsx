import { useSelector } from "react-redux";
import Consent from "../components/Consent";
import { CListGroup } from '@coreui/react';

const Consents = () => {

  const list = useSelector((state) => state.consentList)

  const listContent = list.map((consent, i) => {
    return <Consent consent={consent} key={i} />
  })

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>All Consents</h1>

      <div className="consent-lists">
        <div className="d-flex justify-content-between mb-3 mt-5">
          <div className="cl-header">Details</div>
          <div className="cl-header">Consent Given</div>
        </div>

        <CListGroup>{listContent}</CListGroup>
      </div>

    </div>
  );
}

export default Consents;
