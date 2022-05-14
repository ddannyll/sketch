// Globals
let currColor = 'red'
let mouseDown = false
let gridSize = 16

const grid = document.querySelector('.grid')
const colorBtn = document.querySelector('#color-btn')
const eraserBtn = document.querySelector('#erasor-btn')
const clearBtn = document.querySelector('#clear-btn')
const gridRange = document.querySelector('#range')

// Event listeners for mouse events, update global mouseDown accordingly
document.body.onmousedown = (e) => {
    mouseDown = true
    e.preventDefault()
}

document.body.onmouseup = () => {mouseDown = false}

// Event listeners for Buttons + Range
clearBtn.onclick = () => {
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
        gridItem.addEventListener('mousedown', changeColor)
        gridItem.addEventListener('mouseover', changeColor)
        grid.append(gridItem)
    }
}

// changeColor takes an event parameter changes the color of the gridItem
// that the event depeneding on the mouse state.
function changeColor(e) {
    // do not change color if mouse is not already being held OR 
    // the mouse was not just clicked
    if (!mouseDown && !(e.type === 'mousedown')) return
    e.target.style.backgroundColor = currColor
}


makeGrid(gridSize)