export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('DomListener requires a root element');
    }
    this.$root = $root
  }
}
