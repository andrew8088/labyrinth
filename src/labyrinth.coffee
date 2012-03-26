class Labyrinth
    constructor: (mazeData) ->
        @data = mazeData
        @rows = @data.length
        @lineWidth = 4
    render: (@id) ->
        canvas = document.getElementById id
        width  = canvas.width
        @cellWidth = ((width - @lineWidth * (@rows + 1)) / @rows)
        @ctx = canvas.getContext "2d"
        
        @ctx.lineWidth = @lineWidth
        @ctx.lineCap = "square"
        @ctx.lineJoin = "square"
        @ctx.stokeStyle = "black"
        @ctx.beginPath()
        @ctx.moveTo @lineWidth / 2, @lineWidth / 2

        @data.forEach (row, rowNum) =>
            topp = @lineWidth / 2 + rowNum * (@cellWidth + @lineWidth)
            row.forEach (cell, colNum) =>
                left = @lineWidth / 2 + colNum * (@cellWidth + @lineWidth)
                @ctx.moveTo left, topp
                @ctx[ if cell.charAt(0) is "1" then 'lineTo' else 'moveTo' ] left + @cellWidth + @lineWidth, topp
                @ctx[ if cell.charAt(1) is "1" then 'lineTo' else 'moveTo' ] left + @cellWidth + @lineWidth, topp + @cellWidth + @lineWidth
                @ctx[ if cell.charAt(2) is "1" then 'lineTo' else 'moveTo' ] left, topp + @cellWidth + @lineWidth
                @ctx[ if cell.charAt(3) is "1" then 'lineTo' else 'moveTo' ] left, topp
        @ctx.closePath()
        @ctx.stroke()

        @row = 0
        @col = 0

        @initTheseus()
    initTheseus: ->
        offset = @lineWidth * 2
        width  = @cellWidth - offset
        
        @theseus = new Theseus @ctx, width, offset

        handleKeydown = (e) =>
            charAt = @data[@row][@col].charAt.bind @data[@row][@col]
            switch e.keyCode
                when 37, 72
                    unless charAt(3) is '1'
                        @theseus.move 'l'
                        @col--
                        e.preventDefault()
                when 38, 75
                    unless charAt(0) is '1'
                        @theseus.move 'u'
                        @row--
                when 39, 76
                    unless charAt(1) is '1'
                        @theseus.move 'r'
                        @col++
                when 40, 74
                    unless charAt(2) is '1'
                        @theseus.move 'd'
                        @row++

            if e.keyCode in [37, 38, 39, 40, 72, 74, 75, 76]
                e.preventDefault()

        document.addEventListener 'keydown', handleKeydown, false
        true

root = exports ? window
root.Labyrinth = Labyrinth
