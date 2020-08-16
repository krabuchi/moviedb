import React from 'react';
import {Link} from 'react-router-dom';
import styles from './movieList.module.css';

import { CardDeck, Card } from 'react-bootstrap';

const MovieList = ({ data }) => {
    let movies = data.map( movie => {
        return (
            <Link key={movie.id} 
                to={`movie/${movie.id}`} 
                style={{textDecoration: 'none', color: '#111'}}
            >
                <li className={styles.li}>
                    <Card style={{ width: '15rem', margin: '1rem' }}>
                        <Card.Img 
                            variant="top" 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  
                            alt={movie.title}
                        />
                        <Card.Body>
                            <Card.Title>
                                <span className={styles.title}>{movie.title}</span> 
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </li>
            </Link>
    )});

    return (
        <ul className={styles.ul}>
            <CardDeck>
                {movies}
            </CardDeck>
        </ul>
    );
}
export default MovieList;