function executeGrid() {
  if (!grid.classList.contains("grid-css")) {
    if (grid.classList.contains("grid-flex")) {
      clearGrid();
      grid.classList.remove("grid-flex");
    }
    grid.classList.add("grid-css");
  }

  let cells =
    grid.childElementCount > 0
      ? Math.pow(
          Math.sqrt(grid.childElementCount) + parseInt(numberOfCells),
          2
        ) - grid.childElementCount
      : numberOfCells * numberOfCells;

  for (let i = 0; i < cells; i++) {
    const cell = document.createElement("div");

    cell.classList.add("cellGrid");
    grid.appendChild(cell);
    cell.addEventListener("mouseover", (e) => {
      hoverColor(e);
    });
  }

  let resultingSideSize = Math.sqrt(grid.childElementCount);
  grid.style.gridTemplateColumns = `repeat(${resultingSideSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${resultingSideSize}, 1fr)`;
  sizeH1.innerText = `Grid size: ${resultingSideSize} x ${resultingSideSize}`;
  console.log("Used the Grid method.");
}

function executeFlex() {
  
  if (!grid.classList.contains("grid-flex")) {
    if (grid.classList.contains("grid-css")) {
      grid.classList.remove("grid-css");
      clearGrid();
    }
    grid.classList.add("grid-flex");
  }

  for (let i = 0; i < numberOfCells; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    grid.appendChild(column);
  }

  const columns = document.querySelectorAll(".column");

  columns.forEach((column) => {
    for (
      let j = 0;
      j < columns.length && column.childElementCount < columns.length;
      j++
    ) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      column.appendChild(cell);
      cell.addEventListener("mouseover", (e) => {
        hoverColor(e);
      });
    }
    sizeH1.innerText = `Grid size: ${columns.length} x ${column.childElementCount}`;
  });
  console.log("Used the Flexbox method.");
}

function hoverColor(e) {
  e.target.classList.add("backGround");
}

function clearColors() {
  const coloredElements = document.querySelectorAll(".backGround");
  coloredElements.forEach((coloredElement) =>
    coloredElement.classList.remove("backGround")
  );
  console.log(`Cleared colors of ${coloredElements.length} elements.`);
}

function clearGrid() {
  const list = document.getElementById("grid");
  let count = 0;
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
    count++;
  }

  console.log(`Removed ${count} columns.`);
  sizeH1.innerText = "Grid size: 0";
}

//-----DECLARATIONS-----
const slider = document.querySelector("#sizeSlider");
let numberOfCells = 1;
const grid = document.querySelector("#grid");
const btn = document.querySelector("#button");
const sliderLabel = document.querySelector("#sliderId");

const btnClrColors = document.querySelector("#buttonClearColors");
const btnClrGrid = document.querySelector("#buttonClearGrid");
const sizeH1 = document.querySelector("#gridSize");
const sel = document.querySelector("#methodId");

let typeOfGrid = sel.value == "flexbox" ? executeFlex : executGrid;

btn.addEventListener("click", () => {
  numberOfCells = slider.value;
  if (sel.value == "flexbox") executeFlex();
  else executeGrid();
});
btnClrColors.addEventListener("click", clearColors);
btnClrGrid.addEventListener("click", clearGrid);

slider.addEventListener(
  "input",
  () => (sliderLabel.innerText = slider.value + "² cells")
);
