import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'

const CODES = {A: 65, Z: 90}
const DEFAULT_HEIGHT = 24
const DEFAULT_WIDTH = 120

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id] || ''
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })

    return `
    <div class="cell" contenteditable
        data-col="${col}"
        data-row="${row}"
        data-id="${id}"
        data-type="cell"
        style="${styles}; width: ${width}"
        >${data}</div>
  `
  }
}

function toColumn({col, index, width}) {
  return `
<div class="column"
     data-type="resizable" data-col="${index}" style="width: ${width}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
</div>
  `
}
function createRow(index, content, rowState = {}) {
  const resizer = index ?
    '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(rowState, index)
  return `
<div class="row"
    style="height: ${height}"
    data-type="resizable" data-row="${index}">
  <div class="row-info">
    ${index ? index : ''}
    ${resizer}
  </div>
  <div class="row-data">${content}</div>
</div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}
function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}
function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}
function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index),
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
