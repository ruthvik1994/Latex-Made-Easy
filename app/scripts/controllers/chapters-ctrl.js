'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:ChaptersCtrl
 * @description
 * # ChaptersCtrl
 * Controller of the latexmadeeasyApp
 */
let ChaptersController = function($scope, $element, $compile, $mdDialog) {
  this.sectionNumber = 0;
  this.tableNumber = 0;
  this.introductionNumber = 0;
  this.moduleNumber = 0;
  this.$element = $element;
  this.$compile = $compile;
  this.$scope = $scope;
  this.$mdDialog = $mdDialog;

  this.addSection = () => {
    let confirm = this.$mdDialog.prompt()
      .title('Section Name')
      .textContent('Please provide a section name')
      .placeholder('Section Name')
      .initialValue('New Section')
      .required(true)
      .ok('Add')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then((result) => {
      this.moduleNumber++;
      this.sectionNumber++;
      this.chapter.data.push({
        moduleId: this.moduleNumber,
        id: this.sectionNumber,
        name: result,
        type: 'section',
        text: '',
        deleted: false
      });

      let ele = this.$compile('<sections section="ctrl.chapter.data[' + (this.moduleNumber - 1) + ']"></sections>')(this.$scope);
      this.$element.append(ele);
    });
  };

  this.addTable = () => {
    this.moduleNumber++;
    this.tableNumber++;
    this.chapter.data.push({
      moduleId: this.moduleNumber,
      id: this.tableNumber,
      type: 'table',
      caption: 'New Table',
      deleted: false,
      grid: {
        enableColumnMenus: false,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        enableSorting: false,
        columnDefs: [],
        data: []
      },
    });

    let ele = this.$compile('<add-table table="ctrl.chapter.data[' + (this.moduleNumber - 1) + ']"></add-table>')(this.$scope);
    this.$element.append(ele);
  };

  this.addIntroduction = () => {
    this.introductionNumber++;
  };

  this.removeIntroduction = () => {
    let confirm = this.$mdDialog.confirm()
      .title('Removal Confirmation')
      .textContent('Are you sure you want to remove? The data will be lost.')
      .ok('Yes')
      .cancel('No');

    this.$mdDialog.show(confirm).then(() => {
      this.introductionNumber--;
      this.chapter.introduction = '';
    });
  };

  this.removeChapter = () => {
    let confirm = this.$mdDialog.confirm()
      .title('Removal Confirmation')
      .textContent('Are you sure you want to remove? The data will be lost.')
      .ok('Yes')
      .cancel('No');

    this.$mdDialog.show(confirm).then(() => {
      this.chapter.deleted = true;
      this.$element.remove();
      this.$scope.$destroy();
    });
  };
};

angular.module('latexmadeeasyApp').controller('ChaptersCtrl', ChaptersController);
