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
  Label, Modal, ModalBody, ModalFooter, ModalHeader,
  Row
} from "reactstrap";

import {FormattedMessage, injectIntl} from "react-intl";
import {addSurvey, getSurvey, updateSurvey} from "../../../redux/policyMaking/survey/actions";
import {getSurveyQuestions} from "../../../redux/policyMaking/question/actions";
import connect from "react-redux/es/connect/connect";
import {DatePicker} from "react-advance-jalaali-datepicker";
import SurveyQuestions from "./SurveyQuestions";

const defaultItem = {
  id: 0,
  title: "",
  dueDay: 0,
  isTemplate: 2,
  firstSendDate: "",
  endDate: "",
  userId: "31"
};

class SurveyDialog extends Component {
  formMode = FORM_INSERT;

  constructor(props) {
    console.log('constructor =>>');

    super(props);
    this.state = {
      fadeIn: true,
      timeout: 100,
      day: true,
      item: defaultItem
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeDate = this.changeDate.bind(this);
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
      this.props.getSurvey(this.props.match.params.id);
      this.props.getSurveyQuestions(this.props.match.params.id);
    } else {
      this.setState({
        item: defaultItem
      });
    }
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate =>>');
    console.log(this.state.item);
    console.log(this.props.survey);

    if (this.formMode === FORM_EDIT && this.state.item.id !== this.props.survey.id) {
      console.log('FORM_EDIT STATE =>>');

      this.setState({
        item: this.props.survey,
        day: (this.props.survey.dueDay && this.props.survey.dueDay > 0)
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
    console.log("handleSubmit =>> 1");
    console.log({survey: item});

    this.state.day ? item.endDate = null : item.dueDay = null;

    if (this.formMode === FORM_INSERT) {
      this.props.addSurvey(item);
    } else {
      this.props.updateSurvey(item);
    }

    console.log("handleSubmit = >> 2");
  }

  onDueChanged = (e) => {
    console.log("e.target");
    console.log(e.target);
    // this.setState({
    //   day: e.target.value
    // });
  };

  changeDate(unix, formatted) {
    let item = this.state.item;
    item.endDate = formatted;
    this.setState({item});
  }

  static datePickerInput(props) {
    return <Input className="popo" {...props} />;
  }

  onRowClick = (e, t, rowInfo) => {
    console.log("rowInfo.row");
    console.log(rowInfo.row);
    this.setState({
      selected: rowInfo.index,
      selectedItem: rowInfo.row
    });


  };

  render() {
    console.log('render =>>');

    const {messages} = this.props.intl;

    if (this.state.item) {
      return (
        <div className="formDialog">
          <Row>
            <Colxx xxs="12">
              <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                <Card>
                  <CardHeader>
                    <i className="fa fa-window-maximize"/>
                    <FormattedMessage id="survey.table.header"/>

                    <div className="card-header-actions">
                      <a className="card-header-action btn btn-close" onClick={this.toggleFade}>
                        <i className="fa fa-close"/>
                      </a>
                    </div>

                  </CardHeader>
                  <CardBody>
                    <Form className="form-horizontal">
                      <FormGroup row>

                        <Col sm="2">
                          <Label htmlFor="id">
                            <FormattedMessage id="survey.id"/>
                          </Label>
                        </Col>

                        <Col xs="12" sm="2">
                          <Input type="text" name="id" id="id"
                                 value={this.state.item.id}
                                 disabled
                                 placeholder={messages["survey.id"]}/>
                        </Col>

                        <Col sm="2">
                          <Label htmlFor="title">
                            <FormattedMessage id="survey.title"/>
                          </Label>
                        </Col>
                        <Col xs="12" sm="6">

                          <Input type="text" name="title" id="title"
                                 value={this.state.item.title}
                                 requierd="true"
                                 onChange={this.handleChange} autoComplete="title"
                                 placeholder={messages["survey.title"]}/>

                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col sm="2">
                          <Label>
                            <FormattedMessage id="survey.dueDateOrDay"/>
                          </Label>
                        </Col>
                        <Col sm="2">
                          <FormGroup check inline>
                            <Input className="form-check-input"
                                   type="radio"
                                   id="day"
                                   name="day"
                                   defaultChecked={this.state.day}
                                   onChange={(e) => this.setState({day: true})}/>

                            <Label className="form-check-label" check htmlFor="day">
                              <FormattedMessage id="survey.day"/>
                            </Label>
                          </FormGroup>
                          <FormGroup check inline>
                            <Input className="form-check-input"
                                   type="radio"
                                   id="date"
                                   name="date"
                                   defaultChecked={!this.state.day}
                                   onChange={(e) => this.setState({day: false})}/>

                            <Label className="form-check-label" check htmlFor="date">
                              <FormattedMessage id="survey.date"/>
                            </Label>
                          </FormGroup>
                        </Col>

                        {this.state.day
                          ?
                          <>
                            <Col sm="2">
                              <Label htmlFor="dueDay">
                                <FormattedMessage id="survey.dueDay"/>
                              </Label>
                            </Col>
                            < Col xs="12" sm="2">

                              <Input type="text" name="dueDay" id="dueDay"
                                     value={this.state.item.dueDay}
                                     requierd="true"
                                     onChange={this.handleChange} autoComplete="dueDay"
                                     placeholder={messages["survey.dueDay"]}/>

                            </Col>
                          </>
                          :
                          <>
                            <Col sm="2">
                              <Label htmlFor="endDate">
                                <FormattedMessage id="survey.endDate"/>
                              </Label>
                            </Col>
                            <Col xs="12" sm="2">

                              <DatePicker
                                inputComponent={SurveyDialog.datePickerInput}
                                placeholder={messages["survey.endDate"]}
                                format="jYYYY/jMM/jDD"
                                onChange={this.changeDate}
                                id="endDate"
                                preSelected={this.props.survey.endDate}/>
                            </Col>
                          </>
                        }

                        <Col xs="12" sm="2">
                        </Col>

                        <Col xs="12" sm="2">
                          <Button color="primary"
                                  className="btn-block  m-1"
                                  onClick={this.handleSubmit}>

                            <FormattedMessage id="global.btn.save"/>
                          </Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </CardBody>

                  <CardFooter>
                    {this.props.surveyQuestions &&
                    <SurveyQuestions toggleFade={this.toggleFade}
                                     surveyId={this.props.survey.id}/>
                    }
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
  console.log("state=>");
  console.log(state);
  return {
    survey: state.survey.survey,
    errorCode: state.survey.errorCode,
    surveyQuestions: state.question.surveyQuestions,
  };
};

const mapDispatchToProps = {getSurvey, addSurvey, updateSurvey, getSurveyQuestions};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SurveyDialog));
