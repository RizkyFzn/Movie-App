import axios from 'axios';

const apiKey = process.env.REACT_APP_APIKEY;
const baseUrl = process.env.REACT_APP_BASEURL;

export const getMovieList = async () => {
  const movie = await axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}`);
  return movie.data.results;
};

export const searchMovie = async (q) => {
  const search = await axios.get(`${baseUrl}/search/movie?query=${q}&api_key=${apiKey}`);
  return search.data;
};

export const getDetailMovie = async (id) => {
  const detail = await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
  return detail.data;
};

export const recommendMovies = async (id) => {
  const recommended = await axios.get(`${baseUrl}/movie/movie_id=${id}&api_key=${apiKey}`);
  console.log(recommended);
};
