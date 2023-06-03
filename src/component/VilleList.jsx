import React, { useState, useEffect, useReducer } from "react";
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
import { ConfirmDialog } from "primereact/confirmdialog";
import { Form, Input,Modal } from "antd";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import { InputLabel } from "@mui/material";
import city from '../city.png';

const VilleList = () => {
  const [villes, setVilles] = useState([]);
  const [selectedVille, setSelectedVille] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [form] = Form.useForm();
  const [modalVille, setMv] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [nom, setNom] = useState("");
  const navigate = useNavigate();

 

  useEffect(() => {
    axios.get("https://restaurant-production-f803.up.railway.app/api/villes/").then((response) => {
      setVilles(response.data);
    });
  }, []);
  const save = (event) => {
    event.preventDefault();
    axios.post("/api/villes/save", { nom }).then((response) => {
      const newCity = response.data;
      setVilles([...villes, newCity]); // Add the new city to the existing list
      setNom(""); // Clear the input field
    });
  };
  
  const handleDelete = (id) => {
    setSelectedVille(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    axios.delete(`/api/villes/delete/${selectedVille}`).then(() => {
      setVilles(villes.filter((item) => item.id !== selectedVille));
    });

    setShowConfirmDialog(false);
  };

  const cancelDelete = () => {
    setSelectedVille(null);
    setShowConfirmDialog(false);
  };

  const handleUpdate = (ville) => {
    setSelectedVille(ville.id);
    form.setFieldsValue({ nom: ville.nom });
    setOpen(true);
  };
  

  const handleCancel = () => {
    setSelectedVille(null);
    setOpen(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    setConfirmLoading(true);
    updateVille(selectedVille, modalVille).then((newNom) => {
      setMv(newNom);
      setTimeout(() => {
        setConfirmLoading(false);
        setOpen(false);
      }, 1000);
    });
  };
  

  const updateVille = (id, newNom) => {
    let upForm = {
      id: selectedVille.id,
      nom: newNom,
    };
    return axios
      .put(`/api/villes/${id}`, { nom: newNom })
      .then(() => {
        const updatedVilles = villes.map((ville) => {
          if (ville.id === id) {
            return { ...ville, nom: newNom };
          }
          return ville;
        });
        setVilles(updatedVilles);
        form.resetFields();
        setOpen(false);
        return newNom;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleNomChange = (event) => {
    setNom(event.target.value);
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
            <img src={city} style={{width:'30px'}} />
            <br/>
          <Typography component="h1" variant="h5">
           Gestion Ville
          </Typography>
          <Box component="form" onSubmit={save} noValidate sx={{ mt: 1 }}>
          <TextField
  margin="normal"
  required
  fullWidth
  name="nom"
  label="Nom Ville"
  id="nom"
  autoFocus
  value={nom}
  onChange={handleNomChange}
  onKeyPress={(event) => {
    if (event.key === "Enter") {
      save(event);
    }
  }}
/>         
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ajouter
            </Button>
          </Box>
        </Box>
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
  <Table sx={{ width: '50%', borderColor: 'black' }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <TableCell sx={{ background: '#f1f1f1' }}>
          <Typography variant="h6">Id</Typography>
        </TableCell>
        <TableCell align="right" sx={{ background: '#f1f1f1' }}>
          <Typography variant="h6">Nom</Typography>
        </TableCell>
        <TableCell align="center" sx={{ background: '#f1f1f1', textAlign: 'center' }}>
          <Typography variant="h6">Actions</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {villes.map((ville) => (
        <TableRow key={ville.id}>
          <TableCell component="th" scope="row">
            {ville.id}
          </TableCell>
          <TableCell align="right">{ville.nom}</TableCell>
          <TableCell align="center">
            <Button variant="outlined" color="error" onClick={() => handleDelete(ville.id)} sx={{ marginRight: '8px' }}>
              Delete
            </Button>
            <Button variant="outlined" onClick={() => handleUpdate(ville)} sx={{ marginRight: '8px', color: 'success.main' ,borderColor:'green'}}>
              Update
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>




      <ConfirmDialog
        visible={showConfirmDialog}
        onHide={cancelDelete}
        message="Are you sure you want to delete this ville?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        acceptClassName="p-button-danger"
        acceptLabel="Yes"
        rejectLabel="No"
        accept={confirmDelete}
        reject={cancelDelete}
      />
      <Modal
        forceRender
        title="Modifier Ville"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            nom: selectedVille?.nom,
          }}
        >
          <Form.Item
            label="Nom"
            name="nom"
            rules={[
              {
                required: true,
                message: "Please input your nom!",
              },
            ]}
          >
            <Input onChange={(e) => setMv(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </TableContainer>
  );
};

export default VilleList;
