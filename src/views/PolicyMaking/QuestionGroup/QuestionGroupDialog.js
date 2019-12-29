import React, {Component} from 'react';
import {Colxx} from "../../../components/CustomBootstrap";
import {FORM_EDIT, FORM_INSERT} from '../../../utils/constants/commonTypes';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Fade,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";

import {FormattedMessage, injectIntl} from "react-intl";
import {
  addQuestionGroup,
  getQuestionGroup,
  updateQuestionGroup
} from "../../../redux/policyMaking/questionGroup/actions";

import connect from "react-redux/es/connect/connect";

const defaultItem = {
  id: 0,
  title: "",
  userId: "333"
};

class QuestionGroupDialog extends Component {
  formMode = FORM_INSERT;

  constructor(props) {
    console.log('constructor =>>');
    super(props);
    this.state = {
      fadeIn: true,
      timeout: 100,
      item: defaultItem
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleFade = () => {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });

    this.props.history.goBack();
  };

  componentDidMount() {
    console.log('componentDidMount =>>');

    this.formMode = (this.props.match.params.id !== '0' ? FORM_EDIT : FORM_INSERT);
    if (this.formMode === FORM_EDIT) {
      this.props.getQuestionGroup(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate =>>');
    console.log('this.state.item.id');
    console.log(this.state.item.id);
    console.log("this.props.questionGroup.id");
    console.log(this.props.questionGroup.id);

    if (this.state.item.id !== this.props.questionGroup.id) {
      this.setState({
        item: this.props.questionGroup
      });
    }
  }


  onClickCloseBtn = () => {
    this.toggleFade();
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  };

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    if (this.formMode === FORM_EDIT) {
      this.props.updateQuestionGroup(item);
      // this.props.getQuestionGroup(item.id);
    } else {
      this.props.addQuestionGroup(item);
    }

    console.log('handleSubmit =>>');
    console.log(this.formMode);
    console.log(this.props.result);
  }

  render() {
    console.log('render =>>');

    const {messages} = this.props.intl;

    if (this.state.item) {
      return (
        <div className="formDialog">
          <Row>
            <Colxx xxs="12">
              <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                <Card className="mb-4">
                  <CardHeader>
                    <i className="fa fa-window-maximize"/>
                    <FormattedMessage id="questionGroup.table.header"/>

                    <div className="card-header-actions">
                      <a className="card-header-action btn btn-close" onClick={this.toggleFade}>
                        <i className="fa fa-close"/>
                      </a>
                    </div>

                  </CardHeader>
                  <CardBody>
                    <Form className="form-horizontal">
                      <FormGroup row>
                        <Col md="2">
                          <Label htmlFor="text-input">
                            <FormattedMessage id="questionGroup.title"/>
                          </Label>
                        </Col>
                        <Col xs="12" md="10">

                          <Input type="text" name="title" id="title"
                                 value={this.state.item.title}
                                 requierd="true"
                                 onChange={this.handleChange} autoComplete="title"
                                 placeholder={messages["questionGroup.title"]}/>

                        </Col>
                      </FormGroup>
                    </Form>

                  </CardBody>
                  <CardFooter className="p-1">

                    <Button color="primary"
                            className="m-1"
                            onClick={this.handleSubmit}>

                      <FormattedMessage id="global.btn.save"/>
                    </Button>
                    <Button color="info" className="m-1"
                            onClick={this.onClickCloseBtn}>
                      <FormattedMessage id="global.btn.close"/>
                    </Button>
                  </CardFooter>
                </Card>
              </Fade>

            </Colxx>

          </Row>
        </div>
      );
    } else {
      return (
        <div className="animated fadeIn pt-3 text-center">
          <FormattedMessage id="global.label.loading..."/>
        </div>
      );
    }

  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    questionGroup: state.questionGroup.questionGroup,
    errorCode: state.questionGroup.errorCode,
  };
};

const mapDispatchToProps = {getQuestionGroup, addQuestionGroup, updateQuestionGroup};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(QuestionGroupDialog));
