export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return 'cell' === event.target.dataset.type
}
