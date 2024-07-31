import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getMovies = () => {
  return axios.get(`${API_URL}/movies`);
};

export const getMovie = (id) => {
  return axios.get(`${API_URL}/movies/${id}`);
};

export const createMovie = (movie) => {
  return axios.post(`${API_URL}/movies`, movie);
};

export const updateMovie = (id, movie) => {
  return axios.put(`${API_URL}/movies/${id}`, movie);
};

export const deleteMovie = (id) => {
  return axios.delete(`${API_URL}/movies/${id}`);
};
