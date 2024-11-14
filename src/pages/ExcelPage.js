import {Page} from '@core/Page'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {debounce, storage} from '@core/utils'
import {initialState} from '@/redux/initialState'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {Toolbar} from '@/components/toolbar/Toolbar'

export class ExcelPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initialState)
    const stateListener = debounce((state) => {
      storage('excel-state', state)
    }, 500 )

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
