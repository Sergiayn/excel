export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  /** @param {Dom} $el */
  select($el) {
    this.clear()
    $el.addClass(TableSelection.className)
    this.group.push($el)
    this.current = $el
  }
  selectGroup($group) {
    this.clear()
    this.group = $group
    this.group.forEach(($el) => {
      $el.addClass(TableSelection.className)
    })
  }

  clear() {
    this.group.forEach(($c) => $c.removeClass(TableSelection.className))
    this.group = []
  }
}
