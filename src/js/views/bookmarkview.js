import View from './view.js';
import previewView from './previewview.js';

class Bookmarkview extends View {
  _parentEelment = document.querySelector('.bookmarks__list');
  _message = '';
  _errorMessage = 'No Bookmarks Yet ):';

  addHendlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookMark => previewView.generateMarkupPreview(bookMark))
      .join('');
  }
}

export default new Bookmarkview();
