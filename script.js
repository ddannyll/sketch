const grid = document.querySelector('.grid')
const colorPicker = document.querySelector('#color-picker')
const colorBtn = document.querySelector('#color-btn')
const eraserBtn = document.querySelector('#eraser-btn')
const clearBtn = document.querySelector('#clear-btn')
const gridRange = document.querySelector('#grid-range')
const gridRangeText = document.querySelector('#grid-range-text')

let pickColor =  `${colorPicker.value}`
let currColor = pickColor
let backColor = 'white'
let gridSize = `${gridRange.value}`
let mouseDown = false


// Event listeners for mouse events, update global mouseDown accordingly
grid.onmousedown = (e) => {
    mouseDown = true
    e.preventDefault()
}

document.body.onmouseup = () => {mouseDown = false}


// Event listeners for Buttons + Range + Color
clearBtn.onclick = () => {
    let gridItems = document.querySelectorAll('.grid-item')
    gridItems.forEach((gridItem)=>{
        gridItem.style.backgroundColor = 'white'
    })
}
eraserBtn.onclick = () => {
    currColor = backColor
    eraserBtn.classList.add('active')
    colorBtn.classList.remove('active')
} 

colorBtn.onclick = () => {
    currColor = pickColor
    colorBtn.classList.add('active')
    eraserBtn.classList.remove('active')
}
colorPicker.onchange = (e) => {
    pickColor = e.target.value
    currColor = pickColor
}

gridRange.onchange = () => {
    gridSize = gridRange.value
    deleteGridItems()
    makeGrid()
    updateRange()
}

gridRange.onmousemove = (e) => {
    gridSize = e.target.value
    updateRange()
}


function makeGrid() {
    // Creating the grid
    grid.style.cssText =`
        grid-template-columns: repeat(${gridSize}, 1fr);
        grid-template-rows: repeat(${gridSize}, 1fr);`
    
    // Populating the grid
    for (let i = 0; i < gridSize ** 2; i++) {
        const gridItem = document.createElement('div')
        gridItem.classList.add('grid-item')
        gridItem.addEventListener('mousedown', applyColor)
        gridItem.addEventListener('mouseover', applyColor)
        grid.append(gridItem)
    }
}

function deleteGridItems() {
    child = grid.lastElementChild
    while (child) {
        grid.removeChild(child)
        child = grid.lastElementChild
    }
}

// applyColor takes an event parameter and changes the color of the gridItem
// that the event depeneding on the mouse state.
function applyColor(e) {
    // do not change color if mouse is not already being held OR 
    // the mouse was not just clicked
    if (!mouseDown && !(e.type === 'mousedown')) return
    e.target.style.backgroundColor = currColor
}

function updateRange() {
    gridRangeText.innerText = `${gridSize} x ${gridSize}`
}

makeGrid()
updateRange()