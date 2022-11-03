const settingsIcon = document.getElementById("settings")
const settingsPopUp = document.getElementById("settingsPopUp")
const closePopUp = document.getElementById("closePopUpIcon")
const settingsPopUpContentContainer = document.getElementById("settingsPopUpContentContainer")
const saveLayerBtn = document.getElementById("saveLayerBtn")
const addLayerBtn = document.getElementById("addLayerIcon")
const closeLayerPopUpIcon = document.getElementById("closeLayerPopUpIcon")
const outerPopUp = document.getElementById("outerPopUp")

let layerId = 0

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

    settingsPopUpContentContainer.innerHTML = "" // Empty the layer settings 
    fillLayersSetting() // Fill the layer settings 
    addEventListeners() // Adding event listeners to new list of layers in settings
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
                <div>
                    <div>Stars count ${layer.starsCount}</div>
                    <div>Stars speed ${layer.speed}  </div>
                </div>
                <div>
                    <div>Min radius ${layer.minRadius}</div>
                    <div>Max radius ${layer.maxRadius}</div>
                </div>
                <div>
                    <div>Star color ${layer.color}</div>
                </div>
                <div>
                    <div>Blur ${layer.blur}</div>
                    <div>Shadow color ${layer.shadowColor}</div>
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
    for (let i = 0; i < layersIds.length; i++) {
        const layer = layersIds[i];
        layer.addEventListener('click', () => removeLayer(layer.getAttribute("aria-id")))
    }
    layerId++
}

fillLayersSetting()
addEventListeners()

settingsIcon.addEventListener("click", openSettingsPopUp)
closePopUp.addEventListener("click", closeSettingsPopUp)
addLayerBtn.addEventListener("click", openAddLayerPopUp)
saveLayerBtn.addEventListener("click", () => { saveAddLayer(); closeAddLayerPopUp() })
closeLayerPopUpIcon.addEventListener("click", closeAddLayerPopUp)
