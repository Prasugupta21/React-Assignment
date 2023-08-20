import React, { useState } from 'react';
import {
  Checkbox,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Department } from './models'; // Import the Department and SubDepartment interfaces


interface DepartmentListProps {
  departments: Department[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments }) => {
  const [openDepartments, setOpenDepartments] = useState<number[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<number[]>([]);

  const handleDepartmentToggle = (departmentId: number) => {
    if (openDepartments.includes(departmentId)) {
      setOpenDepartments(openDepartments.filter((id) => id !== departmentId));
    } else {
      setOpenDepartments([...openDepartments, departmentId]);
    }
  };

  const handleSubDepartmentToggle = (subDepartmentId: number) => {
    if (selectedSubDepartments.includes(subDepartmentId)) {
      setSelectedSubDepartments(
        selectedSubDepartments.filter((id) => id !== subDepartmentId)
      );
    } else {
      setSelectedSubDepartments([...selectedSubDepartments, subDepartmentId]);
    }
  };

  const isParentSelected = (department: Department) => {
    return department.subDepartments.every((subDept) =>
      selectedSubDepartments.includes(subDept.id)
    );
  };

  return (
    <List>
      {departments.map((department) => (
        <div key={department.id}>
          <ListItemButton onClick={() => handleDepartmentToggle(department.id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={isParentSelected(department)}
                onChange={() =>
                  isParentSelected(department)
                    ? setSelectedSubDepartments((prev) =>
                        prev.filter((id) => !department.subDepartments.some((subDept) => id === subDept.id))
                      )
                    : setSelectedSubDepartments((prev) => [...prev, ...department.subDepartments.map((subDept) => subDept.id)])
                }
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <>
                  <Typography component="span">{department.name}</Typography>
                  <Typography component="span" sx={{fontSize: 'smaller',
  color: 'gray',marginLeft:1}}>
                    ({department.subDepartments.length})
                  </Typography>
                </>
              }
            />
            <ListItemIcon>
              {openDepartments.includes(department.id) ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
          </ListItemButton>
          <Collapse in={openDepartments.includes(department.id)}>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment) => (
                <ListItemButton key={subDepartment.id} sx={{marginLeft:3}}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedSubDepartments.includes(subDepartment.id)}
                      onChange={() => handleSubDepartmentToggle(subDepartment.id)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
