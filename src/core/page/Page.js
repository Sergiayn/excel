export class Page {
  constructor(params) {
    this.params = params || Date.now().toString()
  }

  getRoot() {
    throw new Error('Method "getRoot" is not implemented.')
  }
  afterRender() {}
  destroy() {}
}
