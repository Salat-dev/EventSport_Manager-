import React from 'react';


import { 
  Button,
  List, 
  ListItem,
  Typography,
  Stack,
  Snackbar,
} from '@mui/material';

import CheckBoxIcon  from '@mui/icons-material/CheckBox';
import   CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';

const SnackbarCloseReason =() => {
  const [open, setOpen] = React.useState(false);
  const [reasons, setReasons] = React.useState([]);
  React.useEffect(() => {
    if (
      ['timeout', 'clickaway', 'escapeKeyDown'].every((item) =>
        reasons.includes(item),
      )
    ) {
      setOpen(false);
    }
  }, [reasons]);
  return (
    <div>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => {
          setOpen(true);
        }}
      >
        Show snackbar
      </Button>
      <Snackbar
        autoHideDuration={3000}
        open={open}
        onClose={(event, reason) => {
          setReasons((prev) => [...new Set([...prev, reason])]);
        }}
        onUnmount={() => {
          setReasons([]);
        }}
        sx={{ minWidth: 360 }}
      >
        <Stack spacing={0.5}>
          <Typography level="title-md">
            To close this snackbar, you have to:
          </Typography>
          <List size="sm">
            <ListItem>
              {reasons.includes('timeout') ? (
                <CheckBoxIcon color="success" />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}{' '}
              Wait for 3 seconds.
            </ListItem>
            <ListItem>
              {reasons.includes('clickaway') ? (
                <CheckBoxIcon color="success" />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}{' '}
              Click outside of the snackbar.
            </ListItem>
            <ListItem>
              {reasons.includes('escapeKeyDown') ? (
                <CheckBoxIcon color="success" />
              ) : (
                <CheckBoxOutlineBlankIcon />
              )}{' '}
              Press ESC key.
            </ListItem>
          </List>
        </Stack>
      </Snackbar>
    </div>
  );
}
export default  SnackbarCloseReason;