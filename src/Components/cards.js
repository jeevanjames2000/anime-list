import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const TopAiringAnime = () => {
  const [topAiringAnime, setTopAiringAnime] = useState([]);

  useEffect(() => {
    const fetchTopAiringAnime = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing');
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setTopAiringAnime(data.data.slice(0, 5));
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching top airing anime:', error);
      }
    };

    fetchTopAiringAnime();
  }, []);

  return (

    <Grid container >
      <Grid item container xs={12} justifyContent={'space-between'}>

        <Typography variant="h3">
          Trending Top 5 Anime
        </Typography>
      </Grid>
      <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
        {topAiringAnime.map((anime) => (
          <Card key={anime.mal_id} sx={{ marginBottom: '2rem' }}>
            <CardContent >
              <Typography variant='h5'>
                {anime.title}
              </Typography>
              <Typography variant='h5'>
                Rating: {anime.score}
              </Typography>
              <Typography variant='h5'>
                Episodes: {anime.episodes}
              </Typography>
              <figure >
                <img src={anime.images?.jpg?.image_url} alt={anime.title} style={{ maxWidth: '100%', borderRadius: '10px' }} />
              </figure>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>

  );
};

export default TopAiringAnime;
