/**
 * @jest-environment jsdom
 */
import {Page} from '@core/Page'
import {Router} from '@core/routes/Router'

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'Dashboard'
    return root
  }
}
class ExcelPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'Excel'
    return root
  }
}

describe('Router:', () => {
  let $root
  let router

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render Dashboard Page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>Dashboard</div>')
  })
})
