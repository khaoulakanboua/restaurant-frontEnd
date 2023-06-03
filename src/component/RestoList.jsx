import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const RestoList = () => {
  const [restos, setRestos] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteRestaurantId, setDeleteRestaurantId] = useState(null);

  useEffect(() => {
    axios.get("/api/resto/all").then((response) => {
      setRestos(response.data);
    });
  }, []);

  const handleDeleteConfirmationOpen = (id) => {
    setDeleteRestaurantId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteRestaurantId(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`/api/resto/delete`, {
        data: { id: deleteRestaurantId }
      })
      .then(() => {
        setRestos(restos.filter((restaurant) => restaurant.id !== deleteRestaurantId));
        setDeleteConfirmationOpen(false);
      });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const CenteredTableContainer = styled(TableContainer)({
    display: 'flex',
    justifyContent: 'center',
  });
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Button
        href="/addResto"
        className="btn btn-primary"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Ajouter Restaurant
      </Button>
      <CenteredTableContainer component={Paper}>

      <Table sx={{ width: '70%', borderColor: 'black' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ background: '#f1f1f1' }}>
              <Typography variant="h6">Id</Typography>
            </TableCell>
            <TableCell align="right" sx={{ background: '#f1f1f1' }}>
              <Typography variant="h6">Nom</Typography>
            </TableCell>
            <TableCell align="right" sx={{ background: '#f1f1f1' }}>
              <Typography variant="h6">Adresse</Typography>
            </TableCell>
            <TableCell align="right" sx={{ background: '#f1f1f1' }}>
              <Typography variant="h6">Zone</Typography>
            </TableCell>
            <TableCell align="right" sx={{ background: '#f1f1f1' }}>
              <Typography variant="h6">Serie</Typography>
            </TableCell>
            <TableCell align="right" sx={{ background: '#f1f1f1' }}>
              <Typography variant="h6">Image</Typography>
            </TableCell>
            <TableCell align="center" sx={{ background: '#f1f1f1', textAlign: 'center' }}>
              <Typography variant="h6">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restos.map((resto) => (
            <TableRow key={resto.id}>
              <TableCell component="th" scope="row">
                {resto.id}
              </TableCell>
              <TableCell align="right">{resto.nom}</TableCell>
              <TableCell align="right">{resto.adresse}</TableCell>
              <TableCell align="right">{resto.zone && resto.zone.nom}</TableCell>
              <TableCell align="right">{resto.serie && resto.serie.nom}</TableCell>
              <TableCell align="right">
                {resto.image && <img src={resto.image} style={{ height: '100px', width: '100px' }} />}
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteConfirmationOpen(resto.id)}
                  sx={{ marginRight: '8px' }}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/editresto/${resto.id}`}
                  sx={{ marginRight: '8px' }}
                  color="success"
                >
                  Update
                </Button>
                <Button variant="outlined" component={Link} to={`/map/${resto.id}`} sx={{ marginRight: '8px' }}>
                  Map
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CenteredTableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Delete Restaurant</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this restaurant?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default RestoList;
