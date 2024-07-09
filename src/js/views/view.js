import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  /**
   *
   * @param {object | object[]} data the data will be render in the DOM
   * @returns {undefined}
   * @todo com[lete the implamentaion
   * @author Amr Khaled
   */
  render(data) {
    //1) check if there is a data
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // 2) assing the data
    this._data = data;

    // 3) generete the markup
    const markup = this._generateMarkup();
    // 4) clear the innerhtml (spinner for example )
    this._clear();

    // 5) insert the elemnt to the dom
    this._parentEelment.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length == 0)) this._data = data;

    // 1) get a new markup
    const newMarkup = this._generateMarkup();

    // 2) get the dom from the new markup
    const newDom = document.createRange().createContextualFragment(newMarkup);

    // 3) get the dom elments the new dom
    const newElemnts = [...newDom.querySelectorAll('*')];

    // 4) get the curr elments the curr dom
    const currElemnts = [...this._parentEelment.querySelectorAll('*')];

    // 5) loop over the current elemnts and if differnt=>change the elemnts
    newElemnts.forEach((newE, i) => {
      const currE = currElemnts[i];
      if (!newE.isEqualNode(currE)) {
        currE.innerHTML = newE.innerHTML;
      }
    });
  }

  _clear() {
    this._parentEelment.innerHTML = '';
  }

  laodSpinner() {
    const markup = ` <div class="spinner">
              <svg>
                <use href="${icons}/icons.svg#icon-loader"></use>
              </svg>
            </div> `;
    this._clear();
    this._parentEelment.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear();
    this._parentEelment.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear();
    this._parentEelment.insertAdjacentHTML('afterbegin', markup);
  }
}
