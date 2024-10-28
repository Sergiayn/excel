import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
  }
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }
}
