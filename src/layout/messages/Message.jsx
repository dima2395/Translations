import React from "react";
import { Message as MessageComponent } from "semantic-ui-react";

export default class Message extends React.Component {
  render() {
    const { message, deleteMessage } = this.props;
    const type = message.isError ? "error" : "success";
    return (
      <MessageComponent
        header={message.message}
        {...{ [type]: true }}
        onDismiss={() => deleteMessage(message.id)}
      />
    );
  }
}
