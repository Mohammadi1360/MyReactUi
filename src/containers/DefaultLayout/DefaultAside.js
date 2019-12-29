import React, {Component} from 'react';
import {
  Badge,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  ButtonGroup,
  Button,
  TabPane, Row, Col, Card, CardHeader, CardBody
} from 'reactstrap';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppSwitch} from '@coreui/react'
import {FormattedMessage, injectIntl} from "react-intl";
import connect from "react-redux/es/connect/connect";
import {taskList} from "../../redux/policyMaking/bpmn/task/actions";
import moment from 'moment-jalaali';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      selectedTheme: localStorage.getItem('selectedTheme'),
      selectedLanguage: localStorage.getItem('selectedLanguage')
    };
    this.props.taskList('', '', this.props.loginObj);
  }

  toggle = (tab) => {
    if (tab === '1') {
      console.log("this.state");
      console.log(this.state);
      this.props.taskList('', '', this.props.loginObj);
    }


    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  onClickItem = (task) => {
    this.props.history.push('/policyMaking/task/' + JSON.stringify(task));
    console.log(task);
  };

  changeTheme = (e, theme) => {
    e.preventDefault();
    localStorage.setItem('selectedTheme', theme);
    this.setState({
      selectedTheme: theme
    });

    setTimeout(() => {
      window.location.reload();
    }, 500)
  };

  changeLanguage = (e, lng) => {
    e.preventDefault();
    localStorage.setItem('selectedLanguage', lng);
    this.setState({
      selectedLanguage: lng
    });

    setTimeout(() => {
      window.location.reload();
    }, 500)
  };

  isActiveThemeButton = (value) => {
    return 'btn btn-info ' + ((value === this.state.selectedTheme) ? 'active' : '');
  };

  isActiveLanguageButton = (value) => {
    return 'btn btn-warning ' + ((value === this.state.selectedLanguage) ? 'active' : '');
  };

  render() {
    const {children, ...attributes} = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({active: this.state.activeTab === '1'})}
                     onClick={() => {
                       this.toggle('1');
                     }}>
              <Badge className="float-right" color={'gray'} pill>{this.props.tasks.length}</Badge>
              <i className="icon-list"/>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({active: this.state.activeTab === '2'})}
                     onClick={() => {
                       this.toggle('2');
                     }}>
              <i className="icon-speech"/>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classNames({active: this.state.activeTab === '3'})}
                     onClick={() => {
                       this.toggle('3');
                     }}>
              <i className="icon-settings"/>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ListGroup className="list-group-accent" tag={'div'}>
              <ListGroupItem
                className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase large">
                <FormattedMessage id="task.tasks-to-be-done"/>
                <Badge className="float-right" color={'success'} pill>{this.props.tasks.length}</Badge>
              </ListGroupItem>

              {this.props.tasks.map((task, i) => {
                return (
                  <ListGroupItem key={i} action tag="a"
                                 onClick={() => this.onClickItem(task)}
                                 className={i % 2 === 0 ? 'list-group-item-accent-info list-group-item-divider'
                                   : 'list-group-item-accent-warning list-group-item-divider'}>

                    {/*className="list-group-item-accent-warning list-group-item-divider"*/}
                    <div className="avatar float-right">
                      <img className="img-avatar"
                           src="assets/img/avatars/8.jpg"
                           alt="mohammadi_mo@behsazan.net"/>
                    </div>

                    <div>
                      <strong>
                        <FormattedMessage id="process.processNo"/> {':'}
                      </strong>
                      {task["PROCESS_INSTANCE.PIID"]}
                      <br/>

                      <strong>
                        <FormattedMessage id="task.taskNo"/> {':'}
                      </strong>
                      {task["TASK.TKIID"]}
                      <br/>

                      <strong>
                        {task.PI_NAME}
                        {':'}
                      </strong>
                      {(task.TAD_DISPLAY_NAME).substring(5)}

                    </div>

                    <small className="text-muted pt-2 float-right">
                      <i className="icon-calendar"/>&nbsp;
                      {moment(task.DUE, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')}
                    </small>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </TabPane>

          {/*Tab Messages*/}

          <TabPane tabId="2" className="p-3">
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                  <span className="avatar-status badge-success"/>
                </div>
              </div>
              <div>
                <small className="text-muted">Lukasz Holeczek</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt...
              </small>
            </div>
            <hr/>

          </TabPane>

          {/*Tab Settings*/}

          <TabPane tabId="3" className="p-2">
            <Row>
              <Col>
                <Card className="card-accent-primary bg-gray-100">
                  <CardBody>
                    <FormattedMessage id="side.theme"/>
                    <br/>
                    <ButtonGroup size="sm">
                      <Button className={this.isActiveThemeButton('theme1')}
                              onClick={e => this.changeTheme(e, 'theme1')}>
                        <FormattedMessage id="side.theme1"/>
                      </Button>
                      <Button className={this.isActiveThemeButton('theme2')}
                              onClick={e => this.changeTheme(e, 'theme2')}>
                        <FormattedMessage id="side.theme2"/>
                      </Button>
                      <Button className={this.isActiveThemeButton('theme3')}
                              onClick={e => this.changeTheme(e, 'theme3')}>
                        <FormattedMessage id="side.theme3"/>
                      </Button>
                    </ButtonGroup>

                    <hr/>

                    <FormattedMessage id="side.language"/>
                    <br/>
                    <ButtonGroup size="sm">
                      <Button className={this.isActiveLanguageButton('en')}
                              onClick={e => this.changeLanguage(e, 'en')}>
                        <FormattedMessage id="side.language.en"/>
                      </Button>
                      <Button className={this.isActiveLanguageButton('fa')}
                              onClick={e => this.changeLanguage(e, 'fa')}>
                        <FormattedMessage id="side.language.fa"/>
                      </Button>
                    </ButtonGroup>


                  </CardBody>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

const mapStateToProps = ({userTasks}) => {
  const {tasks, errorCode, isLoading} = userTasks;
  return {tasks, errorCode, isLoading};
};

export default injectIntl(connect(
  mapStateToProps, {taskList}
)(DefaultAside));



