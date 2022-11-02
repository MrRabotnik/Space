//Basic Actions 
let canvas = document.getElementById("space")
let ctx = canvas.getContext("2d")

let w = window.innerWidth
let h = window.innerHeight
canvas.width = w
canvas.height = h

// Starting the code
let stars = []

let middlePointX = w / 2
let middlePointY = h / 2

let animation;

function creatStars(starsCount = 10, minRadius = 3, maxRadius = 7, speed = 3, color = "rgb(150, 150, 150)", blur = 0, shadowColor = "white") {
    for (let i = 0; i < starsCount; i++) {
        const x = Math.floor((Math.random() * (w - 50)) + 30)
        const y = Math.floor((Math.random() * (h - 50)) + 30)
        const radius = Math.floor((Math.random() * maxRadius + 1) + minRadius)
        stars.push({ x, y, radius, speed, color, blur, shadowColor })
    }
}

function drawStar(x, y, radius, color, blur, shadowColor) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = color
    ctx.shadowBlur = blur;
    ctx.shadowColor = shadowColor;
    ctx.closePath();
    ctx.fill();
}

function drawSpace() {
    ctx.clearRect(0, 0, w, h)
    for (let star of stars) {
        drawStar(star?.x, star?.y, star?.radius, star?.color, star?.blur, star?.shadowColor)
    }
}

function animate(e) {
    clearInterval(animation)
    mouseX = e.clientX
    mouseY = e.clientY
    const xMultiplier = Math.abs(mouseX - middlePointX) / 100
    const yMultiplier = Math.abs(mouseY - middlePointY) / 100
    animation = setInterval(() => {
        stars = stars.map(star => {
            if (mouseX > middlePointX)
                star.x += star.speed * xMultiplier
            else
                star.x -= star.speed * xMultiplier
            if (mouseY > middlePointY)
                star.y += star.speed * yMultiplier
            else
                star.y -= star.speed * yMultiplier

            if (star.x > w + 100) star.x = 0
            if (star.y > h + 100) star.y = 0
            if (star.x < 0 - 100) star.x = w
            if (star.y < 0 - 100) star.y = h
            return star
        })
        drawSpace()
    }, 0);
}

creatStars(1, 60, 100, 0.1, "rgb(150, 150, 200)", 30, "yellow")
creatStars(25, 1, 3, 1, "rgb(50, 50, 50)", 5, "blue")
creatStars(20, 3, 5, 2, "rgb(80, 80, 80)", 4, "blue")
creatStars(15, 5, 7, 3, "rgb(110, 110, 110)", 3, "blue")
creatStars(10, 7, 9, 4, "rgb(150, 150, 150)", 2, "blue")
creatStars(5, 12, 15, 5, "rgb(200, 200, 200)", 2, "blue")

drawSpace()

document.addEventListener('mousemove', (e) => { animate(e) })


