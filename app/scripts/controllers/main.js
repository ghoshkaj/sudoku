'use strict';

/**
 * @ngdoc function
 * @name sudokuApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sudokuApp
 */
angular.module('sudokuApp')
  .controller('MainCtrl', function ($scope) {

    $scope.newGrid =
      //http://www.sudokuessentials.com/easy_sudoku.html
      [[' ','6',' ','3',' ',' ','8',' ','4'],
       ['5','3','7',' ','9',' ',' ',' ',' '],
       [' ','4',' ',' ',' ','6','3',' ','7'],
       [' ','9',' ',' ','5','1','2','3','8'],
       [' ',' ',' ',' ',' ',' ',' ',' ',' '],
       ['7','1','3','6','2',' ',' ','4',' '],
       ['3',' ','6','4',' ',' ',' ','1',' '],
       [' ',' ',' ',' ','6',' ','5','2','3'],
       ['1',' ','2',' ',' ','9',' ','8',' ']];

    $scope.initiateEmptyGrid = function() {
      //console.log(["button was clicked"]);
      for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
          $scope.grid[i][j] = ' ';
        }
      }
    };

    var inRow = function(grid, row, num){
      console.log(["isRow entered"]);
      for(var i = 0; i < 9; i++){
        if(grid[row][i]==num) return true;
      }
      return false;
    };

    var inColumn = function(grid, col, num) {
      console.log(["inColumn entered"]);
      for(var i = 0; i < 9; i++){
        if(grid[i][col]==num) return true;
      }
      return false;
    };

    var inBlock = function(grid, row, col, num) {
      console.log(["inBlock entered"]);
      var boxStartRow = row - row%3;
      var boxStartCol = col - col%3;

      for (var row = 0; row < 3; row++) {
        for (var col = 0;col < 3; col++) {
          if (grid[row + boxStartRow][col + boxStartCol] == num)
            return true;
        }
      }
      return false;

    };

    var findUnassignedCell = function(grid, row, col){
      //find row, col of unassigned cell
      for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
          if (grid[row][col] == ' ')
            return true;
        }
      }
      return false;
    };

    var isSafe = function(grid, row, col, num) {
      console.log(["isSafe entered"]);
        return (!inRow(grid,row,num)) && (!inColumn(grid,col,num)) && (!inBlock(grid,row,col,num))
    };

    var printGrid = function(grid){
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          console.log([grid[i][j]]);
        }
        console.log(['\n']);
      }
    };

    //this solver is written using the algorithm described in geeksforgeeks:
    //http://www.geeksforgeeks.org/backtracking-set-7-suduku/
    var solve = function(grid){
      //console.log([grid]);
      var row, col;
      console.log(["inner solve function entered"]);

      for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
          if (grid[row][col] == ' ') {
            //for digits from 1 to 9
            for (var num = 1; num < 10; num++) {
              if (isSafe(grid, row, col, num)) {
                grid[row][col] = num;
                //console.log([grid])
                if (solve(grid)) return true;
                grid[row][col] = ' ';
              }
            }
          }
        }
      }
      return false;
    };



    $scope.solvePuzzle = function(){
      console.log(["button was clicked"]);
      var grid = $scope.newGrid;
      solve(grid);
      console.log([grid])
      $scope.newGrid = grid;
    };


  });
