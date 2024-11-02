export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
  }

  /** @param {Dom} $el */
  select($el) {
    this.clear()

    this.group.push($el)
    $el.addClass(TableSelection.className)
  }
  selectGroup() {}

  clear() {
    this.group.forEach(($c) => $c.removeClass(TableSelection.className))
    this.group = []
  }
}
