import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {injectIntl} from "react-intl";

class AlertDialog extends Component {
  render() {
    const {messages} = this.props.intl;
    const {isOpen, message, modalType, modalTitle, toggle} = this.props;

    return (
      <Modal isOpen={isOpen} className={modalType}>
        <ModalHeader>
          {messages[modalTitle]}
        </ModalHeader>

        <ModalBody>
          {messages[message]}
        </ModalBody>

        <ModalFooter>

          <Button className="mr-2" color="primary" onClick={toggle}>
            {messages['global.btn.ok']}
          </Button>

        </ModalFooter>
      </Modal>
    );
  }
}

export default injectIntl(AlertDialog);
