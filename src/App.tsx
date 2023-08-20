import React from 'react';
import Form from './components/Form';
import { Box } from '@mui/material';
import {  Route, Routes } from 'react-router';

import { Details } from '@mui/icons-material';

const App: React.FC = () => {
 
  return (
  <Box>
    <Routes>
      <Route path='/' element={<Form />}/>
     
      <Route path='/details' element={<Details />}/>
     
    </Routes>
  </Box>

  );
};

export default App;
