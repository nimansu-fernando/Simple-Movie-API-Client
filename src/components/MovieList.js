import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../api';
import axios from 'axios';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions, CardMedia } from '@mui/material';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMovies();
      const moviesWithPosters = await Promise.all(
        result.data.map(async (movie) => {
          const posterUrl = await fetchMoviePoster(movie.Title);
          return { ...movie, posterUrl };
        })
      );
      setMovies(moviesWithPosters);
    };
    fetchData();
  }, []);

  const fetchMoviePoster = async (title) => {
    const API_KEY = '2f6435d9'; // Free OMDb API key
    try {
      const response = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`);
      return response.data.Poster !== 'N/A' ? response.data.Poster : 'https://via.placeholder.com/140x140';
    } catch (error) {
      console.error('Error fetching movie poster:', error);
      return 'https://via.placeholder.com/140x140';
    }
  };

  return (
    <Container sx={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Movies
      </Typography>
      
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item key={movie.Id} xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
              <CardMedia
                component="img"
                height="140"
                image={movie.posterUrl}
                alt={movie.Title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.Synopsis.substring(0, 100)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" component={Link} to={`/movies/${movie.Id}`}>
                  View
                </Button>
                <Button size="small" color="primary" component={Link} to={`/movies/edit/${movie.Id}`}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieList;
