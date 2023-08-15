const imgUrl = 'https://image.tmdb.org/t/p/w500';
// Get Top Ranked movies
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTY2Zjk2OTBiMzczOGU2YTY4M2U4NTdhMzhmZTYwZSIsInN1YiI6IjY0ZDEyMmFhNGQ2NzkxMDExYzE4ODFkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pRloq_a8461skYe_IWus7-7vK1tbDhaoJy_Rxue36ek'
    }
};
function getTopMovies(){
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            console.log(response.results);
            showTopMovies(response)
        })
        .catch(err => console.error(err));
}


function showTopMovies(response){
    main.innerHTML = ' ';
    response.results.forEach(movie => {
        const {title, poster_path, vote_average} = movie
        const mElement = document.createElement("div")
        mElement.classList.add("movie")
        mElement.innerHTML = `
        <img src="${imgUrl + poster_path}"/>
        <h4>${title}</h4>
        <h4>Rating: ${vote_average}</h4>
        `
        main.appendChild(mElement)
    })
}

getTopMovies();