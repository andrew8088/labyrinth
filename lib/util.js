(function() {
  var UTIL;

  UTIL = {
    rand: function(max, min) {
      if (max == null) max = 10;
      if (min == null) min = 0;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  (typeof global !== "undefined" && global !== null ? global : window).UTIL = UTIL;

}).call(this);
