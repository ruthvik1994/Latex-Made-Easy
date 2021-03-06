'use strict';

describe('Directive: chapters', function () {

  // load the directive's module
  beforeEach(module('latexmadeeasyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<chapters></chapters>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
