async function getTrendingMoviesPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json()
    const movies = data.results
    console.log(movies)
    movies.forEach(movie => {
        const trendingContainerImg = document.getElementById('trending__imgs_container')
        const apiImage = document.createElement('img')
        apiImage.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path)
        trendingContainerImg.appendChild(apiImage)
    })
}

getTrendingMoviesPreview()