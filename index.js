// using online API key and URL
const apiKey = "13749ecc";
let search = null;
const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;
// console.log(baseUrl);

// getting the html elements into js
const searchBar = document.getElementById("searchBar");
const searchIcon = document.querySelector(".search-icon");
const moviePosterContainer = document.querySelector(".movie-poster-container");
const posterSubContainer = document.querySelector(".poster-subContainer");

// adding click event for the search icon
searchIcon.addEventListener("click", searchMovie);

// function for setting the title of the movie using click event
function searchMovie() {
  if (searchBar.value) {
    search = searchBar.value;
    setMovieName(search);
  } else {
    throw new Error("Invalid URL");
  }
}

// function to use the movie name in the url by searching which will be called in click event
function setMovieName(searchName) {
  let searchUrl = `${baseUrl}&s=${searchName}&plot=full`;
  if (searchUrl) {
    fetchMovieApi(searchUrl);
  }
}

// function for fetching the API by using the search URL which will be called in setMovieName function
function fetchMovieApi(searchUrlForMovie) {
  fetch(searchUrlForMovie)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log("data:",data);
      console.log("data:", data.Search);
      let movieArray = data.Search;
      displayMovie(movieArray);
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

// function to display movie posters in UI
function displayMovie(movieArray) {
  movieArray.forEach(function (movieDetails, index) {
    // console.log(movieDetails);
    const posterMainDiv = document.createElement("div");
    const posterImageDiv = document.createElement("div");
    const posterDetailsDiv = document.createElement("div");

    posterMainDiv.classList.add(
      "border-2",
      "border-red-500",
      "h-full",
      "w-60",
      "flex",
      "flex-col",
      "justify-between",
      "rounded-lg"
    );
    posterImageDiv.classList.add("border-2", "border-blue-500", "h-72","rounded-lg");
    posterDetailsDiv.classList.add("border-2", "border-green-500", "h-28","rounded-lg");

    // image tag for movie posters
    const imgTag = document.createElement("img");
    imgTag.src = movieDetails.Poster;
    imgTag.classList.add("h-full", "w-full","rounded-lg");
    posterImageDiv.append(imgTag);

    posterMainDiv.append(posterImageDiv, posterDetailsDiv);
    posterSubContainer.append(posterMainDiv);
  });
}
