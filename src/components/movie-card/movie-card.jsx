import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {

  constructor() {
    super();

    this.state = {
      FavoriteMovies: []
    };
  }

  onAddFavorite = (movie) => {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.post(
      ` https://intense-ridge-76926.herokuapp.com//users/${Username}/movies/${movie._id}`,
      {
        FavoriteMovies: this.state.FavoriteMovies
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies
        });
        console.log(response);
        alert("Movie Added");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie, onAddFavorite } = this.props;

    return (
      <Card id="main-card">
        <Card.Img id="cover_img" variant="top" crossOrigin="anonymous" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="text-center">
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">{movie.Title}</Button>
            </Link></Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button variant="primary" value={movie._id} onClick={() => this.onAddFavorite(movie)}>Add to Favorite</Button>
        </Card.Footer>
      </Card>
    );
  }
}


MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired
};