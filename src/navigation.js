window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator(){
    // console.log({location});

    if(location.hash.startsWith('#trends')) {
        trendsPage()
    } else if (location.hash.startsWith('#search=')){
        searchPage()
    } else if (location.hash.startsWith('#movie=')){
        movieDetailsPage()
    } else if (location.hash.startsWith('#category=')){
        categoriesPage()
    } else {
        homePage()
    }
}

function homePage(){
    console.log('Home')
    getTrendingMoviesPreview()
    getCategoriesPreview()
}
function trendsPage(){
    console.log('Estamos en trends')
}
function searchPage(){
    console.log('Estamos en busquedas')
}
function movieDetailsPage() {
    console.log('Estamos en movie details')
}
function categoriesPage(){
    console.log('Estamos en categories')
}