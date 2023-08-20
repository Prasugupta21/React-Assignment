import React, { useState } from 'react';
import { Button, TextField, Typography,Container,Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import {useNavigate} from 'react-router-dom'

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
};

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
const navigate=useNavigate();
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    if (formData.name && formData.email && formData.phone) {
      console.log('Form submitted:', formData);
      localStorage.setItem("formData",JSON.stringify(formData));
      navigate('/details');


    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Box sx={{padding:10}}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 5 }}>
        Sign In
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Box sx={{ width: '25rem' }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
       />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary" sx={{marginTop:4,marginLeft:19}}
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
        </Box>
      </form>
      </Box>
    </Container>
    
  );
};

export default Form;
