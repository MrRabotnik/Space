const settingsIcon = document.getElementById("settings")
const settingsPopUp = document.getElementById("settingsPopUp")
const closePopUp = document.getElementById("closePopUpIcon")
const settingsPopUpContentContainer = document.getElementById("settingsPopUpContentContainer")
const saveLayerBtn = document.getElementById("saveLayerBtn")
const addBackLayerIcon = document.getElementById("addBackLayerIcon")
const addFrontLayerIcon = document.getElementById("addFrontLayerIcon")
const closeLayerPopUpIcon = document.getElementById("closeLayerPopUpIcon")
const outerPopUp = document.getElementById("outerPopUp")

let layerId = 0
let frontOrBackLayer = ""

function openSettingsPopUp() {
    settingsPopUp.style.visibility = "visible"
}

function closeSettingsPopUp() {
    settingsPopUp.style.visibility = "hidden"
}

function openAddLayerPopUp() {
    outerPopUp.style.visibility = "visible"
}

function closeAddLayerPopUp() {
    outerPopUp.style.visibility = "hidden"
}

function saveAddLayer() {
    const starsCountSetting = document.getElementById("starsCountSetting")
    const starMinRadiusSetting = document.getElementById("starMinRadiusSetting")
    const starMaxRadiusSetting = document.getElementById("starMaxRadiusSetting")
    const starSpeedSetting = document.getElementById("starSpeedSetting")
    const starColorSetting = document.getElementById("starColorSetting")
    const starBlurSetting = document.getElementById("starBlurSetting")
    const starShadowColorSetting = document.getElementById("starShadowColorSetting")

    if (frontOrBackLayer === "back") {
        layers.unshift({
            "starsCount": starsCountSetting.value ? starsCountSetting.value : 1,
            "minRadius": starMinRadiusSetting.value ? starMinRadiusSetting.value : 100,
            "maxRadius": starMaxRadiusSetting.value ? starMaxRadiusSetting.value : 100,
            "speed": starSpeedSetting.value ? starSpeedSetting.value : 0.1,
            "color": starColorSetting.value ? starColorSetting.value : "#ffffff",
            "blur": starBlurSetting.value ? starBlurSetting.value : 30,
            "shadowColor": starShadowColorSetting.value ? starShadowColorSetting.value : "#000000",
            "id": "layer_" + (layerId)
        })
    } else {
        layers.push({
            "starsCount": starsCountSetting.value ? starsCountSetting.value : 1,
            "minRadius": starMinRadiusSetting.value ? starMinRadiusSetting.value : 100,
            "maxRadius": starMaxRadiusSetting.value ? starMaxRadiusSetting.value : 100,
            "speed": starSpeedSetting.value ? starSpeedSetting.value : 0.1,
            "color": starColorSetting.value ? starColorSetting.value : "#ffffff",
            "blur": starBlurSetting.value ? starBlurSetting.value : 30,
            "shadowColor": starShadowColorSetting.value ? starShadowColorSetting.value : "#000000",
            "id": "layer_" + (layerId)
        })
    }
    
    settingsPopUpContentContainer.innerHTML = "" // Empty the layer settings 
    fillLayersSetting() // Fill the layer settings 
    addEventListeners() // Adding event listeners to new list of layers in settings
    createStarLayers()
    drawSpace()
}

function editLayerInfo(val, property, id) {
    layers = layers.map(layer => {
        if (layer.id === id) {
            layer[property] = val
        }
        return layer
    })
    createStarLayers()
    drawSpace()
}

function removeLayer(id) {
    document.getElementById(id).remove() // removing layer with "id" from layer settings
    layers = layers.filter(item => {
        return item.id !== id
    }) // removing layer with "id" from layer array
    createStarLayers()
    drawSpace()
}

function fillLayersSetting() {
    layers.map(layer => {
        const layerDiv =
            `<div class="layerSetting" id="${layer.id}">
                <div class="layerInfoContainer">
                    <div class="layerSingleInfoContainer">Stars count <input class="layerSingleInfoInput" aria-id="${layer.id}" aria-property="starsCount" type="number" value="${layer.starsCount}"></div>
                    <div class="layerSingleInfoContainer">Stars speed <input class="layerSingleInfoInput" aria-id="${layer.id}" aria-property="minRadius" type="number" value="${layer.speed}"></div>
                    <div class="layerSingleInfoContainer">Min radius <input class="layerSingleInfoInput" aria-id="${layer.id}" aria-property="maxRadius" type="number" value="${layer.minRadius}"></div>
                    <div class="layerSingleInfoContainer">Max radius <input class="layerSingleInfoInput" aria-id="${layer.id}" aria-property="speed" type="number" value="${layer.maxRadius}"></div>
                    <div class="layerSingleInfoContainer">Star color <input class="layerSingleInfoInput" aria-id="${layer.id}" aria-property="color" type="color" value="${layer.color}"></div>
                    <div class="layerSingleInfoContainer">Blur <input class="layerSingleInfoInput" aria-id="${layer.id}" aria-property="blur" type="number" value="${layer.blur}"></div>
                    <div class="layerSingleInfoContainer">Shadow color <input class="layerSingleInfoInput" aria-id="${layer.id}" aria-property="shadowColor" type="color" value="${layer.shadowColor}"></div>
                </div>
                <div class="removeLayer" aria-id="${layer.id}">
                    <img src="../images/remove.ico">
                </div>
            </div>`;
        settingsPopUpContentContainer.innerHTML += layerDiv
    })
}

function addEventListeners() {
    const layersIds = document.getElementsByClassName("removeLayer")
    const layerSingleInfo = document.getElementsByClassName("layerSingleInfoInput")
    for (let i = 0; i < layersIds.length; i++) {
        const layer = layersIds[i];
        layer.addEventListener('click', () => removeLayer(layer.getAttribute("aria-id")))
    }
    for (let i = 0; i < layerSingleInfo.length; i++) {
        const layerInfo = layerSingleInfo[i];
        layerInfo.addEventListener('change', () => editLayerInfo(layerInfo.value, layerInfo.getAttribute("aria-property"), layerInfo.getAttribute("aria-id")))
    }
    layerId++
}

fillLayersSetting()
addEventListeners()

settingsIcon.addEventListener("click", openSettingsPopUp)
closePopUp.addEventListener("click", closeSettingsPopUp)
addBackLayerIcon.addEventListener("click", () => { openAddLayerPopUp(); frontOrBackLayer = "back"})
addFrontLayerIcon.addEventListener("click", () => { openAddLayerPopUp(); frontOrBackLayer = "front"})
saveLayerBtn.addEventListener("click", () => { saveAddLayer(); closeAddLayerPopUp() })
closeLayerPopUpIcon.addEventListener("click", closeAddLayerPopUp)
