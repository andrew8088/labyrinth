(function() {
  var Maze;

  Maze = (function() {

    function Maze(size) {
      this.size = size != null ? size : 5;
      this.id = "" + +(new Date);
      this.cells = this.generateCells();
      this.visitedStack = [];
      this.curr = this.cells[0][0];
      this.visitedStack.push(this.curr);
      this.curr.visited = true;
    }

    Maze.prototype.generateCells = function() {
      var arr, i, j, _ref, _ref2;
      arr = [];
      for (i = 0, _ref = this.size; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        arr[i] = [];
        for (j = 0, _ref2 = this.size; 0 <= _ref2 ? j < _ref2 : j > _ref2; 0 <= _ref2 ? j++ : j--) {
          arr[i][j] = new Cell(i, j, this);
        }
      }
      return arr;
    };

    Maze.prototype.getCell = function(x, y) {
      if ((0 <= x && x < this.size) && (0 <= y && y < this.size)) {
        return this.cells[x][y];
      } else {
        return null;
      }
    };

    Maze.prototype.hasUnvisitedCells = function() {
      var cell, row, _i, _j, _len, _len2, _ref;
      _ref = this.cells;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
          cell = row[_j];
          if (!cell.visited) return true;
        }
      }
      return false;
    };

    Maze.prototype.moveTo = function(cell) {
      this.visitedStack.push(cell);
      this.curr.join(cell);
      this.curr = cell;
      return this.curr.visited = true;
    };

    Maze.prototype.revertCurrent = function() {
      if (this.visitedStack.length !== 0) {
        return this.curr = this.visitedStack.pop();
      }
    };

    Maze.prototype.render = function() {
      var cell, i, j, row, _len, _len2, _ref;
      while (true) {
        if (!this.hasUnvisitedCells()) break;
        if (this.curr.hasUnvisitedNeighbours()) {
          this.moveTo(this.curr.randomUnvisitedNeighbour());
        } else {
          this.revertCurrent();
        }
      }
      this.output = [];
      _ref = this.cells;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        row = _ref[i];
        this.output[i] = [];
        for (j = 0, _len2 = row.length; j < _len2; j++) {
          cell = row[j];
          this.output[i][j] = cell.walls;
        }
      }
      return this.output;
    };

    return Maze;

  })();

  (typeof global !== "undefined" && global !== null ? global : window).Maze = Maze;

}).call(this);
