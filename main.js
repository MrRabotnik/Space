let canvas = document.getElementById("space")
let ctx = canvas.getContext("2d")

let w = window.innerWidth
let h = window.innerHeight
canvas.width = w
canvas.height = h

ctx.strokeStyle = 'white'
ctx.fillStyle = 'white'

let radius = 30
let growRadius = null
let mouseX, mouseY;

function drawCircleAroundCursor(mouseX, mouseY) {
    ctx.beginPath();
    ctx.clearRect(0, 0, w, h);
    ctx.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    drawCircleAroundCursor(mouseX, mouseY)
})

document.addEventListener('mousedown', (e) => {
    growRadius = setInterval(() => {
        radius += 1
        drawCircleAroundCursor(mouseX, mouseY)
    }, 0)
})

document.addEventListener('mouseup', (e) => {
    clearInterval(growRadius)
    radius = 30
    drawCircleAroundCursor(mouseX, mouseY)
})

