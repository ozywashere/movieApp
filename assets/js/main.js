const preloader = document.querySelector('[data-loader]')
window.addEventListener('load ', () => {
  preloader.classList.add('remove')
})
const navbar = document.querySelector('[data-navbar]')
window.addEventListener('scroll', () => {
  navbar.classList[window.scrollY > 200 ? 'add' : 'remove']('active')
})
const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=05135f9cbcad7eb8b5d839b4208a91b0'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=05135f9cbcad7eb8b5d839b4208a91b0&query="'

const form = document.querySelector('[data-form]')
const search = document.querySelector('[data-search]')
const main = document.querySelector('[data-item]')

const getMovies = async (url) => {
  const res = await fetch(url)
  const data = await res.json()
  showMovies(data.results)
}
getMovies(API_URL)
const showMovies = (movies) => {
  main.innerHTML = ''
  movies.map((movie) => {
    const { title, poster_path, vote_average, overview } = movie
    const movieEl = document.createElement('div')
    movieEl.classList.add('app-list-item')
    movieEl.innerHTML = `<div class="movie">
                            <img src="${
                              IMG_PATH + poster_path
                            }" class="movie-img" height="400" >
                            <div class="movie-img-overlay">
                                <div class="movie-info">
                                    <h1 class="movie-title">
                                      ${title}
                                    </h1>
                                    <span class="movie-rating ${getClassByRate(
                                      vote_average
                                    )}">
                                       ${vote_average}
                                    </span>
                                </div>
                                <p class="movie-text">
                                    ${overview}
                                </p>
                            </div>
                        </div>
    `
    main.appendChild(movieEl)
  })
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'success'
  } else if (vote >= 5) {
    return 'warning'
  } else {
    return 'danger'
  }
}
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchTerm = search.value
  console.log(searchTerm)
  if (searchTerm && search !== '') {
    getMovies(SEARCH_API + searchTerm)
    search.value = ''
  } else {
    window.location.reload()
  }
})
