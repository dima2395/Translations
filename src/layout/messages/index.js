import React from "react";
import { connect } from "react-redux";
import Message from "./Message";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { getFlashMessages, removeMessage as deleteMessage } from "redux-flash";

class GlobalMessages extends React.Component {
  render() {
    const { messages } = this.props;
    const messagesResult = messages.map(message => (
      <Message
        message={message}
        deleteMessage={this.props.deleteMessage}
        key={message.id}
      />
    ));
    return (
      <div className="global-messages">
        <ReactCSSTransitionGroup
          transitionName="addMessage-animation"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {messagesResult}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: getFlashMessages(state)
  };
}

const mapDispatchToProps = {
  deleteMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMessages);
