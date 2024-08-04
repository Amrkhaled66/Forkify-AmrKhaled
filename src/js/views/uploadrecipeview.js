import View from './view.js';

class UploadRecipeView extends View {
  _parentEelment = document.querySelector('.upload');
  _addRecipeBtn = document.querySelector('.nav__btn--add-recipe');
  _recipeWindow = document.querySelector('.add-recipe-window');
  _btnCloseModal = document.querySelector('.btn--close-modal');
  _uploadBtn = document.querySelector('.upload__btn');
  _overlay = document.querySelector('.overlay');
  _message = 'Recipe is Uploaded Suceessfully';
  constructor() {
    super();
    this._addHandlerCloseWindow();
    this._addHandlerShowWindow();
    this.addHandlerUpload();
  }

  toggleWindow() {
    this._recipeWindow.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._addRecipeBtn.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    [this._btnCloseModal, this._overlay].forEach(e =>
      e.addEventListener('click', this.toggleWindow.bind(this)),
    );
  }

  addHandlerUpload(handler) {
    this._parentEelment.addEventListener('submit', function (e) {
      // 1) prevent the raold
      e.preventDefault();

      // 2) get the data from the form and convert it to object
      const formArr = [...new FormData(this)];
      const formObject = Object.fromEntries(formArr);

      // 3) call the handler
      handler(formObject);
    });
  }
}

export default new UploadRecipeView();
