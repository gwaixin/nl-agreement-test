import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/consentListSlice";
import { updateRespond, updateRecord} from "../store/consentSlice";

import { OnLongPress } from '../utils/event';
import { transLang } from "../utils/translator";
import recognition from "../utils/recognition";

import {
  CContainer,
  CRow,
  CCol,
  CButton
} from '@coreui/react';


const MicButton = (props) => {
  const onMicLongpress = OnLongPress(() => {}, 500);

  return (
    <div className="d-flex justify-content-center">
      <CButton color="light" {...onMicLongpress} shape="rounded-pill">
        <img src="/icons/mic.svg" alt="mic button" />
      </CButton>
    </div>
  );
}

const Response = (props) => {
  return (
    <div>
      <CButton className="mr-1" color="light" onClick={() => alert("play!")} shape="rounded-pill">
        <img src="/icons/play.svg" alt="play button" />
      </CButton>
      <span>You responded "{ props.respond ? 'Yes' : 'No' }"</span>
    </div>
  )
}

const ShowSave = (props) => {
  return props.show ? (<CRow>
    <CCol className="text-end">
      <CButton color="light" className="mr-1 retry" onClick={props.onRetry}>Retry</CButton>
      <CButton className="next" onClick={props.onSave}>Save</CButton>
    </CCol>
  </CRow>) : null
}


const FormAgreement = props => {

  const [readConsent, setReadConsent] = useState(0);
  const [init, setInit] = useState(true);


  const { name, lang, respond } = useSelector(state => state.consent);
  const dispatch = useDispatch();

  const response = respond !== null ?
    <Response respond={respond} /> :
    <MicButton useDispatch={dispatch}/>;


  const agreement = transLang(lang, 'agreement');
  const confirmation = transLang(lang, 'confirmation');


  useEffect(() => {
    if (init) {
      recognition.init();

      setTimeout(function() {
        recognition.initResult(({ message }) => {
          if (message.indexOf('you must not access or use the site or the site services') >= 0 ) {
            setReadConsent(readConsent + 1);
            recognition.onEnd();
          }

          if (readConsent >= 1) {
            let correct = (lang === 'en' && message === 'yes') ||
                          (lang === 'fn' && message === 'oui')
            dispatch(updateRespond(correct));
          }
        })
        recognition.onAddRecognitionList(agreement, lang);
        recognition.onStart();
        console.log("this is set here");
      }, 500);

    }

    setInit(false);
  }, [init, agreement, lang, readConsent, dispatch]);


  const onSave = () => {
    let record = "this is a path to record file";
    dispatch(add({ lang, respond, name, record}))
    dispatch(updateRecord(record))
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
        <CCol>{response}</CCol>
      </CRow>

      <ShowSave show={respond !== null} onSave={onSave} onRetry={() => onRetry()} />

    </CContainer>
  );

}

export default FormAgreement;