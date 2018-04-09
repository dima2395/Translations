import React from "react";
import { Button, Form } from "semantic-ui-react";
import { InputField } from "layout/forms/inputs";
import { Field, reduxForm } from "redux-form";

const form = props => {
  const { handleSubmit, submitting, nameReadOnly } = props;
  return (
    <Form onSubmit={handleSubmit} loading={submitting} id="create-update-form">
      <Field
        component={InputField}
        name="name"
        label="Текст"
        placeholder="Текст ..."
        readOnly={nameReadOnly}
      />
      <Field
        component={InputField}
        name="snippet"
        label="Перевод"
        placeholder="Перевод ..."
      />
    </Form>
  );
};

export default reduxForm({
  form: "translation"
})(form);
