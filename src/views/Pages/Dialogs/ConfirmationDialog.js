import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {injectIntl} from "react-intl";

class ConfirmationDialog extends Component {
  render() {
    const {messages} = this.props.intl;
    const {isOpen, message, modalType, modalTitle} = this.props;

    return (
      <Modal isOpen={isOpen} className={modalType}>
        <ModalHeader>
          {messages[modalTitle]}
        </ModalHeader>

        <ModalBody>
          {messages[message]}
        </ModalBody>

        <ModalFooter>

          <Button className="mr-2" color="primary" onClick={() => this.props.toggle('Yes')}>
            {messages['global.btn.ok']}
          </Button>

          <Button color="secondary" onClick={() => this.props.toggle('No')}>
            {messages['global.btn.cancel']}
          </Button>


        </ModalFooter>
      </Modal>
    );
  }
}

export default injectIntl(ConfirmationDialog);
