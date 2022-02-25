import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form";
import FormAgreement from "../components/FormAgreement";
import FormSuccess from "../components/FormSuccess";
import { updateForm } from "../store/consentSlice";

const Home = props => {

  const {
    name,
    lang,
    respond,
    record,
    submit
  } = useSelector(state => state.consent);
  const dispatch = useDispatch();

  // by default we show the form
  let content = <Form onNext={(name, lang) => dispatch(updateForm({ name, lang}))} />;

  // if all are filled up and saved consent then lets show success
  if ( name && lang && respond != null && record && submit ) {
    content = <FormSuccess />;

  // done already with name and lang form
  } else if (name && lang) {
    content = <FormAgreement />;
  }

  return (
    <div className="container">
      <h1>Consent Form</h1>
      {content}
    </div>
  );
}

export default Home;