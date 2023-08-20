import React from 'react';
import Form from './components/Form';
import { Box } from '@mui/material';
import {  Route, Routes } from 'react-router';

import SecondPage from './pages/SecondPage';

const App: React.FC = () => {
 
  return (
  <Box>
    <Routes>
      <Route path='/' element={<Form />}/>
     
      <Route path='/second-page' element={<SecondPage />}/>
     
    </Routes>
  </Box>

  );
};

export default App;
