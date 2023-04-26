import './App.css';
import {useState, useEffect} from "react";
import Header from './Header';
import Movie from './Movie';
import MovieDetails from './MovieDetails';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Profile from './Profile'
import {apiKey, baseUrl, posterPath} from "./info.js"
import defaultPoster from "./media/defaultPoster.png"
import closeIcon from "./media/close-icon.png"
import Caroussel from './Caroussel'

function App() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState('movie');
  const [currentSearch, setCurrentSearch] = useState("");
  const [movieDetails, setMovieDetails] = useState({active: false, id: null, visible: false});
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState('homepage')
  const [loadHomepage, setLoadHomepage] = useState(true)
  const [actionMovies, setActionMovies] = useState([])
  const [comedyMovies, setComedyMovies] = useState([])
  const [comedyTv, setComedyTv] = useState([])
  const [fantasyMovies, setFantasyMovies] = useState([])
  const [crimeMovies, setCrimeMovies] = useState([])
  const [dramaMovies, setDramaMovies] = useState([])
  const [dramaTv, setDramaTv] = useState([])
  const [animationTv, setAnimationTv] = useState([])
  const [documentaryTv, setDocumentaryTv] = useState([])
  const [mysteryTv, setMysteryTv] = useState([])
  const [serverConnection, setServerConnection] = useState(false)

  /**
   * Async function to activate server
   */
  async function activateServer(){
    // trying to fetch 3 times until the server is up and running
    for(let i = 0; i < 2; i++){
      const res = await fetch('https://movieapp-rget.onrender.com/user/Omar')
      const status = res.status
      if(status === 200){
        // server is up --> set state and break of the loop
        setServerConnection(true)
        break
      }
    }
  }


  useEffect(() => {
    /**
     * Activating server by sending multiple requests when the page loads until one is resolved
     */
    if(!serverConnection){
      activateServer()
    }
    /*
    Fetching movies and tv by genre to display on the homepage
    */
   if(loadHomepage){
      //Action movies
      fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=28`)
      .then(res => res.json())
      .then(data => {
        console.log("Action genre");
        console.log(data);
        setActionMovies(data.results);
      });
      // Comedy movies
      fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=35`)
      .then(res => res.json())
      .then(data => {
        console.log("comedy genre");
        console.log(data);
        setComedyMovies(data.results);
      });
      // Comedy Tv
      fetch(`${baseUrl}/discover/tv?api_key=${apiKey}&with_genres=35`)
      .then(res => res.json())
      .then(data => {
        console.log("comedy genre");
        console.log(data);
        setComedyTv(data.results);
      });
      // Comedy Tv
      fetch(`${baseUrl}/discover/tv?api_key=${apiKey}&with_genres=9648`)
      .then(res => res.json())
      .then(data => {
        console.log("mystery genre");
        console.log(data);
        setMysteryTv(data.results);
      });
      // Fantasy movies
      fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=14`)
      .then(res => res.json())
      .then(data => {
        console.log("fantasy genre");
        console.log(data);
        setFantasyMovies(data.results);
      });
      // Crime movies
      fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=80`)
      .then(res => res.json())
      .then(data => {
        console.log("crime genre");
        console.log(data);
        setCrimeMovies(data.results);
      });
      // Drama movies
      fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=18`)
      .then(res => res.json())
      .then(data => {
        console.log("drama genre");
        console.log(data);
        setDramaMovies(data.results);
      });
      // Drama Tv
      fetch(`${baseUrl}/discover/tv?api_key=${apiKey}&with_genres=18`)
      .then(res => res.json())
      .then(data => {
        console.log("drama genre");
        console.log(data);
        setDramaTv(data.results);
      });
      // Animation TV
      fetch(`${baseUrl}/discover/tv?api_key=${apiKey}&with_genres=16`)
      .then(res => res.json())
      .then(data => {
        console.log("Animation genre");
        console.log(data);
        setAnimationTv(data.results);
      });
      // Documentary TV
      fetch(`${baseUrl}/discover/tv?api_key=${apiKey}&with_genres=99`)
      .then(res => res.json())
      .then(data => {
        console.log("documentary genre");
        console.log(data);
        setDocumentaryTv(data.results);
      });
      setLoadHomepage(false)
    }
    if(currentPage === 'trending'){
      fetch(`${baseUrl}/trending/all/day?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        console.log("trending");
        console.log(data);
        setMovies(data.results);
      });
        setCurrentSearch("Trending")
        setCurrentPage('display')    
      }
    else if(currentPage === 'upcoming'){
      fetch(`${baseUrl}/${mode}/upcoming?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        console.log("upcoming");
        console.log(data);
        setMovies(data.results);
      });
      setCurrentSearch("Upcoming")
      setCurrentPage('display')    
    }
    else if(currentPage === 'topRated'){
      fetch(`${baseUrl}/${mode}/top_rated?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        console.log("top rated");
        console.log(data);
        setMovies(data.results);
      });
      setCurrentSearch("Top rated")
      setCurrentPage('display')    
    }
    else if(currentPage === 'popular'){
      fetch(`${baseUrl}/${mode}/popular?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        console.log("popular");
        console.log(data);
        setMovies(data.results);
        
      });
      setCurrentSearch("Popular")
      setCurrentPage('display')    
      
    }
    else if(search !== ''){
      console.log("in search")  
      fetch(`${baseUrl}/search/${mode}?api_key=${apiKey}&language=en-US&query=${search}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMovies(data.results);
      });
      setCurrentSearch(search)
      setSearch("")
      setCurrentPage('display')    
    } 
    else if(movieDetails.active){
      fetch(`${baseUrl}/${mode}/${movieDetails.id}/credits?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMovieDetails({...movieDetails, cast: data.cast, active: false, visible: true})
      })
    }
  }, [search, movieDetails, mode, currentPage, currentSearch, loadHomepage, serverConnection])

    const allMovies = movies.map(movie => {
      if (currentSearch === 'Trending'){
        if (movie.media_type === mode){
          return <Movie 
                    title = {movie.title !== undefined ? movie.title : movie.name}
                    poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                    id = {movie.id}
                    getMovieCast = {getMovieCast}
                    key = {movie.id}
                    genres = {movie.genre_ids}
                    movieList = "all"
                />
        }else {
          return ''
        }
      }else {
        return <Movie 
                    title = {movie.title !== undefined ? movie.title : movie.name}
                    poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                    id = {movie.id}
                    getMovieCast = {getMovieCast}
                    key = {movie.id}
                    genres = {movie.genre_ids}
                    movieList = "all"
                />
      } 
    });

    const actionMoviesList = actionMovies.map(movie => {
      return <Movie 
                  title = {movie.title !== undefined ? movie.title : movie.name}
                  poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                  id = {movie.id}
                  getMovieCast = {getMovieCast}
                  key = {movie.id}
                  genres = {movie.genre_ids}
                  movieList = "action"
              />
    })

    const comedyMoviesList = comedyMovies.map(movie => {
      return <Movie 
                  title = {movie.title !== undefined ? movie.title : movie.name}
                  poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                  id = {movie.id}
                  getMovieCast = {getMovieCast}
                  key = {movie.id}
                  genres = {movie.genre_ids}
                  movieList = "comedy"
              />
    })

    const comedyTvList = comedyTv.map(movie => {
      return <Movie 
                  title = {movie.title !== undefined ? movie.title : movie.name}
                  poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                  id = {movie.id}
                  getMovieCast = {getMovieCast}
                  key = {movie.id}
                  genres = {movie.genre_ids}
                  movieList = "comedy"
              />
    })

    const fantasyMoviesList = fantasyMovies.map(movie => {
      return <Movie 
                  title = {movie.title !== undefined ? movie.title : movie.name}
                  poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                  id = {movie.id}
                  getMovieCast = {getMovieCast}
                  key = {movie.id}
                  genres = {movie.genre_ids}
                  movieList = "fantasy"
              />
    })

    const crimeMoviesList = crimeMovies.map(movie => {
      return <Movie 
                  title = {movie.title !== undefined ? movie.title : movie.name}
                  poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                  id = {movie.id}
                  getMovieCast = {getMovieCast}
                  key = {movie.id}
                  genres = {movie.genre_ids}
                  movieList = "crime"
              />
    })

    const dramaMoviesList = dramaMovies.map(movie => {
      return <Movie 
                  title = {movie.title !== undefined ? movie.title : movie.name}
                  poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                  id = {movie.id}
                  getMovieCast = {getMovieCast}
                  key = {movie.id}
                  genres = {movie.genre_ids}
                  movieList = "drama"
              />
    })

    const dramaTvList = dramaTv.map(movie => {
      return <Movie 
                  title = {movie.title !== undefined ? movie.title : movie.name}
                  poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                  id = {movie.id}
                  getMovieCast = {getMovieCast}
                  key = {movie.id}
                  genres = {movie.genre_ids}
                  movieList = "drama"
              />
    })
    const animationTvList = animationTv.map(movie => {
      return <Movie 
                  title = {movie.title !== undefined ? movie.title : movie.name}
                  poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                  id = {movie.id}
                  getMovieCast = {getMovieCast}
                  key = {movie.id}
                  genres = {movie.genre_ids}
                  movieList = "animation"
              />
    })

    const documentaryTvList = documentaryTv.map(movie => {
      return <Movie 
                  title = {movie.title !== undefined ? movie.title : movie.name}
                  poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                  id = {movie.id}
                  getMovieCast = {getMovieCast}
                  key = {movie.id}
                  genres = {movie.genre_ids}
                  movieList = "documentary"
              />
    })

    const mysteryTvList = mysteryTv.map(movie => {
      return <Movie 
                  title = {movie.title !== undefined ? movie.title : movie.name}
                  poster = {movie.poster_path === null ? defaultPoster : posterPath + movie.poster_path}
                  id = {movie.id}
                  getMovieCast = {getMovieCast}
                  key = {movie.id}
                  genres = {movie.genre_ids}
                  movieList = "mystery"
              />
    })

  
    function searchMovies(text){
      if(text.trim() !== "")
        setCurrentPage('search')
        setSearch(text)
    }

    function toggleMode(){
      if (mode === "movie"){
        setMode("tv")
      } else {
        setMode("movie")
      }
      updateCurrentPage('trending')
    }

    function getMovieCast(id, movieList){
      console.log(id)
      console.log(movieList)
      let videoPath = ''
      let reviews = []
      let dbRating = 0.0
      let dbRatingCount = 0
      let dbRatingTotal = 0
      // Get movie trailer
      fetch(`${baseUrl}/${mode}/${id}/videos?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i<data.results.length; i++){
          if (data.results[i].type === "Trailer"){
            videoPath = `https://www.youtube.com/embed/${data.results[i].key}`
            break
          }
        }
        /**
         * fetching movie reviews from the DB
         */
        fetch(`https://movieapp-rget.onrender.com/movies/${id}`)
        .then(res => res.json())
        .then(data => {
          if(data !== null){
            console.log(data)
            reviews = data.reviews
            dbRating = data.rating
            dbRatingCount = data.ratingCount
            dbRatingTotal = data.ratingTotal
          }
          // setting array to search from and fetch movie details of the clicked movie
          let moviesArray = []
          switch (movieList){
            case "action":
              moviesArray = actionMovies
              break
            case "comedy":
              moviesArray = (mode === 'tv') ? comedyTv : comedyMovies
              break
            case "fantasy":
              moviesArray = fantasyMovies
              break
            case "crime":
              moviesArray = crimeMovies
              break
            case "drama":
              moviesArray = (mode === 'tv') ? dramaTv : dramaMovies 
              break
            case "documentary":
              moviesArray = documentaryTv
              break
            case "mystery":
              moviesArray = mysteryTv
              break
            case "animation":
              if(mode === 'tv')
                moviesArray = animationTv
              break
            default:
              moviesArray = movies
              break
          }
          for(let i = 0; i< moviesArray.length; i++){
            if (id === moviesArray[i].id){
              setMovieDetails({
                active: true,
                title: moviesArray[i].title !== undefined ? moviesArray[i].title : moviesArray[i].name,
                poster: moviesArray[i].poster_path === null ? defaultPoster : posterPath + moviesArray[i].poster_path,
                description: moviesArray[i].overview,
                date: moviesArray[i].release_date,
                rating: moviesArray[i].vote_average.toFixed(1),
                genres: moviesArray[i].genre_ids,
                video: videoPath,
                dbRating: dbRating.toFixed(1),
                dbRatingCount: dbRatingCount,
                dbRatingTotal: dbRatingTotal,
                reviews: reviews,
                id: id})
                break
            }
          }
        })        
      })
    }

    function removeMovieDetails(){
      setMovieDetails({active: false, id: null, visible: false})
    }

    function updateUserData(user){
      setUserData(user)
    }

    function updateCurrentPage(curr){
      setCurrentPage(curr)
    }

  return (
    <div className= "app-container">
      <Header 
        search = {searchMovies}
        toggleMode = {toggleMode}
        updateCurrentPage = {updateCurrentPage}
        mode = {mode}
        userData = {userData}
      />
      {!serverConnection && <div className="popupContainer">
                  <div className="popupWrapper">
                    <img className="close-icon" src={closeIcon} alt="close icon" onClick = {(e) => e.target.parentNode.parentNode.classList.add("hide")}></img>
                    <div className="loaderWrapper">
                    <div class="loader">
                      <div class="circle"></div>
                      <div class="circle"></div>
                      <div class="circle"></div>
                      <div class="circle"></div>
                    </div>
                      <p>Connecting to the Server and Database...</p>
                    </div>
                  </div>
        </div>}
      {movieDetails.visible && <MovieDetails
                                  hideDetails = {removeMovieDetails}
                                  movieDetails = {movieDetails}
                                  userData = {userData}
                                  updateCurrentPage = {updateCurrentPage}
                                  key = {movieDetails.id}
                              />
        }
        {/* Movies and Tvs by genres */}

        {(currentPage === 'homepage') && (mode === 'movie') && <h3 className="genre-header">Action</h3>}                               
        {(currentPage === 'homepage') && (mode === 'movie') && <Caroussel movieList = {actionMoviesList}/>}

        {(currentPage === 'homepage') && <h3 className="genre-header">Comedy</h3>}                               
        {(currentPage === 'homepage') && <Caroussel movieList = {(mode === 'tv' ? comedyTvList : comedyMoviesList)}/>}                                 

        {(currentPage === 'homepage') && <h3 className="genre-header">Drama</h3>}                               
        {(currentPage === 'homepage') && <Caroussel movieList = {(mode === 'tv' ? dramaTvList : dramaMoviesList)}/>}          

        {(currentPage === 'homepage') && (mode === 'movie') && <h3 className="genre-header">Fantasy</h3>}                               
        {(currentPage === 'homepage') && (mode === 'movie') && <Caroussel movieList = {fantasyMoviesList}/>}

        {(currentPage === 'homepage') && (mode === 'movie') && <h3 className="genre-header">Crime</h3>}                               
        {(currentPage === 'homepage') && (mode === 'movie') && <Caroussel movieList = {crimeMoviesList}/>}

        {(currentPage === 'homepage') && (mode === 'tv') && <h3 className="genre-header">Animation</h3>}                               
        {(currentPage === 'homepage') && (mode === 'tv') && <Caroussel movieList = {animationTvList}/>} 
        
        {(currentPage === 'homepage') && (mode === 'tv') && <h3 className="genre-header">Documentaries</h3>}                               
        {(currentPage === 'homepage') && (mode === 'tv') && <Caroussel movieList = {documentaryTvList}/>}
                                  
        {(currentPage === 'homepage') && (mode === 'tv') && <h3 className="genre-header">Mystery</h3>}                               
        {(currentPage === 'homepage') && (mode === 'tv') && <Caroussel movieList = {mysteryTvList}/>}


        {/* Movies and Tvs by type (trending, upcoming, top rated, search) */}
        {(currentPage === 'display') && movies.length !== 0 && <h2 id="movies-found">{(currentSearch === 'Trending' || currentSearch === 'Upcoming' || currentSearch === 'Top rated' || currentSearch === 'Popular')
                                                      ? `${currentSearch} ${mode === 'movie' ? 'Movies' : 'TV'}`
                                                        :`Results for ${currentSearch}`}</h2>}
        {(movies.length === 0) && (currentSearch !== "") && (currentPage === 'display') && <h2 id="no-movies">No results found for your search "{currentSearch}"</h2>}
        {(currentPage === 'display') && <div className="movies-container">
          {allMovies}
        </div>}
        {/* Sign in, sign up and profile pages */}
        {(currentPage === 'signIn') && <SignIn 
                        updateCurrentPage = {updateCurrentPage}
                        updateUserData = {updateUserData}/>}
        {(currentPage === 'signUp') && <SignUp  updateCurrentPage = {updateCurrentPage}/>}
        {(currentPage === 'profile') && <Profile 
                                          updateUserData = {updateUserData}
                                          updateCurrentPage = {updateCurrentPage}
                                          userData = {userData}/>}
    </div>
  );


}

export default App;
