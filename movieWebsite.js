//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc
// &api_key= 9813ce01a72ca1bd2ae25f091898b1c7

const apiKey = 'api_key=9813ce01a72ca1bd2ae25f091898b1c7';
const url = 'https://api.themoviedb.org/3';
const path = '/discover/movie?sort_by=popularity.desc&';
const apiUrl = url + path + apiKey;
const imgUrl = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById ('main');

if (main != null) {
  getMovies (apiUrl);
} else {
  getMovieDetails (apiUrl);
}


function getMovies (url) {
  fetch (url)
  .then (res => res.json ())
  .then (data => {
    // console.log (data.results);
    showMovies (data.results);
  });
}


function showMovies (data) {
  main.innerHTML = ' ';
  data.forEach (movie => {
    const {title, poster_path, id ,overview} = movie;
    // console.log(title , poster_path ,id);
    const movieElement = document.createElement ('div');
    movieElement.classList.add ('movie');
    movieElement.innerHTML = `
        <a href="./movieDetailsPage.html?id=${id}"> 
        <img src="${imgUrl + poster_path}""/>
        <h4>${title}</h4>
        </a>
        `;
    main.appendChild (movieElement);
  });
}
// getMovies (apiUrl);

const movieId = location.search.split ('=')[1];
const movieData = document.getElementById ('movieData');

function getMovieDetails (url) {
    // console.log(searchTerm);
    fetch (url)
    .then (res => res.json ())
    .then (data => {
        data.results.forEach (movie => {
            if (movie.id == movieId) 
            {
                const {title, overview, poster_path , original_language} = movie;
                const newElement = document.createElement ('div');
                newElement.classList.add ('container');
                newElement.innerHTML = `
                            <img src="${imgUrl + poster_path}"/>
                            <div style="margin-left: 20px ">
                            <h2>${title}</h2>
                            <p>${overview}</p>
                            <p> <span style="font-weight: bold">Language: </span>${original_language}</p>
                            </div>
                            `;
                            movieData.append (newElement);
                        }
                    });
                });
}


const searchInput = document.getElementById("search")
// let searchTerm = '';
searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.toLowerCase();
    console.log(searchTerm);
    searchMovies(url) 
});
// console.log(searchTerm);


let i=0
function searchMovies (url) {
    fetch (url)
    .then (res => res.json ())
    .then (data => {
        data.results.forEach(movie => {
            console.log(data.results[i].title);
            const movieTitle = data.results[i].title;
            // if(movieTitle.toLowerCase() == searchTerm){
            //     console.log("YESSSSSSSSSS");
            // }
            // else{
            //     i++;
            // }
            i++;
            // showMovies (data.results);
        })
    });
}
searchMovies(apiUrl)
