import React, {Component} from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";

import {FormattedMessage} from "react-intl";
import moment from 'moment-jalaali';
import ReactTable from "react-table";
import DataTablePagination from "../../../components/DataTables/pagination";
import connect from "react-redux/es/connect/connect";

import {deleteQuestionGroup, getQuestionGroups,} from '../../../redux/policyMaking/questionGroup/actions';
import {getQuestionsByGroupId} from '../../../redux/policyMaking/question/actions';

// {QSTNTXT: "تست", questionId: 15002, userId: "TAS0001", isRelatedToOrganizationType: 2}


const surveyQuestionsColumns = [
  {
    Header: <FormattedMessage id="question.questionId"/>,
    accessor: "questionId",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: <FormattedMessage id="question.questionText"/>,
    accessor: "questionText",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: <FormattedMessage id="question.answerTypeTitle"/>,
    accessor: "answerTypeTitle",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: <FormattedMessage id="question.isRelatedToOrganizationType"/>,
    accessor: "isRelatedToOrganizationType",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: <FormattedMessage id="question.minValue"/>,
    accessor: "minValue",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: <FormattedMessage id="question.maxValue"/>,
    accessor: "maxValue",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: <FormattedMessage id="question.timex"/>,
    show: false,
    accessor: "timex",
    Cell: props => <p className="text-muted">{props.value}</p>
  }
];


class SurveyQuestions extends Component {

  renderEditable(cellInfo) {
    return (
      <div
        style={{backgroundColor: "#fafafa"}}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({data});
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  questionListColumns = [
    {
      Header: state => (
        <div className="text-center">
          <input
            type="checkbox"
            onChange={() => this.handleSelectAll(state.sortedData)}
            checked={this.state.selectAll}/>
        </div>
      ),
      Cell: row => (
        <div className="text-center">
          <input
            type="checkbox"
            defaultChecked={this.state.questionChecked[row.index]}
            checked={this.state.questionChecked[row.index]}
            onChange={() => this.handleSingleCheckboxChange(row.index)}/>
        </div>
      ),
      width: 50,
      sortable: false,
      filterable: false
    },

    {
      Header: <FormattedMessage id="global.label.row"/>,
      id: "row",
      width: 50,
      sortable: false,
      filterable: false,
      Cell: (row) => {
        return <div className="text-center">{row.index + 1}</div>;
      }
    },
    {
      Header: <FormattedMessage id="question.questionId"/>,
      accessor: "questionId",
      Cell: props => <p className="list-item-heading">{props.value}</p>
    },
    {
      Header: <FormattedMessage id="question.questionText"/>,
      accessor: "QSTNTXT",
      width: 250,
      Cell: props => <p className="text-muted">{props.value}</p>
    },
    {
      Header: <FormattedMessage id="question.isRelatedToOrganizationType"/>,
      accessor: "isRelatedToOrganizationType",
      Cell: props => <p className="text-muted">{props.value}</p>
    },
    {
      Header: <FormattedMessage id="question.minValue"/>,
      accessor: "minValue",
      Cell: this.renderEditable
    },
    {
      Header: <FormattedMessage id="question.maxValue"/>,
      accessor: "maxValue",
      Cell: props => <p className="text-muted">{props.value}</p>
    }
  ];

  constructor(props) {
    console.log('constructor =>>');
    super(props);
    this.onAddQuestion = this.onAddQuestion.bind(this);

    this.state = {
      questionListModal: false,
      selected: -1,
      selectedQuestionGroup: -1,
      selectedQuestion: -1,
      selectedQuestionItem: -1,
      selectAll: false,
      questionChecked: [],
      selectedQuestionItems: [],
      data: this.props.questions
    };
  }

  handleSelectAll = () => {
    console.log("hi");
    let selectAll = !this.state.selectAll;
    this.setState({selectAll: selectAll});
    let checkedCopy = [];

    this.props.questions.forEach(function (e, index) {
      checkedCopy.push(selectAll);
    });

    this.setState({
      questionChecked: checkedCopy,
      // selectedQuestionItems: this.props.questions
    });
  };

  handleSingleCheckboxChange = (index) => {
    console.log(index);

    let checkedCopy = this.state.questionChecked;
    checkedCopy[index] = !this.state.questionChecked[index];
    if (checkedCopy[index] === false) {
      this.setState({selectAll: false});
    }

    this.setState({
      questionChecked: checkedCopy
    });

    console.log("checkedCopy >> ...");
    console.log(checkedCopy);

  };


  componentDidMount() {
    this.props.getQuestionGroups();
  }

  toggleQuestionListModal = () => {
    this.setState({
      questionListModal: !this.state.questionListModal,
    });
  };

  onAddQuestion() {
    let selectedQuestionItems = [];
    const {questions} = this.props;

    console.log("this.props");
    console.log(this.props);

    this.state.questionChecked.forEach(function (e, index) {
      console.log(e);

      if (e) {
        selectedQuestionItems.push(questions[index]);
      }
    });

    console.log("selectedQuestionItems >> ...");
    console.log(selectedQuestionItems);
  };

  onRowClick = (e, t, rowInfo) => {
    console.log("rowInfo.row");
    console.log(rowInfo.row);
    this.setState({
      selected: rowInfo.index,
      selectedItem: rowInfo.row
    });
  };

  onQuestionRowClick = (e, t, rowInfo) => {
    console.log("rowInfo.row");
    console.log(rowInfo.row);
    this.setState({
      selectedQuestion: rowInfo.index,
      selectedQuestionItem: rowInfo.row
    });
  };

  changeQuestionGroup = (event) => {
    const questionGroupId = +event.target.value;
    const surveyId = +this.props.surveyId;
    this.props.getQuestionsByGroupId(surveyId, questionGroupId);

    this.setState({
      selectedQuestionGroup: questionGroupId,
      data: this.props.questions
    });
  };

  render() {
    console.log('render =>>');

    return (

      <Card className="m-1">
        <CardBody>
          <Row className="pt-1">
            <Col xs="12">
              {this.props.surveyQuestions ?
                <ReactTable
                  className="-highlight -striped"
                  data={this.props.surveyQuestions}
                  columns={surveyQuestionsColumns}
                  defaultPageSize={5}
                  filterable={false}
                  noDataText={<FormattedMessage id="component.table.noRowsFound"/>}
                  showPageJump={true}
                  PaginationComponent={DataTablePagination}
                  showPageSizeOptions={true}

                  getTrProps={(state, rowInfo, column) => {
                    if (rowInfo && rowInfo.row) {
                      return {
                        onClick: (e, t) => {
                          this.onRowClick(e, t, rowInfo)
                        },
                        style: {
                          background: rowInfo.index === this.state.selected ? '#c8ced3' : '',
                          color: rowInfo.index === this.state.selected ? 'white' : 'black'
                        }
                      }
                    } else {
                      return {}
                    }
                  }}/>
                :
                <div className="animated fadeIn pt-1 text-center">
                  <FormattedMessage id="global.label.loading..."/>
                </div>

              }
            </Col>
          </Row>
        </CardBody>

        <CardFooter>
          <Row>
            <Col xs="12" sm="4">
            </Col>

            <Col xs="12" sm="2">
              <Button color="info" className="btn-block  m-1"
                      onClick={this.toggleQuestionListModal}>
                <FormattedMessage id="question.btn.addQuestion"/>
              </Button>
            </Col>

            <Col xs="12" sm="2">
              <Button color="info" className="btn-block  m-1"
                      onClick={this.onClickCloseBtn}>
                <FormattedMessage id="question.btn.deleteQuestion"/>
              </Button>
            </Col>

            <Col xs="12" sm="2">
              <Button color="info" className="btn-block  m-1"
                      onClick={this.onClickCloseBtn}>
                <FormattedMessage id="question.btn.indicate"/>
              </Button>
            </Col>

            <Col xs="12" sm="2">
              <Button color="info" className="btn-block  pl-8"
                      onClick={this.props.toggleFade}>
                <FormattedMessage id="question.btn.return"/>
              </Button>
            </Col>
          </Row>
        </CardFooter>

        <Modal isOpen={this.state.questionListModal}
               toggle={this.toggleQuestionListModal}
               className={'modal-lg'}>

          <ModalHeader toggle={this.toggleQuestionListModal}>
            <FormattedMessage id="question.btn.addQuestion"/>
          </ModalHeader>

          <ModalBody>

            <FormGroup row>
              <Col md="2">
                <Label htmlFor="selectQuestionGroup">
                  <FormattedMessage id="questionGroup.form.title"/>
                </Label>
              </Col>
              <Col xs="12" md="10">
                <Input type="select"
                       onChange={this.changeQuestionGroup}
                       value={this.state.selectedQuestionGroup}
                       name="selectQuestionGroup"
                       id="selectQuestionGroup">
                  {
                    this.props.questionGroups ?
                      this.props.questionGroups.map((questionGroup) =>
                        <option key={questionGroup.id}
                                value={questionGroup.id}>

                          {questionGroup.title}

                        </option>)
                      : ''
                  }
                </Input>
              </Col>
            </FormGroup>


            <FormGroup row>
              <Col xs="12">
                <ReactTable
                  className="-highlight -striped"
                  data={this.state.data}
                  columns={this.questionListColumns}
                  defaultPageSize={5}
                  filterable={false}
                  noDataText={<FormattedMessage id="component.table.noRowsFound"/>}
                  showPageJump={true}
                  PaginationComponent={DataTablePagination}
                  showPageSizeOptions={true}

                  getTrProps={(state, rowInfo, column) => {
                    if (rowInfo && rowInfo.row) {
                      return {
                        onClick: (e, t) => {
                          this.onQuestionRowClick(e, t, rowInfo)
                        },
                        style: {
                          background: rowInfo.index === this.state.selectedQuestion ? '#c8ced3' : '',
                          color: rowInfo.index === this.state.selectedQuestion ? 'white' : 'black'
                        }
                      }
                    } else {
                      return {}
                    }
                  }}/>
              </Col>
            </FormGroup>


          </ModalBody>
          <ModalFooter>
            <Button color="primary m-1" onClick={this.onAddQuestion}>
              <FormattedMessage id="global.btn.add"/>
            </Button>

            <Button color="secondary m-1" onClick={this.toggleQuestionListModal}>
              <FormattedMessage id="global.btn.return"/>
            </Button>
          </ModalFooter>
        </Modal>


      </Card>
    );

  }
}

const mapDispatchToProps = {getQuestionGroups, getQuestionsByGroupId, deleteQuestionGroup};

const mapStateToProps = (state) => {
  return {
    questionGroups: state.questionGroup.questionGroups,
    surveyQuestions: state.question.surveyQuestions,
    questions: state.question.questions,
    errorCode: state.questionGroup.errorCode,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyQuestions);

