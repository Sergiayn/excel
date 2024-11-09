import {storage} from '@core/utils'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: ''
}
export const initialState = storage('excel-state') ?? defaultState
