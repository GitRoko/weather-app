import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export const MoreMenu = () => {
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
      <IconButton
        aria-label="more"
        id="More-button"
        aria-controls={open ? 'More-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="More-menu"
        MenuListProps={{
          'aria-labelledby': 'More-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
          <MenuItem onClick={handleClose}>
            <Button
              onClick={() => {
                console.log('clicked ADD');
              }}
             variant="text"
             startIcon={<AddIcon />}
            >
              ADD
            </Button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
          <Button
              onClick={() => {
                console.log('clicked DELETE');
              }}
             variant="text"
             startIcon={<DeleteIcon />}
            >
              DELETE
            </Button>
          </MenuItem>
      </Menu>
    </div>
  );
}
