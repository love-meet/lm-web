import React from 'react';
import { useNavigate } from 'react-router-dom';
import GamesHub from './Hub';

export default function GamesHubWrapper() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return <GamesHub onClose={handleClose} />;
}
