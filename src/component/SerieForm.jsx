import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const SerieForm = () => {
  const [nom, setNom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("https://restaurant-production-f803.up.railway.app/api/series/save", { nom }).then(() => {
      navigate("/serie");
    });
  };

  return (
    <div>
      <h2>Create Serie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom:</label>
       

    <TextField id="standard-basic" variant="standard"

    value={nom} onChange={(event) => setNom(event.target.value)} />

        </div>
        <Button type="submit" variant="contained" style={{marginTop:20}}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default SerieForm;
