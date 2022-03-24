import React from 'react'
import { Card, Box, CardContent, CardMedia, Typography, IconButton } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'

export default function SpotifyCard() {
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

          <IconButton aria-label="play/pause">
            <PlayArrow sx={{ height: 38, width: 38 }} />
          </IconButton>
       
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
    </Card>
  )
}
