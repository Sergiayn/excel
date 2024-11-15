export class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('Method "getRoot" is not implemented.')
  }
  afterRender() {}
  destroy() {}
}
