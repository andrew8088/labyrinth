# Utility Functions

UTIL =
    rand: (max = 10, min = 0) -> Math.floor(Math.random() * (max - min + 1)) + min


(global ? window).UTIL = UTIL
