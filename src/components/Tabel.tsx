import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Post } from './models';
import { Box } from '@mui/material';

const DataTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];

  return (
    <Box sx={{ height: 400, width: '60%',marginBottom:15, overflow: 'hidden',marginTop:8}}>
        <h2 style={{textAlign:'center'}} >Data</h2>
      <DataGrid  rows={posts} columns={columns}  />
    </Box>
  );
};

export default DataTable;
