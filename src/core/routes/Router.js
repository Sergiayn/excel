import {$} from '@core/dom'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('No selector provided')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    const Page = this.routes.excel
    const page = new Page()
    this.$placeholder.append(page.getRoot())
    page.afterRender()
    console.log('afterRender')
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
