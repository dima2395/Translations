import React from "react";
import { connect } from "react-redux";
import TranslationForm from "./TranslationForm";
import { addTranslation, updateTranslation } from "redux/reducers/translations";

class TranslationFormContainer extends React.Component {
  submit = values => {
    const entity = this.props.entity;
    if (entity) {
      //edit transaltion
      return this.props.updateTranslation(entity.id, values);
    } else {
      //create translation
      return this.props.addTranslation(values);
    }
  };

  render() {
    const { entity } = this.props;
    const initialValues = entity
      ? {
          name: entity.name,
          snippet: entity.snippet
        }
      : null;
    return (
      <TranslationForm
        onSubmit={this.submit}
        initialValues={initialValues}
        nameReadOnly={entity ? true : false}
      />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = { addTranslation, updateTranslation };

export default connect(mapStateToProps, mapDispatchToProps)(
  TranslationFormContainer
);
