import View from './view.js';
import previewView from './previewview.js';

class ResultsView extends View {
  _parentEelment = document.querySelector('.results');
  _message = '';
  _errorMessage = 'No Recipes With This Name, Try Again';

  _generateMarkup() {
    return this._data
      .map(res => previewView.generateMarkupPreview(res))
      .join('');
  }
}

export default new ResultsView();
