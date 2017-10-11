import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const PATH_TO_TEMPLATE_MAPPING = {
  '/': 'page1.html',
  '/page2': 'page2.html',
};

class AngularComponent extends Component {
  constructor(props) {
    let updateTemplateUrl;
    props.ngApp.controller('wrappingController', [
      '$scope',
      '$timeout',
      function($scope, $timeout) {
        updateTemplateUrl = path => {
          const templateUrl = PATH_TO_TEMPLATE_MAPPING[path];
          $timeout(() => {
            $scope.template = templateUrl;
            $scope.$apply();
          });
        };
      },
    ]);
    super(props);
    this.unlisten = this.props.history.listen((location, action) => {
      updateTemplateUrl(location.pathname);
    });
    setTimeout(() => {
      updateTemplateUrl(props.location.pathname);
    }, 0);
  }

  render() {
    return (
      <div ref={c => (this.container = c)} ng-controller="wrappingController">
        <div ng-include="template" />
      </div>
    );
  }
  componentWillUnmount() {
    this.unlisten();
  }
}

export default withRouter(AngularComponent);
