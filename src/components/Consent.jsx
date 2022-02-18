import { langToWord } from "../utils/helper";
import { CListGroupItem, CButton } from '@coreui/react';

const Consent = (props) => {

  const onPlay = () => {
    alert("Play!!");
  }

  const { name, lang, respond } = props.consent

  return (
    <CListGroupItem  className="cl-item d-flex">
      <div className="cl-item-info w-100">
        <h5>{name}</h5>
        <small>Language: {langToWord(lang)}</small>
      </div>
      <div className="d-flex">
        <span className="icon-check"></span>
        <CButton className="btn-play" onClick={onPlay}>play</CButton>
      </div>
    </CListGroupItem>
  );
}

export default Consent;