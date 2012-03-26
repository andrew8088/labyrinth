(function() {
  var Cell;

  Cell = (function() {

    function Cell(x, y, maze) {
      this.x = x;
      this.y = y;
      if (!((this.x != null) && (this.y != null))) {
        throw new Error("An x and y coordinate must be supplied");
      }
      if (maze == null) throw new Error("Must be part of a maze");
      if (Cell[maze.id] == null) Cell[maze.id] = maze;
      this.maze = maze.id;
      this.visited = false;
      this.walls = '1111';
    }

    Cell.prototype.neighbour = function(dir) {
      var arr, c, n, _i, _len, _ref;
      if (dir) {
        switch (dir) {
          case 'u':
            return c = Cell[this.maze].getCell(this.x - 1, this.y);
          case 'r':
            return c = Cell[this.maze].getCell(this.x, this.y + 1);
          case 'd':
            return c = Cell[this.maze].getCell(this.x + 1, this.y);
          case 'l':
            return c = Cell[this.maze].getCell(this.x, this.y - 1);
        }
      } else {
        arr = [];
        _ref = ['u', 'r', 'd', 'l'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          dir = _ref[_i];
          n = this.neighbour(dir);
          if (n != null) arr.push(n);
        }
        return arr;
      }
    };

    Cell.prototype.neighbours = function(dir) {
      return this.neighbour(dir);
    };

    Cell.prototype.hasUnvisitedNeighbours = function(ret) {
      var arr, cell, _i, _len, _ref;
      arr = [];
      _ref = this.neighbours();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        if (!cell.visited) arr.push(cell);
      }
      if (ret) {
        return arr;
      } else {
        return !!arr.length;
      }
    };

    Cell.prototype.randomUnvisitedNeighbour = function() {
      var arr;
      arr = this.hasUnvisitedNeighbours(true);
      return arr[UTIL.rand(arr.length - 1)];
    };

    Cell.prototype.direction = function(cell) {
      if (this.x === cell.x + 1 && this.y === cell.y) {
        return ['u', 0];
      } else if (this.x === cell.x - 1 && this.y === cell.y) {
        return ['d', 2];
      } else if (this.y === cell.y + 1 && this.x === cell.x) {
        return ['l', 3];
      } else if (this.y === cell.y - 1 && this.x === cell.x) {
        return ['r', 1];
      } else {
        return null;
      }
    };

    Cell.prototype.join = function(cell) {
      var dir, offset;
      dir = this.direction(cell);
      if (dir) {
        offset = dir[0] === 'd' || dir[0] === 'l' ? -2 : 2;
        this.walls = this.walls.slice(0, dir[1]) + '0' + this.walls.slice(dir[1] + 1);
        this.visited = true;
        cell.walls = cell.walls.slice(0, (dir[1] + offset)) + '0' + cell.walls.slice(dir[1] + offset + 1);
        return cell.visited = true;
      } else {
        return false;
      }
    };

    Cell.prototype.coords = function() {
      return "(" + this.x + ", " + this.y + ")";
    };

    return Cell;

  })();

  (typeof global !== "undefined" && global !== null ? global : window).Cell = Cell;

}).call(this);
