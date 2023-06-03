import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestoEdit = () => {
  const [zones, setZones] = useState([]);
  const [zoneId, setZoneId] = useState("");
  const [cities, setCities] = useState([]);
  const [nom, setNom] = useState("");
  const [jour_open, setJourOpen] = useState("Lundi");
  const [jour_close, setJourClose] = useState("Lundi");
  const concatenatedString = "De " + jour_open.concat(" A " + jour_close);
  const [adresse, setAdresse] = useState("");
  const [langitude, setLangitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [serieId, setSerieId] = useState("");
  const [series, setSeries] = useState([]);
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [h_open, setHopen] = useState("10:05 AM");
  const [h_close, setHclose] = useState("10:05 AM");
  const [rank, setRanks] = useState("1");
  const [restos, setRestos] = useState({});
  const { id } = useParams();

  useEffect(() => {
    loadResto();
  }, []);

  useEffect(() => {
    axios.get("https://restaurant-production-f803.up.railway.app/api/resto/all").then((response) => {
      setRestos(response.data);
    });
  }, []);

  const loadResto = async () => {
    const result = await axios.get(`https://restaurant-production-f803.up.railway.app/api/resto/findbyid/${id}`);
    setRestos(result.data);
    setNom(result.data.nom);
    setAdresse(result.data.adresse);
    setLangitude(result.data.langitude);
    setLatitude(result.data.latitude);
    setHopen(result.data.h_Open);
    setHclose(result.data.h_Close);
    setZoneId(result.data.zone && result.data.zone.id);
    setRanks(result.data.rank);
    setSerieId(result.data.serie && result.data.serie.id);
    setSelectedCityId(
      result.data.zone && result.data.zone.ville && result.data.zone.ville.nom
    );
  };

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

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCityId(cityId);
    axios.get(`https://restaurant-production-f803.up.railway.app/api/zones/ville/zones/${cityId}`).then((response) => {
      const zonesData = response.data.map((zone) => ({
        id: zone.id,
        nom: zone.nom
      }));
      setZones(zonesData);
    });
  };
  

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
    axios
      .put(`https://restaurant-production-f803.up.railway.app/api/resto/${id}`, {
        nom,
        adresse,
        langitude,
        latitude,
        h_Open: h_open,
        h_Close: h_close,
        week: concatenatedString,
        rank,
        zone: {
          id: zoneId,
        },
        serie: {
          id: serieId,
        },
      })
      .then((response) => {
        // Handle success or display a success message
      })
      .catch((error) => {
        // Handle error or display an error message
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Restaurant</h2>
        <div className="form">
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            placeholder="Nom"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
          />
        </div>
        <div className="form">
          <label htmlFor="adresse">Addresse:</label>
          <input
            type="text"
            className="form-control"
            id="adresse"
            placeholder="Adresse"
            value={adresse}
            onChange={(event) => setAdresse(event.target.value)}
          />
        </div>
        <div className="form">
          <label htmlFor="langitude">Langitude:</label>
          <input
            type="number"
            className="form-control"
            id="langitude"
            placeholder="Langitude"
            value={langitude}
            onChange={(event) => setLangitude(event.target.value)}
          />
        </div>
        <div className="form">
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="number"
            className="form-control"
            id="latitude"
            placeholder="Latitude"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
          />
        </div>
        <div className="cs-form">
          <label htmlFor="h_open">Ouverture:</label>
          <input
            type="time"
            className="form-control"
            value={h_open}
            id="h_open"
            onChange={handleHopen}
          />
        </div>
        <div className="cs-form">
          <label htmlFor="h_close">Fermeture:</label>
          <input
            type="time"
            className="form-control"
            value={h_close}
            id="h_close"
            onChange={handleHclose}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cityId">Select a city:</label>
          <select
            className="form-control"
            id="cityId"
            value={selectedCityId}
            onChange={handleCityChange}
          >
            <option disabled>Select a city</option>
            {cities.map((ville) => (
              <option key={ville.id} value={ville.id}>
                {ville.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="zoneId">Select a zone:</label>
          <select
            className="form-control"
            id="zoneId"
            value={zoneId}
            onChange={handleZoneChange}
          >
            <option disabled>Select a zone</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rank">Select a Rank:</label>
          <select
            className="form-control"
            id="rankId"
            value={rank}
            onChange={handleRankChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="serieId">Serie:</label>
          <select
            className="form-control"
            id="serieId"
            value={serieId}
            onChange={(event) => setSerieId(event.target.value)}
          >
            <option disabled>Select a serie</option>
            {series.map((serie) => (
              <option key={serie.id} value={serie.id}>
                {serie.nom}
              </option>
            ))}
          </select>
        </div>
        <br />
      </div>
    
  <button type="submit" className="btn btn-primary">
    Edit Restaurant
  </button>

    </form>
  );
};

export default RestoEdit;
