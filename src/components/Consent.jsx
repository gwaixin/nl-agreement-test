import { langToWord } from "../utils/helper";
import { CListGroupItem, CButton } from '@coreui/react';
import Icon from "./Icon";

const Consent = (props) => {

  const onPlay = (index) => {
    document.getElementById('player-' + index).play()
  }

  const { name, lang, record, respond } = props.consent
  const respondIcon = respond ? <Icon name="check" className="green" /> : <Icon name="times" className="red" />

  return (
    <CListGroupItem  className="cl-item d-flex">
      <div className="cl-item-info w-100">
        <h4>{name}</h4>
        <small>Language: {langToWord(lang)}</small>
      </div>
      <div className="d-flex align-items-center">
        { respondIcon }

        <CButton
          shape="rounded-pill"
          color="light"
          className="ml-3 btn-round"
          onClick={() => onPlay(props.index)}>
          <img src="/icons/play.svg" alt="play button" />
        </CButton>
        <audio id={'player-' + props.index} src={record}></audio>
      </div>
    </CListGroupItem>
  );
}

export default Consent;