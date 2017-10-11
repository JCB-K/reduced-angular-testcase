import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import angular from 'angular';
import MapRouterToAngular from './AngularComponent';

const ngApp = angular
  .module('ngApp', [])
  // example controller
  .controller('ngController', [
    '$scope',
    '$timeout',
    function($scope, $timeout) {
      $scope.value = 1;
      $scope.updateValue = () => {
        $timeout(() => {
          $scope.value = $scope.value + 1;
          $scope.$apply();
        });
      };
    },
  ])
  // disable angular's url tampering
  .config([
    '$provide',
    function($provide) {
      $provide.decorator('$browser', [
        '$delegate',
        function($delegate) {
          $delegate.onUrlChange = function() {};
          $delegate.url = function() {
            return '';
          };
          return $delegate;
        },
      ]);
    },
  ]);

class App extends Component {
  render() {
    return (
      <div className="app" ref={c => (this.container = c)}>
        <div>
          <Router history={createBrowserHistory()}>
            <div className="react">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/page2">Page with Angular controller</Link>
                </li>
              </ul>
              <p>Content rendered by React is red, Angular is blue</p>
              <p>
                Current page:{' '}
                <Switch>
                  <Route path="/page2" component={() => <span>Page2</span>} />
                  <Route component={() => <span>Home</span>} />
                </Switch>
              </p>
              <MapRouterToAngular ngApp={ngApp} />
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
