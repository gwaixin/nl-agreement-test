import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/consentListSlice";
import { updateRespond, updateRecord, submit } from "../store/consentSlice";

import { OnLongPress } from '../utils/event';
import { transLang } from "../utils/translator";
import recognition from "../utils/recognition";
import recorder from "../utils/recorder";

import {
  CContainer,
  CRow,
  CCol,
  CButton
} from '@coreui/react';
import { stringExist } from "../utils/helper";
import Icon from "./Icon";


const MicButton = (props) => {
  const onMicLongpress = OnLongPress(
    () => {  recorder.record(); recognition.onStart(); },
    () => { recorder.stopRecord(); recognition.onStop(); },
    100
  );

  return (
    <div className="d-flex justify-content-center">
      <CButton className="btn-round" color="light" {...onMicLongpress} shape="rounded-pill">
        <img src="/icons/mic.svg" alt="mic button" />
      </CButton>
    </div>
  );
}

const Response = (props) => {
  return (
    <div>
      <CButton className="mr-1 btn-round" color="light" onClick={() => document.getElementById('player').play()} shape="rounded-pill">
        <img src="/icons/play.svg" alt="play button" />
      </CButton>
      <span>You responded "{ props.respond ? 'Yes' : 'No' }"</span>
    </div>
  )
}

const ShowSave = (props) => {
  return props.show ? (<CRow>
    <CCol className="mt-5 text-end">

      <CButton
        color="light"
        className="mr-1 retry"
        onClick={props.onRetry}>
        <span>Retry</span>
        <Icon name="retry" className="sm" />
      </CButton>

      <CButton className="next" onClick={props.onSave}>
        <span>Save</span>
        <Icon name="next" className="sm white" />
      </CButton>
    </CCol>
  </CRow>) : null
}


const FormAgreement = props => {

  const [readConsent, setReadConsent] = useState(0);
  const [init, setInit] = useState(true);


  const { name, lang, respond, record } = useSelector(state => state.consent);
  const dispatch = useDispatch();

  let response = '';

  if (readConsent >= 1) {
    response = respond !== null ?
      <Response respond={respond} /> :
      <MicButton useDispatch={dispatch}/>;
  }


  const agreement = transLang(lang, 'agreement');
  const confirmation = transLang(lang, 'confirmation');

  useEffect(() => {

    const initializing = async () => {
      try {

        recognition.init();
        await recorder.init();
        recorder.setOnRecord((recorded) => dispatch(updateRecord(recorded)));
        recorder.setPlayerId('player');
        recorder.initListeners();

      } catch (err) {
        console.error("Error in initating utils : ", err);
      }
    }

    console.log("the readconcent is ->", readConsent);

    // for initialization
    if (init) {

      initializing();

      // determine the last 5 words of the agreement
      let speakTarget = agreement.split(" ");
      let offset  = speakTarget.length - 5;
      let limit   = speakTarget.length;
      speakTarget = speakTarget.splice(offset, limit).join(" ").trim().replace('.', '');
      console.log(" the speak target is : ", speakTarget);

      setTimeout(function() {
        recognition.initResult(({ message }) => {
          if (message.indexOf(speakTarget) >= 0 ) {
            recognition.onEnd();
            return setReadConsent(readConsent + 1);
          }
        });
        recognition.onAddRecognitionList(agreement, lang);
        recognition.onStart();
      }, 500);

    }

    if (readConsent >= 1) {
      recognition.initResult(({ message }) => {

        console.log("testing this", readConsent)
        let correct = (lang === 'en' && stringExist(message.toLowerCase(), 'yes')) ||
                      (lang === 'fr' && stringExist(message.toLowerCase(), 'oui'))
        dispatch(updateRespond(correct));
        recognition.onEnd();
      })
    }

    setInit(false);
  }, [init, agreement, lang, readConsent, dispatch]);


  const onSave = () => {
    // let record = "this is a path to record file";
    dispatch(submit(true));
    dispatch(add({ lang, respond, name, record}))
  }

  const onRetry = () => {
    setReadConsent(1);
    dispatch(updateRespond(null));
  }



  return (

    <CContainer className="form">
      <CRow className="mt-5">
        <CCol>
          <p>{agreement}</p>
          <p>{ readConsent >= 1 ? confirmation : ''}</p>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <audio id="player" src=""></audio>
          {response}
        </CCol>
      </CRow>

      <ShowSave show={respond !== null} onSave={onSave} onRetry={() => onRetry()} />

    </CContainer>
  );

}

export default FormAgreement;