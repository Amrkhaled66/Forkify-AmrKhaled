import * as model from './model.js';
import recipeview from './views/recipeview.js';
import resultsview from './views/resultsview.js';
import searchview from './views/searchview.js';
import paginationview from './views/paginationview.js';
import bookmarkview from './views/bookmarkview.js';
import uploadrecipeview from './views/uploadrecipeview.js';
import { SHOW_RECIPE_DALEY } from './config';
// should dont dontain each dom elemnts dom elemnts in the view
// https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept();
}
///////////////////////////////////////
const controlRecipes = async function () {
  try {
    //1) get the id from the hash
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 2) load the spinner
    recipeview.laodSpinner();

    // 3) get the data from the model
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 4) render the recipe
    recipeview.render(recipe);

    // 5) update the reaults and bookmark view to mark the selected one
    resultsview.update(model.getSearchResultPage());
    bookmarkview.update(model.state.bookmarks);
  } catch (err) {
    console.log(err);
    recipeview.renderError();
  }
};

const cortrolSearchResults = async function () {
  try {
    resultsview.laodSpinner();
    // 1) get search query
    const query = searchview.getQuery();
    if (!query) throw Error();

    // 2) fetch the data from the API
    await model.loadSearchReasults(query);

    //  3) render results
    resultsview.render(model.getSearchResultPage());

    // 4) render pagination
    paginationview.render(model.state.search);
  } catch (err) {
    console.log(err);
    resultsview.renderError();
  }
};

const controlPagination = function (goto) {
  //1) Render new results
  resultsview.render(model.getSearchResultPage(goto));

  //2) Render new pagination button
  paginationview.render(model.state.search);
};

const controlServings = function (newServings) {
  //1) update the recipe servings
  model.updateServings(newServings);

  //2) Update the recipe view
  recipeview.update(model.state.recipe);
};

const controlBookmark = function () {
  // check if we will add the bookmark or remove it
  if (!model.state.recipe.bookmarked) {
    // 1) bookmark it in the data
    model.addbookmark(model.state.recipe);
  } else {
    // 1) remove the book mark from the data
    model.removebookmark(model.state.recipe.id);
  }
  // 2) update the dom after updating the data
  recipeview.update(model.state.recipe);

  bookmarkview.render(model.state.bookmarks);
};

const loadBookmarks = function () {
  // load the book marks from the local storgae
  bookmarkview.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // 1)load the spinner
    uploadrecipeview.laodSpinner();

    // 2)send the data to the API
    await model.uploadRecipe(newRecipe);

    // 3) render the new recipe in the recipe view
    recipeview.render(model.state.recipe);

    // 4) render a succees message in the upload recipe
    uploadrecipeview.renderMessage();

    // 5)update the book marks
    loadBookmarks();

    // 6) close the window
    setTimeout(function () {
      uploadrecipeview.toggleWindow();
    }, SHOW_RECIPE_DALEY * 1000);

    // 7) update the URL
    window.history.pushState(null, undefined, `#${model.state.recipe.id}`);
  } catch (err) {
    console.log(err);
    uploadrecipeview.renderError(err);
  }
};

const newFeature = function () {
  console.log('Hello');
};

const init = function () {
  // load bookmarks
  bookmarkview.addHendlerRender(loadBookmarks);

  // control the recipes
  recipeview.addHandlerRender(controlRecipes);

  // control the servings
  recipeview.addHandlerUpdateServings(controlServings);

  // conrol the Bookmark
  recipeview.addHandlerBookmark(controlBookmark);

  // control the search results
  searchview.addHendlerSearch(cortrolSearchResults);

  // control the page numbers
  paginationview.addHandlerClick(controlPagination);

  // control add new recipe
  uploadrecipeview.addHandlerUpload(controlAddRecipe);
  
  newFeature();
};
init();
