import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FaShopify } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
// import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to='/'>
      <ListItemIcon sx={{ color: 'inherit' }}>
        <LuLayoutDashboard />
      </ListItemIcon>
      <ListItemText primary='Principal' />
    </ListItemButton>
    <ListItemButton component={Link} to='/add-client'>
      <ListItemIcon sx={{ color: 'inherit' }}>
        <FaShopify />
      </ListItemIcon>
      <ListItemText primary='Alta Usuario' />
    </ListItemButton>
    <ListItemButton component={Link} to='/clients'>
      <ListItemIcon sx={{ color: 'inherit' }}>
        <BsFillPeopleFill />
      </ListItemIcon>
      <ListItemText primary='Buscar Usuario' />
    </ListItemButton>
  </React.Fragment>
);
