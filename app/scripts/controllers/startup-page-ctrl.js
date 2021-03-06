'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:StartupPageCtrl
 * @description
 * # StartupPageCtrl
 * Controller of the latexmadeeasyApp
 */

let StartupPageController = function($mdDialog, $rootScope, $window, StartupPageFact, FileSaver, Blob) {
  this.fileSaver = FileSaver;
  this.blob = Blob;
  this.$rootScope = $rootScope;
  this.$mdDialog = $mdDialog;
  this.$window = $window;
  this.StartupPageFact = StartupPageFact;
  this.chapterNumber = 0;
  this.frontBlockData = {
    title: {
      title: '',
      author: '',
      college: '',
      degree: '',
      date: new Date(),
    },
    dedication: {
      dedication: ''
    },
    acknowledge: {
      acknowledge:''
    },
    abstract: {
      abstract: ''
    },
    chapters: {
      chapters: []
    }
  };
  this.pageNumber = 1;

  this.getLatex = (frontBlockData) => {
    let requestObject = _.cloneDeep(frontBlockData);
    requestObject.title.date = frontBlockData.title.date.toDateString().substring(4);
    requestObject.currentUser = this.$rootScope.currentUser;

    _.remove(requestObject.chapters.chapters, (data) => {
      return data.deleted;
    });

    _.each(requestObject.chapters.chapters, (chapter) => {
      _.remove(chapter.data, (data) => {
        return data.deleted;
      });

    //  TODO: REMOVE EMPTY ROWS AND COLUMNS FROM THE TABLE
    //  _.each(chapter.data, (module) => {
    //     if(module.type === 'table') {
    //       _.remove(module.grid.data, (row) => {
    //
    //       });
    //     }
    //   });
    });

    this.StartupPageFact.getLatex(requestObject).then((data) => {
      let blob = new this.blob([data.data]);
      let fileName = data.headers()["content-disposition"].split("\"")[1];
      this.fileSaver.saveAs(blob, fileName);
    }).catch((err) => {
      console.log(err.data);
    });
  };

  this.addChapter = () => {
    let confirm = this.$mdDialog.prompt()
      .title('Chapter Name')
      .textContent('Please provide a chapter name')
      .placeholder('Chapter Name')
      .initialValue('New Chapter')
      .required(true)
      .ok('Add')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then((result) => {
      this.chapterNumber++;
      this.frontBlockData.chapters.chapters.push({
        id: this.chapterNumber,
        name: result,
        introduction: '',
        deleted: false,
        data: [],
      });
    });
  };

  this.logOut = () => {
    this.$window.location.reload();
  };
};

angular.module('latexmadeeasyApp').controller('StartupPageCtrl', StartupPageController);
