import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function DropdownMenu({options=[], children}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        id="dropdown-menu-button"
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {children}
      </div>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dropdown-menu-button',
         
        }}
        sx={{
          '& .MuiMenu-paper': {
            background: '#32495d',
            borderRadius: 5,
            width: '170px',
            marginTop: '8px',
            border: '4px solid #1d3244e0'
          }
        }}
      >
        {Object.values(options).map((opt, idx) => (
            <MenuItem key={idx} 
              sx={{
                padding: '10px 20px',
                color: '#eee',
                fontWeight: opt.action ? 'bold' : '500',
                borderBottom: idx !== options.length - 1 && '1px solid #dcb',
                '&:hover': {color: opt.action && '#ddd425'}
              }}
              onClick={() => {
              if (opt.action) opt.action()
              handleClose()
            }}>
              {opt.element}
            </MenuItem>
        ))}
      </Menu>
    </div>
  );
}