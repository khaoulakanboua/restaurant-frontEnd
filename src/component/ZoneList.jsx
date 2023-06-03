import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Space, Popconfirm, Modal, Form, Input } from "antd";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import PublicIcon from "@mui/icons-material/Public";
import { InputLabel } from "@mui/material";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import city from '../city.png'

const ZoneList = () => {
  const [zones, setZones] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [villes, setVilles] = useState([]);
  const [allV, setAllV] = useState([]);
  const [nom, setNom] = useState("");

  // Modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalVille, setModalVille] = useState("");
  const [selectedAgence, setSelectedAgence] = useState(null);
  const [vl, setVl] = useState("");
  const [v, setV] = useState("");
  const [villeId, setVilleId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/zones/all`);
      setZones(result.data);
    };
    fetchData();
  }, [villeId]);

  const handleChange = (event) => {
    const selectedVille = event.target.value;
    setVl(selectedVille);
    setVilleId(selectedVille); // Met à jour la valeur de la ville sélectionnée
  };

  useEffect(() => {
    const fetchCities = async () => {
      const result = await axios(`/api/villes/`);
      setVilles(result.data);
    };
    fetchCities();
  }, []);

  const handleDelete = (zoneId) => {
    // Open confirmation dialog before deleting the zone
    Modal.confirm({
      title: "Are you sure you want to delete this zone?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios.delete(`https://restaurant-production-f803.up.railway.app/api/zones/delete/${zoneId}`).then(() => {
          setZones(zones.filter((zone) => zone.id !== zoneId));
        });
      },
      onCancel() {
        // Do nothing if canceled
      },
    });
  };

  const save = (event) => {
    event.preventDefault();
    axios
      .post("https://restaurant-production-f803.up.railway.app/api/zones/save", {
        nom,
        ville: {
          id: villeId,
        },
      })
      .then((response) => {
        //onZoneAdded(response.data);
        setNom("");
        setVilleId("");
      });
  };

  // Rest of the code...
  const handleNomChange = (event) => {
    setNom(event.target.value);
  };
  const updateZone = (id, newNom) => {
    const updatedZone = {
      id: selectedAgence.id,
      nom: newNom,
      ville: {
        id: modalVille,
      },
    };

    return axios
      .put(`https://restaurant-production-f803.up.railway.app/api/zones/update/${id}`, updatedZone)
      .then(() => {
        form.resetFields();
        setOpen(false);
        // Update the zones state with the updated zone
        setZones((prevZones) =>
          prevZones.map((zone) =>
            zone.id === id ? { ...zone, nom: newNom } : zone
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    setConfirmLoading(true);
    const newNom = form.getFieldValue("nom");
    updateZone(selectedAgence.id, newNom)
      .then(() => {
        setConfirmLoading(false);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setSelectedAgence(null);
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    axios.get(`https://restaurant-production-f803.up.railway.app/api/villes/`).then((res) => {
      setAllV(res.data);
    });
  }, []);

  const handleUpdate = (record) => {
    form.setFieldsValue({ nom: record.nom }); // Set the initial value of the form field
    setSelectedAgence(record);
    setModalVille(record.ville.id); // Set the initial value of the combobox
    setOpen(true);
  };

  const handleModalVilleChange = (e) => {
    setModalVille(e.target.value);
  };

  const handleOpenModal = (zone) => {
    setSelectedZone(zone);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedZone(null);
    setModalIsOpen(false);
  };

  const handleSave = () => {
    handleCloseModal();
  };

  return (
    <div>
      {/* ... */}
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
            Gestion Zone
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
  value={nom} // Ajoutez la valeur de l'état nom ici
  onChange={handleNomChange} // Appel de la fonction handleNomChange lorsqu'il y a un changement dans le champ de texte
/>
            <FormControl fullWidth style={{ marginTop: 17 }}>
              <InputLabel id="demo-simple-select-label">Villes</InputLabel>
              <Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={vl}
  label="villes"
  onChange={handleChange}
>
  {allV?.map((item) => (
    <MenuItem key={item.id} value={item.id}>
      {item.nom}
    </MenuItem>
  ))}
</Select>

            </FormControl>
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
      <table className="table" style={{ width: '800px' }}>
        <thead>
          <tr>
            <th style={{ background: '#f1f1f1' }}>ID</th>
            <th style={{ background: '#f1f1f1' }}>Name</th>
            <th style={{ background: '#f1f1f1' }}>Ville</th>
            <th style={{ background: '#f1f1f1' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone.id}>
              <td>{zone.id}</td>
              <td>{zone.nom}</td>
              <td>{zone.ville && zone.ville.nom}</td>
              <td>
                <Popconfirm
                  title="Are you sure you want to delete this zone?"
                  onConfirm={() => handleDelete(zone.id)}
                  okText="Yes"
                  cancelText="No"
                >
<Button variant="outlined" color="error"  sx={{ marginRight: '8px' }}>
              Delete
            </Button>                </Popconfirm>
                
                <Button variant="outlined" onClick={() => handleUpdate(zone)} sx={{ marginRight: '8px', color: 'success.main' ,borderColor:'green'}}>
              Update
            </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Modal
        forceRender
        title="Modifier Zone"
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
            onClick={form.submit}
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            nom: selectedAgence?.nom,
            ville: selectedAgence?.ville,
          }}
        >
          <Form.Item
            label="Nom"
            name="nom"
            rules={[
              {
                required: true,
                message: "Please input your code!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <InputLabel id="demo-simple-select-label">Villes</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={modalVille}
            label="villes"
            onChange={handleModalVilleChange}
          >
            {allV?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
              </MenuItem>
            ))}
          </Select>
        </Form>
      </Modal>    </div>
  );
};

export default ZoneList;
