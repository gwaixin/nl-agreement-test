import { useDispatch, useSelector } from "react-redux";
import Consent from "../components/Consent";
import { CButton, CListGroup } from '@coreui/react';
import { useEffect } from "react";
import { reset as resetConsent } from "../store/consentSlice";
import { reset as resetList} from "../store/consentListSlice";

const Consents = () => {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetConsent());
  });

  const list = useSelector((state) => state.consentList);
  const listContent = list.map((consent, i) => {
    return <Consent consent={consent} index={i} key={i} />
  });

  const Clear = () => list && list.length > 0 ? (
    <div className="mt-5 w-100">
      <CButton color="warning" variant="ghost" size="sm" onClick={() => dispatch(resetList())}>Clear Consents</CButton>
    </div>
  ) : <small>No consent available.</small>;

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>All Consents</h1>

      <div className="consent-lists">
        <div className="d-flex justify-content-between mb-3 mt-5">
          <div className="cl-header">Details</div>
          <div className="cl-header">Consent Given</div>
        </div>

        <CListGroup flush>{listContent}</CListGroup>
        <Clear />
      </div>

    </div>
  );
}

export default Consents;
