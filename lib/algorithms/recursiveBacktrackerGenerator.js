(function() {
  var RecursiveBacktrackerGenerator,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  RecursiveBacktrackerGenerator = (function(_super) {

    __extends(RecursiveBacktrackerGenerator, _super);

    function RecursiveBacktrackerGenerator() {
      var nextCell;
      RecursiveBacktrackerGenerator.__super__.constructor.apply(this, arguments);
      while (true) {
        if (!this.hasUnvisitedCells()) break;
        if (this.curr.hasUnvisitedNeighbours()) {
          console.log("current cell: " + (this.curr.coords()));
          nextCell = this.randomNeighbourOf(this.curr);
          this.join(this.curr, nextCell);
          this.visitedCells.push(this.curr);
          this.setCurr(nextCell);
        } else {
          this.curr = this.visitedCells.pop();
        }
      }
    }

    return RecursiveBacktrackerGenerator;

  })(MazeGenerator);

  (typeof exports !== "undefined" && exports !== null ? exports : window).RecursiveBacktrackerGenerator = RecursiveBacktrackerGenerator;

}).call(this);
