import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {injectIntl, FormattedMessage} from 'react-intl';
import {login} from "../../../redux/actions";
import "./login.css";

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText, Progress,
  Row
} from 'reactstrap';

const defaultLogin = {
  username: "",
  password: ""
};

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: defaultLogin
    };
  }

  onUserLogin = (e) => {
    e.preventDefault();
    console.log("onUserLogin => 1");

    if (this.state.login.username !== "" && this.state.login.password !== "") {
      console.log("onUserLogin => 2");
      this.props.login(this.state.login.username, this.state.login.password);

      console.log("this.props.user = >>");
      console.log(this.props.user);
    }
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let login = {...this.state.login};
    login[name] = value;
    // console.log(login);
    this.setState({login});
  };

  componentDidUpdate() {
    console.log("componentDidUpdate >>");
    console.log("this.props.loginObj");
    console.log(this.props.loginObj);
    if (this.props.loginObj) {
      const {history} = this.props;
      if (this.props.loginObj.userLoggedIn) {
        console.log("set Storage >>");
        Login.storeIt(this.props.loginObj).then(() => {
          console.log("push / >>");
          history.push('/');
        });
      } else {

      }

    }
  }

  static async storeIt(loginObj) {
    console.log("storeIt >>");
    localStorage.setItem('LoginObject', JSON.stringify(loginObj));
  }

  render() {
    const {messages} = this.props.intl;

    return (
      <div className="app flex-row align-items-center bg-gray-300">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className={this.props.errorCode === 0 ? 'pt-4' : ''}>
                  <CardBody>
                    <Form>
                      {this.props.errorCode === 100 ?
                        <Row>
                          <Col className="text-right">
                            <Alert color="danger">
                              <FormattedMessage id="user.message.errorLogin"/>
                            </Alert>
                          </Col>
                        </Row>
                        : this.props.errorCode === 3000 ?
                          <Row>
                            <Col className="text-right">
                              <Alert color="danger">
                                <FormattedMessage id="user.message.closeBrowser"/>
                              </Alert>
                            </Col>
                          </Row>
                          : ''
                      }

                      <h1>
                        <FormattedMessage id="user.login-title"/>
                      </h1>
                      <p className="text-muted">
                        <FormattedMessage id="user.login-header"/>
                      </p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"/>
                          </InputGroupText>
                        </InputGroupAddon>

                        <Input type="text"
                               className="text-left"
                               name="username"
                               value={this.state.login.username}
                               disabled={this.props.isLoading}
                               requierd="true"
                               onChange={this.handleChange}
                               placeholder={messages["user.username"]}
                               autoComplete="username"/>

                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                               className="text-left"
                               name="password"
                               value={this.state.login.password}
                               requierd="true"
                               disabled={this.props.isLoading}
                               onChange={this.handleChange}
                               placeholder={messages["user.password"]}
                               autoComplete="current-password"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" disabled={this.props.isLoading}
                                  className="mx-6"
                                  onClick={(event) => this.onUserLogin(event)}>

                            {this.props.isLoading ?
                              <FormattedMessage id="global.label.loading..."/>
                              :
                              <FormattedMessage id="user.login-button"/>
                            }

                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            <FormattedMessage id="user.forgot-password-question"/>
                          </Button>
                        </Col>
                      </Row>
                      {this.props.isLoading ?
                        <Row>
                          <Col className="text-right">
                            <Progress animated color="success" value="100" className="mb-1"/>
                          </Col>
                        </Row>
                        : ''
                      }
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-orange py-5 d-md-down-none" style={{width: '44%'}}>
                  <CardBody className="text-center">
                    <div>
                      <h2>
                        <FormattedMessage id="user.register-title"/>
                      </h2>

                      <p>
                        <FormattedMessage id="user.register-new-user-desc"/>
                      </p>

                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>
                          <FormattedMessage id="user.register-button"/>
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({authUser}) => {
  const {loginObj, isLoading, errorCode} = authUser;
  return {loginObj, isLoading, errorCode};
};

export default injectIntl(connect(
  mapStateToProps, {login}
)(Login));


