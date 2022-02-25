import React from "react";
import '../scss/form.scss';
import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CFormInput,
  CFormSelect
} from '@coreui/react';
import Icon from "./Icon";

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      lang: ''
    }
  }

  changeName = event => {
    this.setState({ name: event.target.value });
  }

  changeLang = event => {
    this.setState({ lang: event.target.value });
  }

  render() {

    const { name, lang } = this.state;
    const langs = [
      'Select Language',
      { value: 'en', label: 'English' },
      { value: 'fr', label: 'French' },
    ]

    return (
      <CContainer className="form">
        <CRow className="mt-5">
          <CCol>
            <label>Name</label>
            <CFormInput type="text" placeholder="Enter your name" value={name} onChange={this.changeName}/>
          </CCol>
        </CRow>

        <CRow className="mt-5">
          <CCol>
            <label>Language</label>
            <CFormSelect
              options={langs}
              onChange={this.changeLang}
              defaultValue={lang}/>
          </CCol>
        </CRow>

        <CRow className="mt-5 align-items-end">
          <CCol className="text-end">
            <CButton
              color="light"
              type="button"
              className="next"
              onClick={() => this.props.onNext(name, lang)}>
                <span>Next</span>
                <Icon className="sm" name="next" />
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    )
  }
}

export default Form;