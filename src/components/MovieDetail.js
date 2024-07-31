import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie, deleteMovie } from '../api';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMovie(id);
      setMovie(result.data);
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    await deleteMovie(id);
    navigate('/');
  };

  if (!movie) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {movie.Title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {movie.Synopsis}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Runtime:</strong> {movie.Runtime} minutes
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Year:</strong> {movie.Year}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Director:</strong> {movie.Director}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Country:</strong> {movie.Country}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Cast:</strong> {movie.Cast.join(', ')}
      </Typography>
      <Typography variant="body2" gutterBottom>
        <strong>Genre:</strong> {movie.Genre.join(', ')}
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={() => navigate(`/movies/edit/${id}`)}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ ml: 2 }}>
          Delete
        </Button>
      </Box>
    </Container>
  );
};

export default MovieDetail;
