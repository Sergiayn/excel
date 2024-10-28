export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('DomListener requires a root element');
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    console.log(this.listeners)
  }
}
