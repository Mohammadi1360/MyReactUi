import React, {Component} from 'react';
import {Colxx} from "../../../components/CustomBootstrap";
import {FORM_INSERT} from '../../../utils/constants/commonTypes';
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
import {DatePicker} from "react-advance-jalaali-datepicker";
import moment from 'moment-jalaali';

class TaskDialog extends Component {
  formMode = FORM_INSERT;

  constructor(props) {
    console.log('constructor =>>');
    // const taskInfo = null;
    const taskInfo = JSON.parse(props.match.params.taskInfo);

    super(props);
    this.state = {
      fadeIn: true,
      timeout: 100,
      taskInfo: taskInfo
    };

    this.handleChange = this.handleChange.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount =>>');
    console.log(JSON.parse(this.props.match.params.taskInfo));

  }

  toggleFade = () => {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });

    this.props.history.goBack();
  };


  onClickCloseBtn = () => {
    this.toggleFade();
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let taskInfo = {...this.state.taskInfo};
    taskInfo[name] = value;
    this.setState({taskInfo});
  };

  changeDate(unix, formatted) {
    let taskInfo = this.state.taskInfo;
    taskInfo.endDate = formatted;
    this.setState({taskInfo});
  }

  static datePickerInput(props) {
    return <Input className="popo" {...props} />;
  }


  render() {
    console.log('render =>>');

    const {messages} = this.props.intl;

    if (this.state.taskInfo) {
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
                            <FormattedMessage id="task.TASK.TKIID"/>
                          </Label>
                        </Col>

                        <Col xs="12" sm="2">
                          <Input type="text" name="TASK.TKIID"
                                 value={this.state.taskInfo["TASK.TKIID"]}
                                 placeholder={messages["task.TASK.TKIID"]}/>
                        </Col>

                        <Col sm="2">
                          <Label htmlFor="title">
                            <FormattedMessage id="task.PROCESS_INSTANCE.PIID"/>
                          </Label>
                        </Col>
                        <Col xs="12" sm="6">

                          <Input type="text" name="PROCESS_INSTANCE.PIID"
                                 value={this.state.taskInfo["PROCESS_INSTANCE.PIID"]}
                                 requierd="true"
                                 onChange={this.handleChange} autoComplete="title"
                                 placeholder={messages["task.PROCESS_INSTANCE.PIID"]}/>

                        </Col>
                      </FormGroup>

                      <FormGroup row>

                        <Col sm="2">
                          <Label htmlFor="id">
                            <FormattedMessage id="task.PI_NAME"/>
                          </Label>
                        </Col>

                        <Col xs="12" sm="2">
                          <Input type="text" name="PI_NAME"
                                 value={this.state.taskInfo["PI_NAME"]}
                                 placeholder={messages["task.PI_NAME"]}/>
                        </Col>

                        <Col sm="2">
                          <Label htmlFor="title">
                            <FormattedMessage id="task.TAD_DISPLAY_NAME"/>
                          </Label>
                        </Col>
                        <Col xs="12" sm="6">

                          <Input type="text" name="TAD_DISPLAY_NAME"
                                 value={this.state.taskInfo["TAD_DISPLAY_NAME"]}
                                 requierd="true"
                                 onChange={this.handleChange} autoComplete="title"
                                 placeholder={messages["task.TAD_DISPLAY_NAME"]}/>

                        </Col>
                      </FormGroup>

                      <FormGroup row>

                        <Col sm="2">
                          <Label htmlFor="id">
                            <FormattedMessage id="task.ACTIVATED"/>
                          </Label>
                        </Col>

                        <Col xs="12" sm="2">

                          <DatePicker
                            inputComponent={TaskDialog.datePickerInput}
                            placeholder={messages["task.ACTIVATED"]}
                            format="jYYYY/jMM/jDD"
                            onChange={this.changeDate}
                            id="ACTIVATED"
                            preSelected={moment(this.state.taskInfo.ACTIVATED, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD')}/>
                        </Col>

                        <Col sm="2">
                          <Label htmlFor="title">
                            <FormattedMessage id="task.DUE"/>
                          </Label>
                        </Col>
                        <Col xs="12" sm="6">

                          <DatePicker
                            inputComponent={TaskDialog.datePickerInput}
                            placeholder={messages["task.DUE"]}
                            format="jYYYY/jMM/jDD"
                            onChange={this.changeDate}
                            id="DUE"
                            preSelected={moment(this.state.taskInfo.DUE, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD')}/>

                        </Col>
                      </FormGroup>
                    </Form>
                  </CardBody>

                  <CardFooter className="p-1 text-left">
                    <Button color="primary"
                            className="m-1"
                            onClick={this.toggleFade}>

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

export default injectIntl(TaskDialog);
