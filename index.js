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
const clearSearch = document.querySelector(".clear-search");
const headingTag = document.querySelector(".headingTag");
const recommendedHeading = document.querySelector(".recommend-heading");
const recommendedMovieSubContainer = document.querySelector(
  ".recommended-movie-subContainer"
);

// adding click event for the search icon
searchIcon.addEventListener("click", searchMovie);

// function for setting the title of the movie from the input search field
function searchMovie() {
  if (searchBar.value) {
    search = searchBar.value;
    setMovieName(search);
  } else {
    throw new Error("Invalid URL");
  }
}

// function to use the set movie name in the url from the input search field
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
      if(response.ok){
        return response.json();
      } else {
        throw new Error("Invalid URL");
      }
    })
    .then(function (data) {
      // console.log("data:",data);
      console.log("data:", data.Search);
      let movieArray = data?.Search;
      displayMovie(movieArray);
      recommendedMovies(movieArray);
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

// function to display movie posters in UI
function displayMovie(movieArray) {
  posterSubContainer.innerHTML = "";

  movieArray?.forEach(function (movieDetails, index) {
    // console.log(movieDetails);
    const posterMainDiv = document.createElement("div");
    const posterImageDiv = document.createElement("div");
    const posterDetailsDiv = document.createElement("div");

    posterMainDiv.classList.add(
      "border-2",
      "border-red-500",
      "h-full",
      "flex",
      "flex-col",
      "justify-between",
      "rounded-lg",
      "shadow-xl"
    );
    posterImageDiv.classList.add(
      "border-2",
      "border-blue-500",
      "h-60",
      "rounded-lg"
    );
    posterDetailsDiv.classList.add(
      "border-2",
      "border-green-500",
      "h-40",
      "rounded-lg",
      "px-2",
      "bg-slate-100",
      "relative"
    );

    // image tag for movie posters
    const imgTag = document.createElement("img");
    imgTag.src = movieDetails.Poster;
    imgTag.classList.add("h-full", "w-full", "rounded-lg");
    posterImageDiv.append(imgTag);

    // movie title
    const pTag_movie_title = document.createElement("p");
    pTag_movie_title.textContent = movieDetails.Title;
    pTag_movie_title.classList.add(
      "font-bold",
      "italic",
      "text-fuchsia-600",
      "text-lg"
    );

    // release date of movie
    const spanTag_releaseDate_text = document.createElement("span");
    spanTag_releaseDate_text.textContent = "RELEASE DATE: ";
    spanTag_releaseDate_text.classList.add(
      "text-sm",
      "italic",
      "text-fuchsia-600"
    );

    const spanTag_releaseDate_from_API = document.createElement("span");
    spanTag_releaseDate_from_API.textContent = movieDetails.Year;
    spanTag_releaseDate_from_API.classList.add(
      "text-sm",
      "italic",
      "text-emerald-600"
    );

    // enclosing the imdb rating into a box
    const imdb_div = document.createElement("div");
    imdb_div.classList.add("border-2", "border-red-500", "flex", "h-[2rem]");

    // IMDB rating by genrating random numbers
    const imdb_rating_text = document.createElement("span");
    imdb_rating_text.textContent = "IMDB: ";
    imdb_rating_text.classList.add(
      "text-sm",
      "italic",
      "text-emerald-600",
      "font-semibold",
      "flex",
      "justify-start"
    );

    const imdb_rating_randomNumbers = document.createElement("span");
    imdb_rating_randomNumbers.textContent = Math.round(Math.random() * 10);
    imdb_rating_randomNumbers.classList.add("text-sm", "text-emerald-600");

    imdb_div.append(imdb_rating_text, imdb_rating_randomNumbers);

    headingTag.textContent = "List of Movies";

    posterDetailsDiv.append(
      pTag_movie_title,
      spanTag_releaseDate_text,
      spanTag_releaseDate_from_API,
      imdb_div
    );

    posterMainDiv.append(posterImageDiv, posterDetailsDiv);
    posterSubContainer.append(posterMainDiv);
  });
}

// adding click event for clear search icon to remove the movies once clicked
clearSearch.addEventListener("click", function () {
  // posterSubContainer.innerHTML = "";
  // recommendedMovieSubContainer.innerHTML = "";
  // headingTag.textContent = "";
  // recommendedHeading.textContent = "";
  searchBar.value = null;
});

// function to show recommended movies in UI
function recommendedMovies(recommendedMovies) {
  recommendedMovieSubContainer.innerHTML = "";
  // console.log(recommendedMovies);
  setTimeout(function () {
    recommendedMovies?.forEach(function (recommendMovieObject, index) {
      const recommendMainDiv = document.createElement("div");
      const recommendImageDiv = document.createElement("div");
      const recommendDetailsDiv = document.createElement("div");

      recommendMainDiv.classList.add(
        "border-2",
        "border-red-500",
        "h-full",
        "flex",
        "flex-col",
        "justify-between",
        "rounded-lg",
        "shadow-xl"
      );
      recommendImageDiv.classList.add(
        "border-2",
        "border-blue-500",
        "h-60",
        "rounded-lg"
      );
      recommendDetailsDiv.classList.add(
        "border-2",
        "border-green-500",
        "h-40",
        "rounded-lg",
        "px-2",
        "bg-slate-100",
        "relative"
      );

      // image tag for recommended movie
      const imgTag = document.createElement("img");
      imgTag.src = recommendMovieObject.Poster;
      imgTag.classList.add("h-full", "w-full", "rounded-lg");
      recommendImageDiv.append(imgTag);

      // recommended movie title
      const pTag_movie_title = document.createElement("p");
      pTag_movie_title.textContent = recommendMovieObject.Title;
      pTag_movie_title.classList.add(
        "font-bold",
        "italic",
        "text-fuchsia-600",
        "text-lg"
      );

      // release date of recommended movie
      const spanTag_releaseDate_text = document.createElement("span");
      spanTag_releaseDate_text.textContent = "RELEASE DATE: ";
      spanTag_releaseDate_text.classList.add(
        "text-sm",
        "italic",
        "text-fuchsia-600"
      );

      const spanTag_releaseDate_from_API = document.createElement("span");
      spanTag_releaseDate_from_API.textContent = recommendMovieObject.Year;
      spanTag_releaseDate_from_API.classList.add(
        "text-sm",
        "italic",
        "text-emerald-600"
      );

      // enclosing the imdb rating into a box
      const imdb_div = document.createElement("div");
      imdb_div.classList.add("border-2", "border-red-500", "flex", "h-[2rem]");

      // IMDB rating by genrating random numbers
      const imdb_rating_text = document.createElement("span");
      imdb_rating_text.textContent = "IMDB: ";
      imdb_rating_text.classList.add(
        "text-sm",
        "italic",
        "text-emerald-600",
        "font-semibold",
        "flex",
        "justify-start"
      );

      const imdb_rating_randomNumbers = document.createElement("span");
      imdb_rating_randomNumbers.textContent = Math.round(Math.random() * 10);
      imdb_rating_randomNumbers.classList.add("text-sm", "text-emerald-600");

      imdb_div.append(imdb_rating_text, imdb_rating_randomNumbers);

      // condition to check if IMDB rating is greater than 3, then show the movie posters
      if (imdb_rating_randomNumbers.textContent >= 3) {
        recommendedHeading.textContent = "Recommended Movies";

        recommendDetailsDiv.append(
          pTag_movie_title,
          spanTag_releaseDate_text,
          spanTag_releaseDate_from_API,
          imdb_div
        );

        recommendMainDiv.append(recommendImageDiv, recommendDetailsDiv);
        recommendedMovieSubContainer.append(recommendMainDiv);
      }
    });
  }, 3000);
}
