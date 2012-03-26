(function() {
  var Cell, MazeGenerator,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  MazeGenerator = (function() {

    function MazeGenerator(size) {
      var i, _ref;
      this.size = size != null ? size : 5;
      Cell.max = this.size - 1;
      this.visitedCells = [];
      this.maze = [];
      for (i = 0, _ref = this.size; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        this.maze[i] = this.addRow(i);
      }
      Cell.maze = this.maze;
      this.setCurr(this.maze[this.rand()][this.rand()]);
    }

    MazeGenerator.prototype.addRow = function(r) {
      var arr, c, _ref, _results;
      arr = [];
      _results = [];
      for (c = 0, _ref = this.size; 0 <= _ref ? c < _ref : c > _ref; 0 <= _ref ? c++ : c--) {
        _results.push(arr[c] = new Cell(r, c));
      }
      return _results;
    };

    MazeGenerator.prototype.rand = function(max, min) {
      if (max == null) max = this.size - 1;
      if (min == null) min = 0;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    MazeGenerator.prototype.randDir = function() {
      return ['u', 'r', 'd', 'l'][this.rand(3)];
    };

    MazeGenerator.prototype.hasUnvisitedCells = function() {
      var cell, row, _i, _j, _len, _len2, _ref;
      _ref = this.maze;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
          cell = row[_j];
          if (!cell.visited) return true;
        }
      }
      return false;
    };

    MazeGenerator.prototype.numOfVisitedCells = function() {
      var cell, i, row, _i, _j, _len, _len2, _ref;
      i = 0;
      _ref = this.maze;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
          cell = row[_j];
          if (cell.visited) i++;
        }
      }
      return [i, this.size * this.size - i];
    };

    MazeGenerator.prototype.setCurr = function(cell) {
      cell.visited = true;
      cell.checkNeighbours();
      return this.curr = cell;
    };

    MazeGenerator.prototype.find = function(cell, dir) {
      switch (dir) {
        case 'u':
          return this.maze[cell.x - 1][cell.y];
        case 'r':
          return this.maze[cell.x][cell.y + 1];
        case 'd':
          return this.maze[cell.x + 1][cell.y];
        case 'l':
          return this.maze[cell.x][cell.y - 1];
      }
    };

    MazeGenerator.prototype.join = function(cell1, cell2) {
      if (cell1.x === cell2.x) {
        if (cell1.y - 1 === cell2.y) {
          cell1.open('l');
          return cell2.open('r');
        } else {
          cell1.open('r');
          return cell2.open('l');
        }
      } else {
        if (cell1.x - 1 === cell2.x) {
          cell1.open('u');
          return cell2.open('d');
        } else {
          cell1.open('d');
          return cell2.open('u');
        }
      }
    };

    MazeGenerator.prototype.randomNeighbourOf = function(cell) {
      var dir;
      dir = this.randDir();
      while (!cell.canVisit(dir)) {
        dir = this.randDir();
      }
      return this.find(cell, dir);
    };

    MazeGenerator.prototype.toString = function() {
      var cell, row, str, _i, _j, _len, _len2, _ref;
      str = "";
      _ref = this.maze;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
          cell = row[_j];
          str += "" + cell + " ";
        }
        str += "\n";
      }
      return str;
    };

    MazeGenerator.prototype.toMaze = function() {
      var arr, cell, i, maze, row, _i, _len, _len2, _ref;
      maze = [];
      _ref = this.maze;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        arr = [];
        for (i = 0, _len2 = row.length; i < _len2; i++) {
          cell = row[i];
          arr[i] = cell.walls;
        }
        maze.push(arr);
      }
      return maze;
    };

    return MazeGenerator;

  })();

  Cell = (function() {

    function Cell(x, y) {
      this.x = x;
      this.y = y;
      this.visited = false;
      this.newNeighbours = ['u', 'r', 'd', 'l'];
      this.walls = '1111';
      if (this.x === 0) this.visit('u');
      if (this.y === Cell.max) this.visit('r');
      if (this.x === Cell.max) this.visit('d');
      if (this.y === 0) this.visit('l');
    }

    Cell.prototype.canVisit = function(dir) {
      return __indexOf.call(this.newNeighbours, dir) >= 0;
    };

    Cell.prototype.hasUnvisitedNeighbours = function() {
      return this.newNeighbours.length > 0;
    };

    Cell.prototype.checkNeighbours = function() {
      var c, dir, _i, _len, _ref;
      console.log("Before " + (this.coords()) + " neighbour check: " + this.newNeighbours);
      _ref = this.newNeighbours;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dir = _ref[_i];
        switch (dir) {
          case 'u':
            c = Cell.maze[this.x - 1][this.y];
            break;
          case 'r':
            c = Cell.maze[this.x][this.y + 1];
            break;
          case 'd':
            c = Cell.maze[this.x + 1][this.y];
            break;
          case 'l':
            c = Cell.maze[this.x][this.y - 1];
        }
        if (c.visited) this.visit(dir);
      }
      return console.log("After " + (this.coords()) + " neighbour check: " + this.newNeighbours);
    };

    Cell.prototype.visit = function(dir) {
      var i;
      i = this.newNeighbours.indexOf(dir);
      return this.newNeighbours = this.newNeighbours.slice(0, i).concat(this.newNeighbours.slice(i + 1));
    };

    Cell.prototype.open = function(dir) {
      var i;
      this.visit(dir);
      i = Cell.dirMap[dir];
      return this.walls = this.walls.slice(0, i) + '0' + this.walls.slice(i + 1);
    };

    Cell.prototype.toString = function() {
      return this.walls;
    };

    Cell.prototype.coords = function() {
      return "(" + this.x + ", " + this.y + ")";
    };

    Cell.prototype.newNeighbours = function() {
      var k, str, _i, _len, _ref;
      str = "";
      _ref = this.newNeighbours;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        k = _ref[_i];
        str += "" + k + ", ";
      }
      return str;
    };

    return Cell;

  })();

  Cell.dirMap = {
    u: 0,
    r: 1,
    d: 2,
    l: 3
  };

  (typeof exports !== "undefined" && exports !== null ? exports : window).MazeGenerator = MazeGenerator;

}).call(this);
