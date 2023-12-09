import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

const TopAiringAnime = ({ topAiringAnime, filteredAnime }) => {

  return (

    <Grid container >

      <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>

        {filteredAnime.map((anime) => (
          <Card key={anime.mal_id} sx={{ marginBottom: '2rem' }}>
            <CardContent>
              <Typography variant='h5'>{anime.title}</Typography>
              <Typography variant='h5'>Rating: {anime.score}</Typography>
              <Typography variant='h5'>Episodes: {anime.episodes}</Typography>
              <figure>
                <img
                  src={anime.images?.jpg?.image_url}
                  alt={anime.title}
                  style={{ maxWidth: '100%', borderRadius: '10px' }}
                />
              </figure>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>

  );
};

export default TopAiringAnime;
