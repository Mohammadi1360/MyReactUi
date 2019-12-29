import React, {Component, Suspense} from 'react';
import * as router from 'react-router-dom';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container, FormGroup, Input} from 'reactstrap';
import {FormattedMessage, injectIntl} from 'react-intl';

import {
  AppAside,
  AppBreadcrumb2 as AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  constructor(props) {
    super(props);
    const loginObj = localStorage.getItem('LoginObject');

    this.state = {
      loginObj: JSON.parse(loginObj),
    };

  }

  loading = () =>
    <div className="animated fadeIn pt-1 text-center">
      <FormattedMessage id="global.label.loading..."/>
    </div>

  signOut(e) {
    e.preventDefault();
    this.props.history.push('/login')
  }

  render() {
    const {messages} = this.props.intl;

    console.log("DefaultLayout >> ");
    console.log(this.props.loginObj);

    return (
      <div className="app">

        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">

          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm>
              <FormGroup className="m-1 p-1">
                <Input type="search" name="search"
                       id="search" placeholder={messages["home.search"]}/>
              </FormGroup>
            </AppSidebarForm>
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
          </AppSidebar>

          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>

            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )}/>
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard"/>
                </Switch>
              </Suspense>
            </Container>
          </main>

          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside {...this.props} loginObj={this.state.loginObj}/>
            </Suspense>
          </AppAside>
        </div>

        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter/>
          </Suspense>
        </AppFooter>

      </div>
    );
  }
}

export default injectIntl(DefaultLayout);
