import React, {Component} from 'react';
import {Colxx} from "../../../components/CustomBootstrap";
import "react-table/react-table.css";
// import "../../../scss/table/table.scss";
import {connect} from 'react-redux';
import {Button, Card, CardBody, CardFooter, CardHeader, Fade, Row} from "reactstrap";
import {FormattedMessage} from "react-intl";
import {getSurveys} from '../../../redux/policyMaking/survey/actions';
import NumberFormat from 'react-number-format';
import moment from 'moment-jalaali';
import AlertDialog from "../../Pages/Dialogs/AlertDialog";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const dataTableColumns = [{
  dataField: 'id',
  text: <FormattedMessage id="survey.id"/>,
  headerStyle: (colum, colIndex) => {
    return {width: '100px'};
  }
}, {
  dataField: 'title',
  text: <FormattedMessage id="survey.title"/>,
  headerStyle: (colum, colIndex) => {
    return {width: '300px'};
  }
}, {
  dataField: 'dueDay',
  text: <FormattedMessage id="survey.dueDay"/>,
  headerStyle: (colum, colIndex) => {
    return {width: '80px'};
  }
}, {
  dataField: 'firstSendDate',
  text: <FormattedMessage id="survey.firstSendDate"/>,
  formatter: dateFormatter
}, {
  dataField: 'endDate',
  text: <FormattedMessage id="survey.endDate"/>,
  formatter: dateFormatter
}, {
  dataField: 'answeredCount',
  text: <FormattedMessage id="survey.answeredCount"/>,
}, {
  dataField: 'notAnsweredCount',
  text: <FormattedMessage id="survey.notAnsweredCount"/>,
}];

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  style: {backgroundColor: '#c8e6c9'}
};

const sizePerPageOptionRenderer = ({text, page, onSizePerPageChange}) => (
  <li
    key={text}
    role="presentation"
    className="dropdown-item">
    <a
      href="#"
      tabIndex="-1"
      role="menuitem"
      data-page={page}
      onMouseDown={(e) => {
        e.preventDefault();
        onSizePerPageChange(page);
      }}
      style={{color: 'red'}}>
      {text}
    </a>
  </li>
);

const options = {
  sizePerPageOptionRenderer
};

function dateFormatter(cell, row) {
  return (
    <span>
      {moment(cell, 'jYYYYjMMjDD').isValid() ?
        <NumberFormat format="####/##/##" displayType={'text'} value={cell}/> : ''}
    </span>
  );
}

const defaultSurvey = {
  id: "",
  title: ""
};


class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeIn: true,
      timeout: 100,
      modal: false,
      isDialogOpen: false,
      alertModal: false,
      selected: -1,
      items: [],
      selectedItem: defaultSurvey
    };
  }

  toggleAlertModal = () => {
    this.setState({
      alertModal: !this.state.alertModal
    });
  };

  toggleFade = () => {
    this.setState((prevState) => {
      return {fadeIn: !prevState}
    });
    this.props.history.push('/dashboard');
  };

  componentDidMount() {
    this.props.getSurveys();
  }

  onClickNewBtn = () => {
    this.props.history.push('/policyMaking/SurveyDialog/0');
  };

  onClickEditBtn = () => {
    if (this.state.selected !== -1) {
      this.props.history.push('/policyMaking/SurveyDialog/' + this.state.selectedItem.id);
    } else {
      this.setState({
        message: 'global.message.noRecordIsSelected',
        modalTitle: 'global.btn.edit',
        modalType: 'modal-warning',
        alertModal: !this.state.alertModal
      });
    }
  };

  // onRowClick = (e, t, rowInfo) => {
  //   console.log("rowInfo.row");
  //   console.log(rowInfo.row);
  //   this.setState({
  //     selected: rowInfo.index,
  //     selectedItem: rowInfo.row
  //   });
  //
  // };


  rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log("rowInfo.row");
      console.log(row);
      this.setState({
        selected: rowIndex,
        selectedItem: row
      });
    }
  };

  render() {

    if (this.props.surveys) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Colxx xxs="12">
              <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                <Card className="mb-4">
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
                    {!this.props.surveys ?
                      <div className="animated fadeIn pt-1 text-center">
                        <FormattedMessage id="global.label.loading..."/>
                      </div>
                      :
                      <BootstrapTable
                        rowEvents={this.rowEvents}
                        keyField='id'
                        data={this.props.surveys}
                        columns={dataTableColumns}
                        selectRow={selectRow}
                        striped
                        hover
                        condensed
                        pagination={paginationFactory(options)}/>

                    }

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
                            onClick={this.onClickEditBtn}>
                      <FormattedMessage id="global.btn.delete"/>
                    </Button>

                  </CardFooter>
                </Card>
              </Fade>

            </Colxx>

          </Row>

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
        </div>
      );
    }

  }
}

const mapStateToProps = (state) => {
  return {
    surveys: state.survey.surveys,
    errorCode: state.survey.errorCode,
  };
};

const mapDispatchToProps = {getSurveys};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);

