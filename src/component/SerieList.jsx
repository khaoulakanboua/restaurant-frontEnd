import React, { useState, useEffect } from "react";
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
import { Form, Input ,Modal} from "antd";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import city from '../city.png'

const SerieList = () => {
  const [series, setSeries] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalNom, setModalNom] = useState("");
  const [nom, setNom] = useState("");

  useEffect(() => {
    axios.get("https://restaurant-production-f803.up.railway.app/api/series/all").then((response) => {
      setSeries(response.data);
    });
  }, []);
  const save = (event) => {
    event.preventDefault();
    axios.post("https://restaurant-production-f803.up.railway.app/api/series/save", { nom }).then((response) => {
      const newSerie = response.data;
      setSeries([...series, newSerie]); // Add the new city to the existing list
      setNom(""); // Clear the input field
    });
  };
  const handleNomChange = (event) => {
    setNom(event.target.value);
  };
  const handleDelete = (id) => {
    setSelectedSerie(id);
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    axios.delete(`https://restaurant-production-f803.up.railway.app/api/series/delete/${selectedSerie}`).then(() => {
      setSeries(series.filter((item) => item.id !== selectedSerie));
    });

    setShowConfirmDialog(false);
  };

  const cancelDelete = () => {
    setSelectedSerie(null);
    setShowConfirmDialog(false);
  };

  const updateSerie = (id, newNom) => {
    let upForm = {
      id: selectedSerie.id,
      nom: newNom,
    };
    console.log("upForm ", upForm);
    return axios
      .put(`https://restaurant-production-f803.up.railway.app/api/series/${id}`, { nom: newNom })
      .then(() => {
        const updatedSeries = series.map((serie) => {
          if (serie.id === id) {
            return { ...serie, nom: newNom };
          }
          return serie;
        });
        setSeries(updatedSeries);
        form.resetFields();
        setOpen(false);
        return newNom; // Return the updated series name
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (record) => {
    form.setFieldsValue({ nom: record.nom }); // Set the initial value of the form field
    setSelectedSerie(record);
    setOpen(true);
  };

  const handleCancel = () => {
    setSelectedSerie(null);
    setOpen(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    setConfirmLoading(true);
    updateSerie(selectedSerie.id, modalNom).then((newNom) => {
      setModalNom(newNom); // Update modalNom state with the retrieved value
      setTimeout(() => {
        setConfirmLoading(false);
        setOpen(false);
      }, 1000);
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
            Gestion Serie
          </Typography>
          <Box component="form" onSubmit={save} noValidate sx={{ mt: 1 }}>
          <TextField
  margin="normal"
  required
  fullWidth
  name="nom"
  label="nom"
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
      {series.map((serie) => (
        <TableRow key={serie.id}>
          <TableCell component="th" scope="row">
            {serie.id}
          </TableCell>
          <TableCell align="right">{serie.nom}</TableCell>
          <TableCell align="center">
            <Button variant="outlined" color="error" onClick={() => handleDelete(serie.id)} sx={{ marginRight: '8px' }}>
              Delete
            </Button>
            <Button variant="outlined" onClick={() => handleUpdate(serie)} sx={{ marginRight: '8px', color: 'success.main' ,borderColor:'green'}}>
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
        message="Are you sure you want to delete this serie?"
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
        title="Modifier Serie"
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
            nom: selectedSerie?.nom,
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
            <Input onChange={(e) => setModalNom(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </TableContainer>
  );
};

export default SerieList;
