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

    $scope.grid =
      //http://www.sudokuessentials.com/easy_sudoku.html
      [[' ',6,' ',3,' ',' ',8,' ',4],
       [5,3,7,' ',9,' ',' ',' ',' '],
       [' ',4,' ',' ',' ',6,3,' ',7],
       [' ',9,' ',' ',5,1,2,3,8],
       [' ',' ',' ',' ',' ',' ',' ',' ',' '],
       [7,1,3,6,2,' ',' ',4,' '],
       [3,' ',6,4,' ',' ',' ',1,' '],
       [' ',' ',' ',' ',6,' ',5,2,3],
       [1,' ',2,' ',' ',9,' ',8,' ']];

    //$scope.initiateEmptyGrid = function() {
    //  //console.log(["button was clicked"]);
    //  for (var i = 0; i < 9; i++){
    //    for (var j = 0; j < 9; j++){
    //      $scope.grid[i][j] = ' ';
    //    }
    //  }
    //};

    $scope.rowContains = function(row, num){
      for(var col = 0; col < $scope.grid[row].length; col++){
        if($scope.grid[row][col] == num) return true;
      }
      return false;
    };

    $scope.columnContains = function(col, num) {
      for(var row = 0; row < 9; row++){
        if($scope.grid[row][col] == num) return true;
      }
      return false;
    };

    $scope.blockContains = function(row, col, num) {
      var boxStartRow = row - row%3;
      var boxStartCol = col - col%3;

      for (var row = 0; row < 3; row++) {
        for (var col = 0;col < 3; col++) {
          if ($scope.grid[row + boxStartRow][col + boxStartCol] == num)
            return true;
        }
      }
      return false;

    };

    //var findUnassignedCell = function(grid, row, col){
    //  //find row, col of unassigned cell
    //  for (row = 0; row < 9; row++) {
    //    for (col = 0; col < 9; col++) {
    //      if (grid[row][col] == ' ')
    //        return true;
    //    }
    //  }
    //  return false;
    //};

    //var isSafe = function(grid, row, col, num) {
    //  console.log(["isSafe entered"]);
    //    return (!rowContains(grid,row,num)) && (!columnContains(grid,col,num)) && (!blockContains(grid,row,col,num))
    //};

    var printGrid = function(grid){
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          console.log([grid[i][j]]);
        }
        console.log(['\n']);
      }
    };

    //var solve = function(grid, row, col){
    //
    //  if(row == grid.length){
    //    row = 0;
    //    if(++col == grid[row].length){
    //      return true; // matrix is filled with no conflicts
    //    }
    //  }
    //
    //  // skip non empty cells
    //  if(grid[row][col] != ' '){
    //    return solve(grid, row + 1, col);
    //  }
    //
    //  for(var val = 1; val <= 9; val++){
    //    if( !rowContains(grid, row, val) &&
    //        !columnContains(grid, col, val)&&
    //        !blockContains(grid, row, col, val)){
    //          if(solve(grid, row + 1, col)) return true;
    //    }
    //  }
    //
    //  grid[row][col] = ' ';
    //  return false;
    //};

    $scope.solve = function(row, col){


      //console.log($scope.grid);

      if(row == $scope.grid.length){
        row = 0;
        if(++col == $scope.grid[row].length){
          return true; // matrix is filled with no conflicts
        }
      }

      // skip non empty cells
      if($scope.grid[row][col] != ' '){
        return $scope.solve(row + 1, col);
      }

      for(var val = 1; val <= 9; val++){
        if( !$scope.rowContains(row, val) &&
          !$scope.columnContains(col, val)&&
          !$scope.blockContains(row, col, val)){
          $scope.grid[row][col] = val;
          if($scope.solve(row + 1, col)) return true;
        }
      }

      $scope.grid[row][col] = ' ';
      return false;
    };



    $scope.solvePuzzle = function(){
      //console.log(["button was clicked"]);
      //var grid = $scope.newGrid;
      $scope.solve(0, 0);
      //$scope.newGrid = grid;
    };


  });
