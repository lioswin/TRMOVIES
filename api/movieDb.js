import axios from 'axios';
import { apiKey } from '../constants';

// openAi endpoint
export const APiUrl = 'https://api.openai.com/v1/chat/completions';

// endpoints 
const ApiBaseUrl = `https://api.themoviedb.org/3`;
const trendingMoviesEndPoint = `${ApiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${ApiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${ApiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const authenticationEndPoint = `${ApiBaseUrl}/authentication/token/validate_with_login`;


// dynamic endpoints
const MovieDetailsEndPoint = id => `${ApiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const MovieCreditsEndPoint = id => `${ApiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndPoint = id => `${ApiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const searchMoviesEndPoint = `${ApiBaseUrl}/search/movie?api_key=${apiKey}`;

const PersonDetailsEndPoint = id => `${ApiBaseUrl}/person/${id}?api_key=${apiKey}`;
const PersonMoviesEndPoint = id => `${ApiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
    }
}

const loginCall = async (endpoint, params) => {
    const options = {

    }
}



export const authenticateUser = async (loginData) => {
    try {
      const response = await axios.post(authenticationEndPoint, loginData, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        }
      });
  
      console.log(response.data);
      // Add your own login logic here
    } catch (error) {
      console.error(error);
    }
  }


export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndPoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndPoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndPoint);
}

export const fetchMovieDetails = id => {
    return apiCall(MovieDetailsEndPoint(id));
}

export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndPoint(id));
}

export const fetchMovieCredits = id => {
    return apiCall(MovieCreditsEndPoint(id));
}

export const fetchPersonDetails = id => {
    return apiCall(PersonDetailsEndPoint(id));
}

export const fetchPersonMovies = id => {
    return apiCall(PersonMoviesEndPoint(id));
}

export const SearchMovies = params => {
    return apiCall(searchMoviesEndPoint, params);
}