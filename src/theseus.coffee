class Theseus
    constructor: (@ctx, width, @offset) ->
        @x = @y = @offset
        @h = @w = width
        
        @ctx.fillStyle = "red"
        @ctx.fillRect @x, @y, @h, @w
    move: (dir) ->
        @ctx.clearRect @x - 1, @y - 1, @w + 2, @h + 2
        switch dir
            when "u" then @y -= @h + @offset * 1.5
            when "d" then @y += @h + @offset * 1.5
            when "l" then @x -= @w + @offset * 1.5
            when "r" then @x += @w + @offset * 1.5

        @ctx.fillRect @x, @y, @w, @h

root = exports ? window
root.Theseus = Theseus
