import React, { Component } from "react";
import { Segment, Button, Dropdown } from "semantic-ui-react";
import api from "api";
import stream from "eventSource.js";
import { connect } from "react-redux";
import { show as openModal } from "redux-modal";
import {
  getLanguages,
  getTranslations,
  getTranslation,
  setLanguage
} from "redux/reducers/translations";
import CreateUpdateModal from "layout/modals/CreateUpdateModal";
import TranslationForm from "layout/forms/TranslationForm";
import TranslationsTable from "./Table";

class Translations extends Component {
  componentDidMount() {
    this.props.getLanguages();
    this.props.getTranslations();
    stream.addEventListener("translations", entry => {
      const data = JSON.parse(entry.data);
      this.props.getTranslation(data.id);
    });
  }

  openTranslationModal = entity => {
    let content = <TranslationForm />;
    let header = "Создать перевод";

    if (entity) {
      content = <TranslationForm entity={entity} />;
      header = "Редактировать перевод";
    }

    this.props.openModal("create-update", { content, header });
  };

  handleLanguageChange = (e, data) => {
    this.props.setLanguage(data.value);
    this.props.getTranslations();
  };

  render() {
    const languages = this.props.languages.map(lang => ({
      text: lang.name,
      value: lang.code,
      key: lang.code
    }));

    return (
      <div className="translations">
        <h1>Translations</h1>
        <div className="controls">
          <Button primary onClick={() => this.openTranslationModal()}>
            + Cоздать перевод
          </Button>
          <Dropdown
            placeholder="Выберите язык"
            selection
            options={languages}
            value={this.props.language}
            onChange={this.handleLanguageChange}
          />
        </div>
        <TranslationsTable
          celled
          striped
          translations={this.props.translations}
          openTranslationModal={this.openTranslationModal}
        />
        <CreateUpdateModal />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { translations } = state;
  return {
    languages: translations.languages,
    language: translations.language,
    translations: translations.translations
  };
};

export default connect(mapStateToProps, {
  getLanguages,
  getTranslations,
  getTranslation,
  setLanguage,
  openModal
})(Translations);
