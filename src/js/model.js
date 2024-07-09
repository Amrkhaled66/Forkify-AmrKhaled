import { API_URL, KEY, RES_PER_PAGE } from './config';
import { getJson, sendJson } from './helper';

const makeRecipeObj = function (data) {
  const { recipe } = data.data;
  return (state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredints: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  });
};

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    // 1) Fetch the recipe from the API
    const data = await getJson(`${API_URL}/${id}`);

    // 2) fomrat the data again with our one
    makeRecipeObj(data);
    // 3) check if the recipe is bookmarked from the bookmark array that we saved bookmarked ids there
    if (state.bookmarks.some(recipe => state.recipe.id === recipe.id))
      state.recipe.bookmarked = true;
  } catch (err) {
    throw err;
  }
};

export const loadSearchReasults = async function (query) {
  try {
    // 1) sign the qurey in the state object
    state.search.query = query;

    // 2) get the data from the API
    const data = await getJson(`${API_URL}?search=${query}`);

    // 3) update the data in the state with our format
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
      // 4) reset the numver of page if we alredy search before and change this num in the stae
      state.search.page = 1;
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  // 1) sing the page in the state
  state.search.page = page;

  // 2) get the start and end indexes to get them from the array in state
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;

  // 3) return array from the start to the end of recipes results
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // 1) loop over the ingredints to update them in the state
  state.recipe.ingredints.forEach(
    ing =>
      (ing.quantity = (ing.quantity * newServings) / state.recipe.servings),
  );
  // 2) update the servings
  state.recipe.servings = newServings;
};

const setBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  return;
};

export const addbookmark = function (recipe) {
  // 1) push the id of the reicpe in the array
  state.bookmarks.push(recipe);

  //  2) bookmark it because then we will update the dom in the view
  if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;

  // 3) update the bookmark
  setBookmark();
};

export const removebookmark = function (id) {
  // 1) find the index to remove it from the array
  const index = state.bookmarks.findIndex(rec => rec.id === id);

  // 2) remove it
  state.bookmarks.splice(index, 1);

  // 3) remove mark from the state to update the dom
  if (state.recipe.id === id) state.recipe.bookmarked = false;

  // 4) update the bookmark
  setBookmark();
};

const init = function () {
  const bookmarks = localStorage.getItem('bookmarks');
  if (bookmarks) state.bookmarks = JSON.parse(bookmarks);
};
init();

export const uploadRecipe = async function (newRecipe) {
  try {
    // 1) convert it again to entries to get the ingredints
    const recipeArr = Object.entries(newRecipe);

    // 2) make oprations on array to get the ingredints
    const ingredients = recipeArr
      .filter(ele => ele[0].startsWith('ingredient') && ele[1])
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');

        if (ingArr.length !== 3) throw Error('worng Form Format Tyr Again 🔥');

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    // 3) make the recipe object will sent to the API
    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };
    const res = await sendJson(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = makeRecipeObj(res);
    addbookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
