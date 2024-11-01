import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    })
  }
  toHTML() {
    return createTable()
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
      const type = $resizer.data.resize

      document.onmousemove = (e) => {
        if ('col' === type) {
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          $parent.css({width: `${value}px`})
          cells.forEach((el) => el.style.width = `${value}px` )
        } else {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          $parent.css({height: `${value}px`})
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
