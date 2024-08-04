import View from "./view.js";

class SearchView extends View {
  _parentEelment = document.querySelector('.search');

  getQuery() {
    const query = this._parentEelment.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  addHendlerSearch(handler) {
    this._parentEelment.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._parentEelment.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
