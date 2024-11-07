import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/Table.resize'
import {isCell, matrix, nextSelector, shouldResize}
  from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/Table.selection'
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options = {}) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
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
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.find('[data-id="' + id + '"]'))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
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
        this.selectCell($next)
      }
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}
