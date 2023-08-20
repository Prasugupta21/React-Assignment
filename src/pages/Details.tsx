import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import { Box } from '@mui/material';
import Tabel from '../components/Tabel';
import DepartmentList from '../components/DepartmentList';
import { Department } from '../components/models';

const transformDepartments = (data: any[]): Department[] => {
    return data.map((dept, index) => ({
      id: index + 1,
      name: dept.department,
      subDepartments: dept.sub_departments.map((subDept, subIndex) => ({
        id: (index + 1) * 100 + subIndex + 1,
        name: subDept,
      })),
    }));
  };
const Details: React.FC = () => { 
   const navigate=useNavigate();
   const location=useLocation();

  const userData = JSON.parse(localStorage.getItem('formData') || "{}");

 
  useEffect(() => {
    if (!userData.name || !userData.email || !userData.phone) {

    if (location.state && location.state.fromFormPage) {
        alert('Please enter your details before accessing this page.');
      }
      navigate('/');
    }
  }, [userData,location.state,navigate])
  

  if (!userData.name || !userData.email || !userData.phone) {
    return null;
  }

  const departmentsData = [
    {
      department: 'customer_service',
      sub_departments: ['support', 'customer_success'],
    },
    {
      department: 'design',
      sub_departments: ['graphic_design', 'product_design', 'web_design'],
    },
  ];
  const departments = transformDepartments(departmentsData);
return (
    <Box sx={{display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'}}>
<Tabel />
<DepartmentList  departments={departments} />
    </Box>


  )
}

export default Details