import React, {Component} from 'react';
import {
  Button,
  ButtonGroup,
  DropdownItem,
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownToggle,
  Nav,
  UncontrolledDropdown
} from 'reactstrap';

import PropTypes from 'prop-types';

import {AppAsideToggler, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/logo.png'
import sygnet from '../../assets/img/logo-symbol.png'
import {FormattedMessage, injectIntl} from "react-intl";
import connect from "react-redux/es/connect/connect";
import {logOut} from "../../redux/actions";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTheme: localStorage.getItem('selectedTheme'),
      selectedLanguage: localStorage.getItem('selectedLanguage')
    };
  }

  doExit = (e) => {
    e.preventDefault();
    this.props.logOut();
    localStorage.removeItem('LoginObject');
    window.location.assign('#/login');
    // this.props.history.push('/login');
  };

  render() {
    // eslint-disable-next-line
    const {children, ...attributes} = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          full={{src: logo, width: 95, height: 30, alt: 'Bank Mellat Logo'}}
          minimized={{src: sygnet, width: 30, height: 30, alt: 'Bank Mellat Logo'}}/>

        <AppSidebarToggler className="d-md-down-none" display="lg"/>

        <Nav className="ml-auto" navbar>
        </Nav>

        <Nav className="mr-2" navbar>

          <NavItem>
            <NavLink className="btn btn-outline-dark pb-1"
                     onClick={e => this.doExit(e)}
                     style={{cursor: 'pointer'}}
                     active={true}>

              <FormattedMessage id="header.exit"/>
            </NavLink>
          </NavItem>
        </Nav>

        <AppAsideToggler className="d-md-down-none"/>
        <AppAsideToggler className="d-lg-none" mobile/>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default connect(null, {logOut})(DefaultHeader);
