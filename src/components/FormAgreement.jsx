import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/consentListSlice";
import { updateRespond, updateRecord} from "../store/consentSlice";

import { OnLongPress } from '../utils/event';
import { transLang } from "../utils/translator";

import {
  CContainer,
  CRow,
  CCol,
  CButton
} from '@coreui/react';


let recognition = new window.SpeechRecognition();
let speechRecognitionList = new window.SpeechGrammarList();

recognition.continuous = false;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const OnResult = (event) => {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var message = event.results[0][0].transcript;
  var confidence = event.results[0][0].confidence;
  console.log("the transcript test ", message);
  console.log('Confidence: ' + confidence);

  return {
    message,
    confidence
  };


}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  console.log("I didn't recognise that Message.");
}

recognition.onerror = function(event) {
  console.log('Error occurred in recognition: ' + event.error);
}



const MicButton = (props) => {
  const onMicLongpress = OnLongPress(() => recognition.start(), 500);

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


  const { name, lang, respond } = useSelector(state => state.consent);
  const dispatch = useDispatch();

  const response = respond !== null ?
    <Response respond={respond} /> :
    <MicButton useDispatch={dispatch}/>;


  const agreement = transLang(lang, 'agreement');
  const confirmation = transLang(lang, 'confirmation');


  const onSave = () => {
    let record = "this is a path to record file";
    dispatch(add({ lang, respond, name, record}))
    dispatch(updateRecord(record))
  }

  const onRetry = () => {
    setReadConsent(1);
    dispatch(updateRespond(null));
  }

  if (!recognition.grammars) {
    speechRecognitionList.addFromString(agreement, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = lang === 'en' ? 'en-US' : 'fn-Fn';
  }

  recognition.onresult = function(event) {
    const { message, confidence } = OnResult(event)

    if (confidence >= 0.5) {
      setReadConsent(readConsent + 1)
    }

    if (readConsent >= 1) {
      let correct = lang === 'en' && message === 'yes' ||
                    lang === 'fn' && message === 'oui'
      dispatch(updateRespond(correct));
    }
  }.bind(this);

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