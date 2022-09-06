API_KEY = 'bdaaaa2b20c386f0be9d20b50bd8dbe3'
const BASE_URL = 'https://api.themoviedb.org/3/'
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
});
// Utils
function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'))
    let movies;
    if (item) {
        movies = item
    } else {
        movies = {}
    }
    return movies
}
function likeMovie(movie) {
    const likedMovies = likedMoviesList()
    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined
    } else {
        likedMovies[movie.id] = movie
    }
    localStorage.setItem('liked_movies', JSON.stringify(likedMovies))
}
const lazyLoader = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
        
    })
});

// Fetch nativo
async function getTrendingMoviesPreview(){
    // Obtiene la información general de la película
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json()
    const movies = data.results
    const trendingContainerImg = document.getElementById('trending__imgs_container')
    trendingContainerImg.innerHTML = '';
        movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-img-container');
        trendingContainerImg.appendChild(movieContainer);
        const apiImage = document.createElement('img')
        const movieBtn = document.createElement('button');
        movieBtn.classList.add('btnLike');
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('btnLiked');
            likeMovie(movie); 
        });
        movieContainer.appendChild(apiImage)
        movieContainer.appendChild(movieBtn)
        apiImage.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
        // apiImage.setAttribute('loading', 'lazy');
        lazyLoader.observe(apiImage)
        apiImage.addEventListener('error', () =>{
            apiImage.setAttribute('src', '../img/404.jpg')
        })
        apiImage.onclick = function() {
            getMovieDetails(movie.id, movie.poster_path, movie.title, movie.overview)
        }

    })
}
getTrendingMoviesPreview()
// Fetch con axios
async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const categories = data.genres
    const categoryContainer = document.getElementById('category-container')
    categoryContainer.innerHTML = '';
    categories.forEach(category => {
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
getCategoriesPreview()
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
        setTimeout(()=> {
            window.scrollTo({top: 1200, behavior: "smooth"})
        },100) 
    }
    const res = await fetch(BASE_URL + 'discover/movie?with_genres=' + id +'&api_key=' + API_KEY)
    const data = await res.json()
    const movies = data.results
    const mainContainer = document.getElementById('main-container')
    const section = document.createElement('section')
    section.classList.add('secondary-container')
    section.id = 'categoryMovies'
    mainContainer.appendChild(section)
    // const imgContainer = document.createElement('div')
    // imgContainer.classList.add('img-container')
    const htmlTitle = document.createElement('h2')
    const textTitle = document.createTextNode(categoryTitle)
    htmlTitle.appendChild(textTitle)
    section.appendChild(htmlTitle)
    // Creando el contenedor de las imágenes de las películas
    const categoryMoviesContainer = document.createElement('div')
    categoryMoviesContainer.classList.add('image-container')
    categoryMoviesContainer.id = 'categoryMoviesContainer'
    section.appendChild(categoryMoviesContainer)
    movies.forEach(movie => {
        const htmlImg = document.createElement('img')
        htmlImg.setAttribute('loading', 'lazy');
        htmlImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
        categoryMoviesContainer.appendChild(htmlImg)
        htmlImg.addEventListener('click', () => {
            getMovieDetails(movie.id, movie.poster_path, movie.title, movie.overview)
        }, false)
    })
}
// Buscador 
const searchButton = document.getElementById('search-button')
searchButton.addEventListener('click', () => {
    searchMovies(searchInput.value)
}, false)
const searchInput = document.getElementById('search-input')
searchInput.addEventListener('keydown', (e) =>{ 
    if(e.code == 'Enter'){
        e.preventDefault()
        searchMovies(searchInput.value)
    }
})

async function searchMovies(query){
    const res = await fetch(BASE_URL + 'search/movie?api_key=' + API_KEY + '&query=' + query + '&page=1')
    const data = await res.json()
    const movies = data.results
    const mainContainer = document.getElementById('main-container')
    const sectionDelete = document.getElementById('search-result')
    if(sectionDelete){
        $('#search-result').hide(1000)
        setTimeout(() => {
            const rmSection = document.getElementById('search-result')
            mainContainer.removeChild(rmSection)
        }, 1500)
        
        
    }
    const section = document.createElement('section')
    section.classList.add('secondary-container')
    section.id = 'search-result'
    const reference = document.getElementById('reference')
    mainContainer.insertBefore(section, reference)
    const imgContainer = document.createElement('div')
    imgContainer.classList.add('image-container')
    section.appendChild(imgContainer)
    movies.forEach(movie => {
        const img = document.createElement('img')
        img.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
        imgContainer.appendChild(img);
        img.setAttribute('loading', 'lazy')
        img.addEventListener('error', () =>{
            img.setAttribute('src', '../img/404.jpg')
        })
        img.addEventListener('click', () => {
            getMovieDetails(movie.id, movie.poster_path, movie.title, movie.overview)
        }, false)
    })
}

