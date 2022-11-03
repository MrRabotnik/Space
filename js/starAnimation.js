//Basic Actions 
let canvas = document.getElementById("space")
let ctx = canvas.getContext("2d")

let w = window.innerWidth
let h = window.innerHeight
canvas.width = w
canvas.height = h

// Starting the code
let stars = []
let layers = [
    {
        "starsCount": 1,
        "minRadius": 80,
        "maxRadius": 100,
        "speed": 0.1,
        "color": "#8888aa",
        "blur": 30,
        "shadowColor": "#ffff00",
        "id": "layer_0"
    },
    {
        "starsCount": 5,
        "minRadius": 0.5,
        "maxRadius": 1,
        "speed": 0.7,
        "color": "#555555",
        "blur": 5,
        "shadowColor": "#0000ff",
        "id": "layer_1"
    },
    {
        "starsCount": 6,
        "minRadius": 1,
        "maxRadius": 3,
        "speed": 1,
        "color": "#555555",
        "blur": 5,
        "shadowColor": "#0000ff",
        "id": "layer_2"
    },
    {
        "starsCount": 7,
        "minRadius": 3,
        "maxRadius": 5,
        "speed": 2,
        "color": "#666666",
        "blur": 4,
        "shadowColor": "#0000ff",
        "id": "layer_3"
    },
    {
        "starsCount": 8,
        "minRadius": 5,
        "maxRadius": 7,
        "speed": 3,
        "color": "#888888",
        "blur": 3,
        "shadowColor": "#0000ff",
        "id": "layer_4"
    },
    {
        "starsCount": 9,
        "minRadius": 7,
        "maxRadius": 9,
        "speed": 4,
        "color": "#8888aa",
        "blur": 2,
        "shadowColor": "#0000ff",
        "id": "layer_5"
    },
    {
        "starsCount": 10,
        "minRadius": 9,
        "maxRadius": 12,
        "speed": 5,
        "color": "#bbbbbb",
        "blur": 2,
        "shadowColor": "#0000ff",
        "id": "layer_6"
    },
]

let middlePointX = w / 2
let middlePointY = h / 2

let animation;

function creatLayerStars(starsCount = 1, minRadius = 80, maxRadius = 100, speed = 0.1, color = "rgb(150, 150, 150)", blur = 30, shadowColor = "white") {
    for (let i = 0; i < starsCount; i++) {
        const x = Math.floor((Math.random() * (w - 50)) + 30)
        const y = Math.floor((Math.random() * (h - 50)) + 30)
        const radius = Math.floor((Math.random() * (Number(maxRadius) - Number(minRadius)) + 1) + Number(minRadius))
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

function createStarLayers() {
    stars = []
    for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        creatLayerStars(
            layer.starsCount,
            layer.minRadius,
            layer.maxRadius,
            layer.speed,
            layer.color,
            layer.blur,
            layer.shadowColor,
        )
    }
}

createStarLayers()
drawSpace()

document.addEventListener('mousemove', (e) => { animate(e) })