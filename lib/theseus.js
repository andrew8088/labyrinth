(function() {
  var Theseus, root;

  Theseus = (function() {

    function Theseus(ctx, width, offset) {
      this.ctx = ctx;
      this.offset = offset;
      this.x = this.y = this.offset;
      this.h = this.w = width;
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.x, this.y, this.h, this.w);
    }

    Theseus.prototype.move = function(dir) {
      this.ctx.clearRect(this.x - 1, this.y - 1, this.w + 2, this.h + 2);
      switch (dir) {
        case "u":
          this.y -= this.h + this.offset * 1.5;
          break;
        case "d":
          this.y += this.h + this.offset * 1.5;
          break;
        case "l":
          this.x -= this.w + this.offset * 1.5;
          break;
        case "r":
          this.x += this.w + this.offset * 1.5;
      }
      return this.ctx.fillRect(this.x, this.y, this.w, this.h);
    };

    return Theseus;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.Theseus = Theseus;

}).call(this);
