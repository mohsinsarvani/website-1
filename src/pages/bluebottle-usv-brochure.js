import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import axios from 'axios';
import styled from 'styled-components';
import { Col } from 'react-flexbox-grid';
import { Feedback, Alert, FormField, TextareaField } from '../components/Form';
import Heading from '../components/Heading';
import Button from '../components/Button';

const FieldWrapper = styled.div`
  margin: 0 0 0.625em;
`;

class TechnicalSpecificationForm extends React.Component {
  static validateFullName(value) {
    let error;
    if (!value) {
      error = 'Please enter your name';
    }
    return error;
  }

  static validateInterest(value) {
    let error;
    if (!value) {
      error = 'Please enter reason for interest';
    }
    return error;
  }

  static validateEmail(value) {
    let error;
    if (!value) {
      error = 'Please enter your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Please provide a valid email';
    }
    return error;
  }

  constructor(props) {
    super(props);
    this.state = {
      submitSuccess: false,
      formMessage: null
    };

    // Bind class methods
    this.handleFormSubmitSuccess = this.handleFormSubmitSuccess.bind(this);
    this.handleFormSubmitError = this.handleFormSubmitError.bind(this);
  }

  handleFormSubmitSuccess() {
    this.setState({
      submitSuccess: true,
      formMessage: 'Your message was sent successfully. You will receive a reply within 24 hours.'
    });
  }

  handleFormSubmitError(error) {
    this.setState({
      submitSuccess: false,
      formMessage: `Unable to submit form. ${error}. Please try again.`
    });
  }

  render() {
    return (
      <Col xs={12} md={12} lg={12} style={{ paddingBottom: '20px' }}>
        <header id="technical" className="centered">
          <Heading level={1} size="huge" underline>
            BlueBottle USV Brochure
          </Heading>
        </header>
        <p>
          For technical specifications of Ocius&apos; BlueBottle USV, contact us below for a PDF
          Brochure
        </p>
        <Formik
          initialValues={{
            fullName: '',
            position: '',
            company: '',
            email: '',
            phone: '',
            interest: ''
          }}
          onSubmit={({ fullName, position, company, email, phone, interest }, actions) => {
            const endPoint = 'https://c2fpksv8c0.execute-api.us-east-1.amazonaws.com/dev';

            axios
              .post(`${endPoint}/contact`, {
                // HACK: Endpoint expects name property
                fullName,
                position,
                company,
                email,
                phone,
                interest
              })
              .then(response => {
                if (response.status === 200) {
                  this.handleFormSubmitSuccess();
                  actions.resetForm();
                } else {
                  this.handleFormSubmitError();
                }
              })
              .catch(error => {
                this.handleFormSubmitError(error);
              });
          }}
        >
          {({ errors, touched, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              {this.state.formMessage && (
                <Alert success={this.state.submitSuccess}>{this.state.formMessage}</Alert>
              )}
              <FieldWrapper>
                <FormField
                  type="text"
                  name="fullName"
                  className={`form-control ${errors.fullName && touched.fullName && 'is-invalid'}`}
                  validate={TechnicalSpecificationForm.validateFullName}
                  placeholder="Full Name (required)"
                />
                <ErrorMessage name="fullName">{msg => <Feedback>{msg}</Feedback>}</ErrorMessage>
              </FieldWrapper>

              <FieldWrapper>
                <FormField type="text" name="position" placeholder="Position" />
              </FieldWrapper>
              <FieldWrapper>
                <FormField type="text" name="company" placeholder="Company or Company Website" />
              </FieldWrapper>
              <FieldWrapper>
                <FormField
                  type="email"
                  name="email"
                  className={`form-control ${errors.email && touched.email && 'is-invalid'}`}
                  validate={TechnicalSpecificationForm.validateEmail}
                  placeholder="Email (required)"
                />
                <ErrorMessage name="email">{msg => <Feedback>{msg}</Feedback>}</ErrorMessage>
              </FieldWrapper>

              <FieldWrapper>
                <FormField type="tel" name="phone" placeholder="Phone" />
              </FieldWrapper>
              <FieldWrapper>
                <TextareaField
                  name="interest"
                  component="textarea"
                  className={`form-control ${errors.interest && touched.interest && 'is-invalid'}`}
                  validate={TechnicalSpecificationForm.validateInterest}
                  cols={40}
                  rows={10}
                  placeholder="Reason for interest (required)"
                />
                <ErrorMessage name="interest">{msg => <Feedback>{msg}</Feedback>}</ErrorMessage>
              </FieldWrapper>

              <Button type="submit" size="medium" color="blue" disabled={isSubmitting}>
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Col>
    );
  }
}

TechnicalSpecificationForm.propTypes = {};
TechnicalSpecificationForm.defaultProps = {};

export default TechnicalSpecificationForm;
