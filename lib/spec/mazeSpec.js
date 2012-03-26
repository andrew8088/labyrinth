(function() {

  describe('Maze', function() {
    var maze;
    maze = null;
    it('should be an object', function() {
      maze = new Maze;
      return expect(typeof maze).toEqual('object');
    });
    it('should have a size', function() {
      return expect(maze.size).toEqual(5);
    });
    it('should have a string id', function() {
      return (expect(typeof maze.id)).toEqual('string');
    });
    it('should have a cells array', function() {
      var row, _i, _len, _ref, _results;
      expect(maze.cells.length).toEqual(5);
      _ref = maze.cells;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push(expect(row.length).toEqual(5));
      }
      return _results;
    });
    it('should have all the cells', function() {
      var cell, row, _i, _len, _ref, _results;
      _ref = maze.cells;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push((function() {
          var _j, _len2, _results2;
          _results2 = [];
          for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
            cell = row[_j];
            _results2.push(expect(cell.walls.length).toEqual(4));
          }
          return _results2;
        })());
      }
      return _results;
    });
    it('should return a cell based on coordinates', function() {
      expect(maze.getCell(0, 0)).toEqual(maze.cells[0][0]);
      return expect(maze.getCell(3, 2)).toEqual(maze.cells[3][2]);
    });
    it('should have know if it has unvisited cells', function() {
      return expect(maze.hasUnvisitedCells()).toBeTruthy();
    });
    it('should have a current cell', function() {
      expect(maze.curr instanceof Cell).toBeTruthy();
      return expect(maze.curr.visited).toBeTruthy();
    });
    it('should have a visited stack, with the current cell as the first item', function() {
      expect(maze.visitedStack.length).toBeTruthy();
      return expect(maze.visitedStack[0]).toEqual(maze.curr);
    });
    it('should join cells and update the current cell', function() {
      var cell1, cell2;
      cell1 = maze.curr;
      cell2 = maze.cells[0][1];
      maze.moveTo(cell2);
      expect(maze.curr).toEqual(cell2);
      expect(cell1.walls).toEqual('1011');
      return expect(cell2.walls).toEqual('1110');
    });
    it('should reverse successfully', function() {
      maze.revertCurrent();
      expect(maze.curr).toEqual(maze.cells[0][1]);
      maze.cells[1][1].visited = true;
      maze.cells[0][2].visited = true;
      maze.revertCurrent();
      expect(maze.curr).toEqual(maze.cells[0][0]);
      maze.cells[1][1].visited = false;
      return maze.cells[0][2].visited = false;
    });
    it('should render the maze successfully', function() {
      var cell1, cell2, cell3, cell4, map, openAt, row, _i, _len, _ref, _results;
      map = {
        u: 0,
        r: 1,
        b: 2,
        l: 3
      };
      openAt = function(cell, dir) {
        return cell.walls.charAt(map[dir]) === '0';
      };
      maze = new Maze(5);
      maze.render();
      _ref = maze.cells;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push((function() {
          var _j, _len2, _results2;
          _results2 = [];
          for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
            cell1 = row[_j];
            cell2 = cell1.neighbour('r');
            cell3 = cell1.neighbour('d');
            cell4 = maze.getCell(cell1.x + 2, cell1.y + 1);
            if (openAt(cell1, 'r')) {
              if (openAt(cell1, 'b')) {
                if (openAt(cell2, 'b')) {
                  _results2.push(expect(openAt(cell3, 'r')).toBeFalsy());
                } else {
                  _results2.push(void 0);
                }
              } else {
                _results2.push(void 0);
              }
            } else {
              _results2.push(void 0);
            }
          }
          return _results2;
        })());
      }
      return _results;
    });
    return it('should have appropriate output', function() {
      var cell, output, row, _i, _len, _results;
      maze = new Maze(5);
      output = maze.render();
      expect(output.length).toEqual(5);
      _results = [];
      for (_i = 0, _len = output.length; _i < _len; _i++) {
        row = output[_i];
        expect(row.length).toEqual(5);
        _results.push((function() {
          var _j, _len2, _results2;
          _results2 = [];
          for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
            cell = row[_j];
            _results2.push(expect(cell.length).toEqual(4));
          }
          return _results2;
        })());
      }
      return _results;
    });
  });

}).call(this);
