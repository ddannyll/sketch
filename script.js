const grid = document.querySelector('.grid')
const colorPicker = document.querySelector('#color-picker')
const colorBtn = document.querySelector('#color-btn')
const eraserBtn = document.querySelector('#eraser-btn')
const clearBtn = document.querySelector('#clear-btn')
const gridRange = document.querySelector('#range')

let pickColor =  `${colorPicker.value}`
let currColor = pickColor
let backColor = 'white'
let gridSize = 16
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
} 

colorBtn.onclick = () => {currColor = pickColor}
colorPicker.onchange = (e) => {
    pickColor = e.target.value
    currColor = pickColor
}

// makeGrid takes a size (integer) and creates a grid of [size] x [size]
// populated with size^2 grid items (each with mouse event listeners)
function makeGrid(size) {
    // Creating the grid
    grid.style.cssText =`
        grid-template-columns: repeat(${size}, 1fr);
        grid-template-rows: repeat(${size}, 1fr);`
    
    // Populating the grid
    for (let i = 0; i < size ** 2; i++) {
        const gridItem = document.createElement('div')
        gridItem.classList.add('grid-item')
        gridItem.addEventListener('mousedown', applyColor)
        gridItem.addEventListener('mouseover', applyColor)
        grid.append(gridItem)
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


makeGrid(gridSize)