import View from './view.js';
import icons from 'url:../../img/icons.svg';
class Pagination extends View {
  _parentEelment = document.querySelector('.pagination');
  _currPage;

  addHandlerClick(handler) {
    this._parentEelment.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = Number(btn.dataset.goto);
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    this._currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    if (this._currPage === 1 && numPages > 1) {
      return this._generateNextBtn();
    }

    if (this._currPage === numPages && numPages > 1) {
      return this._generatePrevBtn();
    }

    if (this._currPage < numPages) {
      return this._generatePrevBtn() + this._generateNextBtn();
    }

    return this._generateNextBtn();
  }

  _generatePrevBtn() {
    return ` <button data-goto="${this._currPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._currPage - 1}</span>
          </button>`;
  }

  _generateNextBtn() {
    return `<button data-goto="${this._currPage + 1}"  class="btn--inline pagination__btn--next">
    <span>Page ${this._currPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }
}

export default new Pagination();
