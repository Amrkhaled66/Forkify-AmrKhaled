import View from './view.js';
import icons from 'url:../../img/icons.svg';

class Previewview extends View {

    generateMarkupPreview(res) {
      const id = window.location.hash.slice(1);
      return `<li class="preview">
          <a class="preview__link ${id === res.id ? 'preview__link--active' : ''}" href="#${res.id}">
            <figure class="preview__fig">
              <img src="${res.image}" alt="${res.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${res.title}...</h4>
              <p class="preview__publisher">${res.publisher}</p>
              <div class="preview__user-generated ${res.key?"":"hidden"}">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>`;
    }
}

export default new Previewview();
