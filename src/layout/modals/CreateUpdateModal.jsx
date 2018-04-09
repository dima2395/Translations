import React, { Component } from "react";

import { Button, Modal } from "semantic-ui-react";
import { connectModal } from "redux-modal";

class CreateUpdateModal extends Component {
  render() {
    const { show, handleHide, header, content } = this.props;

    return (
      <Modal open={show} onClose={handleHide} size="tiny">
        <Modal.Header>{header}</Modal.Header>

        <Modal.Content>{content}</Modal.Content>

        <Modal.Actions>
          <Button onClick={handleHide}>Закрыть</Button>
          <Button primary type="submit" form="create-update-form">
            Сохранить
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connectModal({ name: "create-update" })(CreateUpdateModal);
