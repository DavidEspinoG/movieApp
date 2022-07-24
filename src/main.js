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
// Fetch nativo
async function getTrendingMoviesPreview(){
    // Obtiene la información general de la película
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json()
    const movies = data.results
    movies.forEach(movie => {
        const trendingContainerImg = document.getElementById('trending__imgs_container')
        const apiImage = document.createElement('img')
        apiImage.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
        trendingContainerImg.appendChild(apiImage)
        apiImage.onclick = function() {
            getMovieDetails(movie.id, movie.poster_path, movie.title, movie.overview)
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
        categoryElement.addEventListener('click', () => {
            getCategoryMovies(category.id, category.name)
        })
    })
}
// Obtener movie details
async function getMovieDetails(id, poster_path, title, overview){
    // Consulta a db
    const res = await fetch(BASE_URL + 'movie/' + id + '?api_key=' + API_KEY);
    const data = await res.json()
    //añade blur al contenedor principal
    const blur = document.getElementById('blur')
    blur.classList.add('blur')
    // Inyecta un div al body con la clase .movie-details-container
    const body = document.querySelector('body')
    const movieDetailsContainer = document.createElement('div')
    movieDetailsContainer.classList.add('movie-details-container')
    movieDetailsContainer.id = 'movie-details-container'
    body.appendChild(movieDetailsContainer)
    // Inyecta una imagen al movie details container
    const img = document.createElement('img')
    img.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + poster_path)
    movieDetailsContainer.appendChild(img)
    // Inyecta un div con la clase movie info 
    const movieInfoDiv = document.createElement('div');
    movieInfoDiv.classList.add('movie-info')
    movieDetailsContainer.appendChild(movieInfoDiv)
    // Añade título de la película
    const htmlTitle = document.createElement('h2')
    const textTitle = document.createTextNode(title)
    htmlTitle.appendChild(textTitle)
    movieInfoDiv.appendChild(htmlTitle);
    // Añade un p con la overview de la pelicula
    const htmlOverview = document.createElement('p')
    const textOverview = document.createTextNode(overview)
    htmlOverview.appendChild(textOverview)
    movieInfoDiv.appendChild(htmlOverview)
    // Añade el boton cerrar movie details 
    const cerrarDiv = document.createElement('div')
    cerrarDiv.classList.add('contenedor-cerrar')
    movieInfoDiv.appendChild(cerrarDiv)
    const botonCerrar = document.createElement('button')
    botonCerrar.classList.add('btn-cerrar')
    // botonCerrar.setAttribute('id', 'cerrar')
    const textButton = document.createTextNode('X')
    botonCerrar.appendChild(textButton)
    cerrarDiv.appendChild(botonCerrar)

    addListener()
}
// Cerrar movie details
function addListener(){
    const closeButtons = document.querySelectorAll('.btn-cerrar')
closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', closeDetails, false)
})
}
const closeButtons = document.querySelectorAll('.btn-cerrar')
closeButtons.forEach(closeButton => {
    closeButton.addEventListener('click', closeDetails, false)
})

function closeDetails() {
    const body = document.querySelector('body')
    const contenedorDetails = document.getElementById('movie-details-container');
    // contenedorDetails.classList.add('display-none')
    body.removeChild(contenedorDetails)
    const blur = document.getElementById('blur')
    blur.classList.remove('blur')
}
addListener()
async function getCategoryMovies(id, categoryTitle){
    const categoryMovies = document.getElementById('categoryMovies')
    if(categoryMovies){
        $('#categoryMovies').hide(1000)
        setTimeout(() => {
            const mainContainer = document.getElementById('main-container')
            mainContainer.removeChild(categoryMovies)
        }, 1500)
    } 
    if (!categoryMovies){
        console.log('hacer scroll')
        setTimeout(()=> {
            window.scrollTo({top: 1200, behavior: "smooth"})
        },100) 
    }
    const res = await fetch(BASE_URL + 'discover/movie?with_genres=' + id +'&api_key=' + API_KEY)
    const data = await res.json()
    const movies = data.results
    const mainContainer = document.getElementById('main-container')
    const section = document.createElement('div')
    section.classList.add('main-container__trending', 'secondary-container')
    section.id = 'categoryMovies'
    mainContainer.appendChild(section)
    const htmlTitle = document.createElement('h2')
    const textTitle = document.createTextNode(categoryTitle)
    htmlTitle.appendChild(textTitle)
    section.appendChild(htmlTitle)
    // Creando el contenedor de las imágenes de las películas
    const categoryMoviesContainer = document.createElement('div')
    categoryMoviesContainer.classList.add('trending__imgs')
    categoryMoviesContainer.id = 'categoryMoviesContainer'
    section.appendChild(categoryMoviesContainer)
    movies.forEach(movie => {
        const htmlImg = document.createElement('img')
        htmlImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
        categoryMoviesContainer.appendChild(htmlImg)
        
    })
}
