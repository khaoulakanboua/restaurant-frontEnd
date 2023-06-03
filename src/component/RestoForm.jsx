import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "antd";
import Button from '@mui/material/Button';
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import { MenuItem } from '@mui/material';
import { Style } from "@mui/icons-material";



const ZoneByCity = () => {
  const [zones, setZones] = useState([]);
  const [zoneId, setZoneId] = useState([]);
  const [cities, setCities] = useState([]);
  const [nom, setNom] = useState([]);
  const [jour_open, setJourOpen] = useState(["Lundi"]);
  const [jour_close, setJourClose] = useState(["Lundi"]);
  const concatenatedString = "De "+ jour_open.concat(" A "+jour_close );
  const [adresse, setAdresse] = useState([]);
  const [langitude, setLangitude] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [serieId, setSerieId] = useState("");
  const [series, setSeries] = useState([]);
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [h_open, setHopen] = useState("10:05 AM");
  const [h_close, setHclose] = useState("10:05 AM");
  const [rank, setRanks] = useState("1");
  const [imageFile, setImageFile] = useState(null);
  const [image, setImages] = useState("");


  const handleHclose = (event) => {
    setHclose(event.target.value);
  };
    const handleHopen = (event) => {
      setHopen(event.target.value);
    };
  
  useEffect(() => {
    axios.get("https://restaurant-production-f803.up.railway.app/api/villes/").then((response) => {
      setCities(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get("https://restaurant-production-f803.up.railway.app/api/series/all").then((response) => {
      setSeries(response.data);
    });
  }, []);


  //imaggeeee
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        setImages(e.target.result);
    };
    reader.readAsDataURL(file);
};
  





  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCityId(cityId);
    axios.get(`https://restaurant-production-f803.up.railway.app/api/zones/ville/zones/${cityId}`).then((response) => {
      setZones(response.data);
    });};
  const handleRankChange = (event) => {
      setRanks(event.target.value);
    };
  const handleZoneChange = (event) => {
      const zoneId = event.target.value;
      setZoneId(zoneId);
     };
  const handleJourOpenChange = (event) => {
      setJourOpen(event.target.value);
    };
    
  const handleJourCloseChange = (event) => {
      setJourClose(event.target.value);
    };
  const handleSubmit = (event) => {
      event.preventDefault();
      axios.post("https://restaurant-production-f803.up.railway.app/api/resto/save", {
        
        "nom":nom,
        "adresse": adresse,
        "langitude": langitude,
        "latitude": latitude,
        "h_Open": h_open,
        "h_Close": h_close,
        "week": concatenatedString,
        "rank": rank,

        "zone": {
            "id": zoneId
            
        },
        "serie": {
            "id": serieId
        },
        "image":image,

      }).then((response) => {
          //onZoneAdded(response.data);
          setNom("");
          setAdresse("");
          setLangitude("");
          setLatitude("");
          setHopen("");
          setHclose("");
          setZoneId("");
          setRanks("");
          setSerieId("");
          setImages("");


          
      });
  };
  

  return (
    <div className="container">
  <Card>
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Ajouter Restaurant</h2>
        <div className="form">
          <TextField
            label="Nom"
            value={nom}
            onChange={(event) => setNom(event.target.value)
            }
            sx={{ width: '100%' }}
          />
        </div>
        <br/>
        <div className="form">
          <TextField
            label="Adresse"
            value={adresse}
            onChange={(event) => setAdresse(event.target.value)}
            sx={{ width: '100%' }}
          />
        </div>
        <br/>
        <div className="form">
          <TextField
            type="number"
            label="Langitude"
            value={langitude}
            onChange={(event) => setLangitude(event.target.value)}
            sx={{ width: '100%' }}
          />
        </div>
        <br/>
        <div className="form">
          <TextField
            type="number"
            label="Latitude"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
            sx={{ width: '100%' }}
          />
        </div>
        <br/>
        <div className="cs-form">
          <label htmlFor="h_open">Heure d'Ouverture:</label>
          <input
            type="time"
            className="form-control"
            value={h_open}
            id="h_open"
            onChange={handleHopen}
          />
        </div>
        <div className="cs-form">
          <label htmlFor="h_close">Heure de Fermeture:</label>
          <input
            type="time"
            className="form-control"
            value={h_close}
            id="h_close"
            onChange={handleHclose}
          />
        </div>
        <div className="form-group">
          <InputLabel htmlFor="cityId">City:</InputLabel>
          <Select
            className="form-control"
            id="cityId"
            value={selectedCityId}
            onChange={handleCityChange}
          >
            <MenuItem value="">All cities</MenuItem>
            {cities.map((ville) => (
              <MenuItem key={ville.id} value={ville.nom}>
                {ville.nom}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="form-group">
          <InputLabel htmlFor="zoneId">Zone par Ville:</InputLabel>
          <Select
            className="form-control"
            id="zoneId"
            value={zoneId}
            onChange={handleZoneChange}
          >
            <MenuItem value="">Zone par Ville</MenuItem>
            {zones.map((zone) => (
              <MenuItem key={zone.id} value={zone.id}>
                {zone.nom}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="form-group">
          <InputLabel htmlFor="rankId">Select a Rank:</InputLabel>
          <Select
            className="form-control"
            id="rankId"
            value={rank}
            onChange={handleRankChange}
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
          </Select>
        </div>
        <div className="form-group">
          <InputLabel htmlFor="serieId">Select a Serie:</InputLabel>
          <Select
            className="form-control"
            id="serieId"
            value={serieId}
            onChange={(event) => setSerieId(event.target.value)}
          >
            <MenuItem value="">Select a serie</MenuItem>
            {series && series.map((serie) => (
              <MenuItem key={serie.id} value={serie.id}>
                {serie.nom}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="col-md-6">
          <InputLabel htmlFor="restaurant-adresse" className="form-label">
          </InputLabel>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        <br />
        <Button type="submit" variant="contained" color="primary" >
          Add Restaurant
        </Button>
      </div>
    </form>
  </Card>
</div>

  );
};

export default ZoneByCity;
