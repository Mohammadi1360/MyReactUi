import React, {Component} from 'react';
import {Colxx} from "../../../components/CustomBootstrap";
import "react-table/react-table.css";
import "../../../scss/table/table.scss";
import {connect} from 'react-redux';
import {Button, Card, CardBody, CardFooter, CardHeader, Fade, Row} from "reactstrap";
import ReactTable from "react-table";
import DataTablePagination from "../../../components/DataTables/pagination";
import ConfirmationDialog from "../../Pages/Dialogs/ConfirmationDialog";
import {FormattedMessage} from "react-intl";
import {getQuestionGroups, deleteQuestionGroup} from '../../../redux/policyMaking/questionGroup/actions';
import AlertDialog from "../../Pages/Dialogs/AlertDialog";

const dataTableColumns = [
  {
    Header: <FormattedMessage id="questionGroup.id"/>,
    accessor: "id",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: <FormattedMessage id="questionGroup.title"/>,
    accessor: "title",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: <FormattedMessage id="questionGroup.userId"/>,
    show: false,
    accessor: "userId",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: <FormattedMessage id="questionGroup.questionCount"/>,
    accessor: "questionCount",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: <FormattedMessage id="questionGroup.timex"/>,
    show: false,
    accessor: "timex",
    Cell: props => <p className="text-muted">{props.value}</p>
  }
];

const defaultQuestionGroup = {
  id: "",
  title: ""
};


class QuestionGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeIn: true,
      timeout: 100,
      confirmationDeleteModal: false,
      alertModal: false,
      message: '',
      modalTitle: '',
      modalType: '',
      isDialogOpen: false,
      selected: -1,
      items: [],
      selectedItem: defaultQuestionGroup
    };
  }

  toggleFade = () => {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });
    this.props.history.push('/dashboard');
  };

  componentDidMount() {
    this.props.getQuestionGroups();
  }

  onClickNewBtn = () => {
    this.props.history.push('/policyMaking/QuestionGroupDialog/0');
  };

  onClickEditBtn = () => {
    if (this.state.selected !== -1) {
      this.props.history.push('/policyMaking/QuestionGroupDialog/' + this.state.selectedItem.id);
    } else {
      this.setState({
        message: 'global.message.noRecordIsSelected',
        modalTitle: 'global.btn.edit',
        modalType: 'modal-warning',
        alertModal: !this.state.alertModal
      });
    }
  };

  onClickDeleteBtn = () => {
    if (this.state.selected !== -1) {
      this.setState({
        message: 'global.message.areYouSureToDelete',
        modalTitle: 'global.btn.delete',
        modalType: 'modal-warning',
        confirmationDeleteModal: !this.state.confirmationDeleteModal
      });
    } else {
      this.setState({
        message: 'global.message.noRecordIsSelected',
        modalTitle: 'global.btn.delete',
        modalType: 'modal-warning',
        alertModal: !this.state.alertModal
      });
    }
  };

  toggleDeleteModal = (answer) => {
    console.log(answer);
    if (answer === 'Yes') {
      this.props.deleteQuestionGroup(this.state.selectedItem);
      // this.props.getQuestionGroups();
    }

    this.setState({
      confirmationDeleteModal: !this.state.confirmationDeleteModal
    });
  };

  toggleAlertModal = () => {
    this.setState({
      alertModal: !this.state.alertModal
    });
  };

  onRowClick = (e, t, rowInfo) => {
    console.log("rowInfo.row");
    console.log(rowInfo.row);
    this.setState({
      selected: rowInfo.index,
      selectedItem: rowInfo.row
    });

  };

  render() {
    if (this.props.questionGroups) {
      return (
        <div className="animated fadeIn">
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
                    <ReactTable
                      className="-highlight -striped"
                      data={this.props.questionGroups}
                      columns={dataTableColumns}
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
                      }}

                    />

                  </CardBody>
                  <CardFooter>
                    <Button color="primary" onClick={this.onClickNewBtn}>
                      <FormattedMessage id="global.btn.new"/>
                    </Button>

                    <Button color="warning" className="m-1"
                            onClick={this.onClickEditBtn}>
                      <FormattedMessage id="global.btn.edit"/>
                    </Button>

                    <Button color="danger" className="m-1"
                            onClick={this.onClickDeleteBtn}>
                      <FormattedMessage id="global.btn.delete"/>
                    </Button>

                  </CardFooter>
                </Card>
              </Fade>

            </Colxx>

          </Row>

          <ConfirmationDialog isOpen={this.state.confirmationDeleteModal}
                              message={this.state.message}
                              modalType={this.state.modalType}
                              modalTitle={this.state.modalTitle}
                              toggle={this.toggleDeleteModal}/>

          <AlertDialog isOpen={this.state.alertModal}
                       message={this.state.message}
                       modalType={this.state.modalType}
                       modalTitle={this.state.modalTitle}
                       toggle={this.toggleAlertModal}/>


        </div>

      );
    } else {
      return (
        <div className="animated fadeIn pt-3 text-center">
          <FormattedMessage id="global.label.loading..."/>
        </div>);
    }

  }
}

const mapStateToProps = (state) => {
  return {
    questionGroups: state.questionGroup.questionGroups,
    errorCode: state.questionGroup.errorCode,
  };
};

const mapDispatchToProps = {getQuestionGroups, deleteQuestionGroup};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionGroup);

