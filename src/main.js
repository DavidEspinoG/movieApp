async function getTrendingMoviesPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json()
    const movies = data.results
    movies.forEach(movie => {
        const trendingContainerImg = document.getElementById('trending__imgs_container')
        const apiImage = document.createElement('img')
        apiImage.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
        trendingContainerImg.appendChild(apiImage)
    })
}
async function getCategoriesPreview(){
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data = await res.json()
    const categories = data.genres
    categories.forEach(category => {
        console.log(category)
        const categoryContainer = document.getElementById('category-container')
        const categoryElement = document.createElement('div')
        categoryElement.classList.add('category')
        const title = document.createTextNode(category.name)
        categoryElement.appendChild(title)
        categoryContainer.appendChild(categoryElement)
    })
}
getTrendingMoviesPreview()
getCategoriesPreview()