import React, {Component} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import {FormattedMessage, IntlProvider} from 'react-intl';
import AppLocale from './lang/index';
import {connect} from "react-redux";
import {getLoginObject} from "./redux/auth/actions";

// import { renderRoutes } from 'react-router-config';

const loading = () =>
  <div className="animated fadeIn pt-3 text-center">
    <FormattedMessage id="global.label.loading..."/>
  </div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const InitialPath = ({component: Component, authUser, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props}/>
        : <Redirect
          to={{
            pathname: '/login',
            state: {from: props.location}
          }}
        />}
  />;

class App extends Component {

  // static async getIt() {
  //   if (localStorage.getItem('LoginObject')) {
  //     return localStorage.getItem('LoginObject');
  //   } else
  //     return null
  // }

  render() {

    // We Have to get it from redux ... as it is ...
    // const {location, match, user, locale} = this.props;
    const {locale} = this.props;
    // const { location, match, user, locale } = this.props;
    const currentAppLocale = AppLocale[locale];
    if (locale === 'fa') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }

    // const currentAppLocale = AppLocale['fa'];
    // if (location.pathname === '/' || location.pathname === '/app' || location.pathname === '/app/') {
    //   return (<Redirect to={defaultStartPath} />);
    // }

    // let user = App.getIt();

    if (!this.props.loginObj)
      this.props.getLoginObject();

    //
    //
    //
    // console.log("user >> ");
    // console.log(user);

    return (
      <HashRouter>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>

          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>}/>
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>}/>
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>}/>
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>}/>

              <InitialPath
                path={`/`}
                authUser={this.props.loginObj}
                // authUser={user}
                component={DefaultLayout}
              />

              {/*<Route path="/" name="Home" render={props => <DefaultLayout {...props}/>}/>*/}
            </Switch>
          </React.Suspense>
        </IntlProvider>

      </HashRouter>

    );
  }
}

const mapStateToProps = ({settings, authUser}) => {
  const {locale} = settings;
  const {loginObj} = authUser;
  return {locale, loginObj};
};

export default connect(mapStateToProps, {getLoginObject})(App);

