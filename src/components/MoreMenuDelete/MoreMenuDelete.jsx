import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export const MoreMenuDelete = ({
  miniCardPlace,
  setPlaces,
  miniCardPlaces,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log('places - ', miniCardPlaces);
    const filteredPlaces = miniCardPlaces.filter(place => place.description !== miniCardPlace.description);
    setPlaces(filteredPlaces);
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
            onClick={handleDelete}
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
