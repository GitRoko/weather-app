import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export const MoreMenu = ({
  searchResult,
  setPlaces,
  places,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = () => {
    if (places.length === 0) {
      setPlaces([...places, searchResult]);
    } else {
      const isUniquePlace = places.find(place => place.description === searchResult.description);

      if (!isUniquePlace) {
        setPlaces([...places, searchResult]);
      }
    }
  };

  const handleDelete = () => {
    const filteredPlaces = places.filter(place => place.description !== searchResult.description);
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
            onClick={handleAdd}
            variant="text"
            startIcon={<AddIcon />}
          >
            ADD
          </Button>
        </MenuItem>
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
