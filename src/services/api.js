import axios from 'axios';

export const getFilms = () => {
  return axios.get(`https://swapi.co/api/films`);
};
export const getFilmsDetails = id => {
  return axios.get(`https://swapi.co/api/films/${id}/`);
};

export const getPeople = page => {
  return axios.get(`https://swapi.co/api/people/?page=${page}`);
};
export const getPeopleDetails = id => {
  return axios.get(`https://swapi.co/api/people/${id}`);
};

export const getPlanets = page => {
  return axios.get(`https://swapi.co/api/planets/?page=${page}`);
};
export const getPlanetsDetails = id => {
  return axios.get(`https://swapi.co/api/planets/${id}`);
};

export const getSpecies = page => {
  return axios.get(`https://swapi.co/api/species/?page=${page}`);
};
export const getSpeciesDetails = id => {
  return axios.get(`https://swapi.co/api/species/${id}`);
};

export const getStarships = page => {
  return axios.get(`https://swapi.co/api/starships/?page=${page}`);
};
export const getStarshipsDetails = id => {
  return axios.get(`https://swapi.co/api/starships/${id}`);
};

export const getVehicles = page => {
  return axios.get(`https://swapi.co/api/vehicles/?page=${page}`);
};

export const getVehiclesDetails = id => {
  return axios.get(`https://swapi.co/api/vehicles/${id}`);
};
export const getSearch = (path, query) => {
  return axios.get(`https://swapi.co/api${path}/?search=${query}`);
};
export const getData = url => {
  return axios.get(url);
};
