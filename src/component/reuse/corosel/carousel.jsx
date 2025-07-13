import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import banner from '../../../assets/banner.jpg';


const banners = [
  {
    src: banner,
    title: 'Discover Beauty',
    description: 'Explore our newest collection',
  },
  {
    src: banner,
    title: 'Summer Sale',
    description: 'Up to 50% off on selected items',
  },
  {
    src: banner,
    title: 'New Arrivals',
    description: 'Check out what’s trending now',
  },
  {
    src: banner,
    title: 'Limited Edition',
    description: 'Only available this season',
  }
];

function CarouselComponent() {
  const [index, setIndex] = useState(0);

  const handleSelect = useCallback((newIndex) => {
    setIndex(newIndex);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        height: { xs: 250, sm: 400, md: 500 },
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={banners[index].src}
        alt={banners[index].title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Caption */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: 30,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          px: 3,
          py: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {banners[index].title}
        </Typography>
        <Typography variant="body1">{banners[index].description}</Typography>
      </Box>

      {/* Navigation dots */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {banners.map((_, idx) => (
          <IconButton
            key={idx}
            onClick={() => handleSelect(idx)}
            size="small"
            sx={{ color: idx === index ? 'white' : 'grey.500' }}
          >
            <CircleIcon fontSize="inherit" />
          </IconButton>
        ))}
      </Stack>
    </Box>
  );
}

export default CarouselComponent;
