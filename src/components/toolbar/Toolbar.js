import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {createToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'
  constructor($root, options = {}) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    })
  }
  prepare() {
    const initialState = {
      fontStyle: 'normal',
      fontWeight: 'normal',
      textAlign: 'left',
      textDecoration: 'none',
    }
    this.initState(initialState)
  }

  get template() {
    return createToolbar(this.state)
  }
  toHTML() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      const key = Object.keys(value)[0]
      this.setState({[key]: value[key]})
    }
  }
}
