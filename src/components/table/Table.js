import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {matrix} from '@core/utils'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/Table.resize'
import {isCell, nextSelector, shouldResize}
  from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/Table.selection'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
    })
  }
  toHTML() {
    return createTable()
  }

  prepare() {
    super.prepare()
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.find('[data-id="' + id + '"]'))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowDown',
      'ArrowUp',
      'ArrowRight',
      'ArrowLeft'
    ]
    const {key} = event
    if (!event.shiftKey && keys.includes(key)) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      if (null !== $next.$el) {
        this.selection.select($next)
      }
    }
  }
}
