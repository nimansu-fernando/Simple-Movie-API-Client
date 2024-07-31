import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie, createMovie, updateMovie } from '../api';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    Id: '',
    Title: '',
    Runtime: '',
    Year: '',
    Director: '',
    Country: '',
    Cast: '',
    Genre: '',
    Synopsis: '',
  });

  useEffect(() => {
    if (isEditing) {
      const fetchData = async () => {
        const result = await getMovie(id);
        setFormData({
          Id: result.data.Id,
          Title: result.data.Title,
          Runtime: result.data.Runtime,
          Year: result.data.Year,
          Director: result.data.Director,
          Country: result.data.Country,
          Cast: result.data.Cast.join(', '),
          Genre: result.data.Genre.join(', '),
          Synopsis: result.data.Synopsis,
        });
      };
      fetchData();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      ...formData,
      Cast: formData.Cast.split(',').map((actor) => actor.trim()),
      Genre: formData.Genre.split(',').map((genre) => genre.trim()),
    };

    if (isEditing) {
      await updateMovie(id, movieData);
    } else {
      await createMovie(movieData);
    }

    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEditing ? 'Edit Movie' : 'Add Movie'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          name="Id"
          label="Id"
          value={formData.Id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="Title"
          label="Title"
          value={formData.Title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="Runtime"
          label="Runtime"
          value={formData.Runtime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="Year"
          label="Year"
          value={formData.Year}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="Director"
          label="Director"
          value={formData.Director}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="Country"
          label="Country"
          value={formData.Country}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="Cast"
          label="Cast"
          value={formData.Cast}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="Genre"
          label="Genre"
          value={formData.Genre}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="Synopsis"
          label="Synopsis"
          value={formData.Synopsis}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MovieForm;
