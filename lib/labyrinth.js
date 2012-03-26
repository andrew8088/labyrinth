(function() {
  var Labyrinth, root;

  Labyrinth = (function() {

    function Labyrinth(mazeData) {
      this.data = mazeData;
      this.rows = this.data.length;
      this.lineWidth = 4;
    }

    Labyrinth.prototype.render = function(id) {
      var canvas, width,
        _this = this;
      this.id = id;
      canvas = document.getElementById(id);
      width = canvas.width;
      this.cellWidth = (width - this.lineWidth * (this.rows + 1)) / this.rows;
      this.ctx = canvas.getContext("2d");
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.lineCap = "square";
      this.ctx.lineJoin = "square";
      this.ctx.stokeStyle = "black";
      this.ctx.beginPath();
      this.ctx.moveTo(this.lineWidth / 2, this.lineWidth / 2);
      this.data.forEach(function(row, rowNum) {
        var topp;
        topp = _this.lineWidth / 2 + rowNum * (_this.cellWidth + _this.lineWidth);
        return row.forEach(function(cell, colNum) {
          var left;
          left = _this.lineWidth / 2 + colNum * (_this.cellWidth + _this.lineWidth);
          _this.ctx.moveTo(left, topp);
          _this.ctx[cell.charAt(0) === "1" ? 'lineTo' : 'moveTo'](left + _this.cellWidth + _this.lineWidth, topp);
          _this.ctx[cell.charAt(1) === "1" ? 'lineTo' : 'moveTo'](left + _this.cellWidth + _this.lineWidth, topp + _this.cellWidth + _this.lineWidth);
          _this.ctx[cell.charAt(2) === "1" ? 'lineTo' : 'moveTo'](left, topp + _this.cellWidth + _this.lineWidth);
          return _this.ctx[cell.charAt(3) === "1" ? 'lineTo' : 'moveTo'](left, topp);
        });
      });
      this.ctx.closePath();
      this.ctx.stroke();
      this.row = 0;
      this.col = 0;
      return this.initTheseus();
    };

    Labyrinth.prototype.initTheseus = function() {
      var handleKeydown, offset, width,
        _this = this;
      offset = this.lineWidth * 2;
      width = this.cellWidth - offset;
      this.theseus = new Theseus(this.ctx, width, offset);
      handleKeydown = function(e) {
        var charAt, _ref;
        charAt = _this.data[_this.row][_this.col].charAt.bind(_this.data[_this.row][_this.col]);
        switch (e.keyCode) {
          case 37:
          case 72:
            if (charAt(3) !== '1') {
              _this.theseus.move('l');
              _this.col--;
              e.preventDefault();
            }
            break;
          case 38:
          case 75:
            if (charAt(0) !== '1') {
              _this.theseus.move('u');
              _this.row--;
            }
            break;
          case 39:
          case 76:
            if (charAt(1) !== '1') {
              _this.theseus.move('r');
              _this.col++;
            }
            break;
          case 40:
          case 74:
            if (charAt(2) !== '1') {
              _this.theseus.move('d');
              _this.row++;
            }
        }
        if ((_ref = e.keyCode) === 37 || _ref === 38 || _ref === 39 || _ref === 40 || _ref === 72 || _ref === 74 || _ref === 75 || _ref === 76) {
          return e.preventDefault();
        }
      };
      document.addEventListener('keydown', handleKeydown, false);
      return true;
    };

    return Labyrinth;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Labyrinth = Labyrinth;

}).call(this);
