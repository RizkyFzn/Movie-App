import { useEffect, useState } from 'react';
import './App.css';
import { getMovieList, searchMovie, getDetailMovie } from './api';

const App = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [movieDetail, setMovieDetail] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  let genre = [];

  useEffect(() => {
    getMovieList().then((res) => {
      setTopMovies(res);
    });
  }, []);

  const detailMovieHandler = async (id) => {
    const getDetail = await getDetailMovie(id);
    setMovieDetail(getDetail);
    setShowDetail(true);
  };

  const TopMovieList = () => {
    return topMovies.map((movie, i) => {
      return (
        <div key={i} className="w-1/4">
          <div className="shadow-2xl p-5 text-center bg-stone-100 rounded-md overflow-hidden">
            <div className="font-bold font text-xl">{movie.title}</div>
            <img className="mx-auto my-6" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt="img" />
            <div className="italic font-medium">{movie.release_date}</div>
            <div className="rounded-full bg-slate-800 max-w-fit p-3 font-bold font-sans text-stone-50 text-xl">{movie.vote_average}</div>
            <button className="bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-2 rounded-md font-bold text-white" onClick={() => detailMovieHandler(movie.id)}>
              Detail
            </button>
          </div>
        </div>
      );
    });
  };

  const search = async (keyword) => {
    if (keyword.length >= 3) {
      const query = await searchMovie(keyword);
      setTopMovies(query.results);
    }
  };

  const { title, tagline, release_date, overview, poster_path, genres } = movieDetail;

  return (
    <div>
      <header className="bg-neutral-800">
        <p className="text-6xl text-center pt-9 font-bold font-sans text-zinc-100">Movie</p>
        <input
          type="email"
          name="email"
          onChange={(e) => search(e.target.value)}
          className="mt-11 w-96 px-6 py-3 border shadow-md placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-md focus:ring-1 m-auto"
          placeholder="Search Movie..."
        />
        <div className="container mx-auto mt-20 justify-center items-center flex flex-wrap gap-9">
          <TopMovieList />
        </div>
      </header>

      {showDetail ? (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold">{title}</h3>
              </div>

              <div className="relative p-6 flex-auto">
                <img className="mx-auto my-3 h-48" src={`${process.env.REACT_APP_BASEIMGURL}/${poster_path}`} alt="img" />
                <p className="my-4 text-slate-500 text-md leading-relaxed italic">{tagline}</p>
                <p className="my-4 text-slate-500 text-md leading-relaxed">Release: {release_date}</p>
                <p className="my-4 text-slate-500 text-md leading-relaxed">
                  Genre : &nbsp;
                  {genres.map((genres, i) => {
                    return (
                      <>
                        <span key={i}>{genres.name}, &nbsp; </span>
                      </>
                    );
                  })}
                </p>
                {/* const genree = movieDetail.genres.map((genres) => <p>{genres.name}</p>);
  console.log(genree); */}
                <p className="mt-4 text-slate-500 text-md leading-relaxed">{overview}</p>
              </div>

              <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowDetail(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
