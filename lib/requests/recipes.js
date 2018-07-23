const baseURL = require('./qsAPI').baseURL()

const recipesAPIFetch = (id, method, body) => {
  return fetch(`${baseURL}/api/v1/foods/${id}/recipes`, {
    method: `${method}`,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
}

const getRecipes = () => {
  recipesAPIFetch('', 'GET')
  .then(response => handleResponse(response))
  .then(recipes => getEachRecipe(recipes))
  .catch(error => console.error({ error }))
}

const handleResponse = (response) => {
  return response.json()
    .then(json => {
      if (!response.ok) {
        const error = {
          status: response.status,
          statusTest: response.statusText,
          json
        }
        return Promise.reject(error)
      }
      return json
    })
}

const getEachRecipe = (recipes) => {
  return recipes.forEach(recipe => {
    renderRecipe(recipe)
  })
}

const renderRecipe = (recipe) => {
  $('#recipes-info').prepend(
   `<h3> Recipe name: ${recipe.name}</h3>
    <a href=${recipe.url}>Cook it today!</a>`
  )
}

module.exports = {
  getRecipes
}
