import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import angular from 'angular';

angular.module('ngApp', []).controller('ngController', [
  '$scope',
  function($scope) {
    $scope.value = 'World';
  },
]);

const angularTemplate = `<div ng-controller="ngController">Hello {{ value }}! If you see <code ng-non-bindable>{{ value }}</code> here, try a hard reload.</div>`;

const angularComponent = () => <div dangerouslySetInnerHTML={{ __html: angularTemplate }} />;
const homeComponent = () =>
  <div>
    <h1>Rendering Angular inside React</h1>
    <p>
      I'm trying to render legacy Angular controllers inside a React app. The issue is that when we browse to it through react-router, the
      template won't be evaluated. However, after doing a hard reload it works as expected. Can I hook into Angular template compilation, so
      I can trigger it on external events? (e.g.: react-router)
    </p>
    <p>
      Check out the code on <a href="/_src">/_src</a>, everything interesting is in <code>src/App.js></code>
    </p>
  </div>;

class App extends Component {
  render() {
    return (
      <div className="app" ref={c => (this.container = c)}>
        <div>
          <Router history={createBrowserHistory()}>
            <div>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/angular">Page with Angular controller</Link>
                </li>
              </ul>
              <Switch>
                <Route path="/angular" component={angularComponent} />
                <Route component={homeComponent} />
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
  componentDidMount() {
    angular.bootstrap(this.container, ['ngApp']);
  }
}

export default App;
