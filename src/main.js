document.addEventListener('DOMContentLoaded', function(){
    window.onresize = function(){
        console.log(window.innerHeight)
    }
})
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
});

const BASE_URL = 'https://api.themoviedb.org/3/'
// async function getMovieInfo(movieId){
//     // Conexion a base de datos
//     const res = await fetch(BASE_URL + 'movie/' + movieId + '?api_key=' + API_KEY)
//     const data = await res.json()
//     const titledb = data.title
//     console.log(titledb)
//     // Crear HTML 
//     const body = document.querySelector('body')
//     const div = document.createElement('div')
//     div.classList.add('movie-details-blur')
//     body.appendChild(div)
//     // body.classList.add('fijar-body')
//     const title = document.createElement('h1')
//     const titleText = document.createTextNode(data.title)
//     title.appendChild(titleText)
//     div.appendChild(title)
// }
// Fetch nativo
async function getTrendingMoviesPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json()
    const movies = data.results
    movies.forEach(movie => {
        const trendingContainerImg = document.getElementById('trending__imgs_container')
        const apiImage = document.createElement('img')
        apiImage.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
        trendingContainerImg.appendChild(apiImage)
        apiImage.onclick = function() {
            getMovieInfo(movie.id)
        }
    })
}
// Fetch con axios
async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const categories = data.genres
    categories.forEach(category => {
        const categoryContainer = document.getElementById('category-container')
        const categoryElement = document.createElement('div')
        categoryElement.classList.add('category')
        const title = document.createTextNode(category.name)
        categoryElement.appendChild(title)
        categoryContainer.appendChild(categoryElement)
    })
}
