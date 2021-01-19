var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var mouseIsDown = false
var isDrawing = false
var firstPoint = { x : -1, y : -1}
var lastPoint = { x : -1, y : -1}

function mouseDragedListener(e) {
    if(mouseIsDown) {
        var point = getPoint(e.clientX, e.clientY)
        isDrawing = true

        // console.log(point.x + "  " + point.y)




        var tool = document.getElementById("tools").value
        if(tool == "1") {
            if(lastPoint.x == -1) {
                lastPoint = getPoint(e.clientX, e.clientY)
            }
            ctx.beginPath()
            ctx.save()
            ctx.lineWidth = 8
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
            ctx.restore()

            ctx.closePath()
            lastPoint = point
        } else {
            if(Cos(distance(point, lastPoint), distance(firstPoint, lastPoint), distance(point, firstPoint))> 0.04){
            
                ctx.beginPath()

                ctx.lineWidth = 0
                ctx.moveTo(firstPoint.x, firstPoint.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            
                ctx.closePath()

                lastPoint = point
            }
        }

        console.log(lastPoint.x + " ' " + lastPoint.y)

    }
}


function getPoint(X,Y) {
    return {x : X - canvas.getBoundingClientRect().left,
         y : Y - canvas.getBoundingClientRect().top}
}

function Cos(bc, ab, ac) {
    
    return Math.acos((bc**2 - ab**2 - ac**2) / (-2 * ab * ac))
}

function distance(a,b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2)
}

var mouseDown = (e) => {mouseIsDown = true; firstPoint = getPoint(e.clientX, e.clientY)}

var mouseUp = () => {
        mouseIsDown = false
        lastPoint = {x : -1, y : -1}
        firstPoint = {x : -1, y : -1}

    }
