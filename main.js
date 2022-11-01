//Basic Actions 
let canvas = document.getElementById("space")
let ctx = canvas.getContext("2d")

let w = window.innerWidth
let h = window.innerHeight
canvas.width = w
canvas.height = h

// Starting the code
ctx.strokeStyle = 'white'
ctx.fillStyle = 'white'

let stars = []

let middlePointX = w / 2
let middlePointY = h / 2

let animation;
    
function drawStar(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function drawSpace() {
    ctx.clearRect(0, 0, w, h)
    for (let star of stars) {
        drawStar(star?.x, star?.y, star?.radius)
    }
}

for (let i = 0; i < 100; i++) {
    const x = Math.floor((Math.random() * (w - 50)) + 30)
    const y = Math.floor((Math.random() * (h - 50)) + 30)
    const radius = Math.floor((Math.random() * 15) + 5)
    stars.push({ x, y, radius })
}

drawSpace()

document.addEventListener('mousemove', (e) => {
    clearInterval(animation)
    mouseX = e.clientX
    mouseY = e.clientY
    const interval = Math.abs(mouseX - middlePointX) + Math.abs(mouseY - middlePointY) > 600 ? 600 : Math.abs(mouseX - middlePointX) + Math.abs(mouseY - middlePointY)
    animation = setInterval(() => {
        stars = stars.map(star => {
            if (mouseX > middlePointX) star.x += (mouseX - middlePointX) / 5
            if (mouseY > middlePointY) star.y += (mouseY - middlePointY) / 10
            if (mouseX < middlePointX) star.x -= (middlePointX - mouseX) / 5
            if (mouseY < middlePointY) star.y -= (middlePointY - mouseY) / 10
                
            if (star.x > w) star.x = 0
            if (star.y > h) star.y = 0
            if (star.x < 0) star.x = w
            if (star.y < 0) star.y = h
            return star
        })
        drawSpace()
    }, 600 - interval);
})


