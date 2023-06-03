import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import {  Modal, Row, Col, Select } from 'antd';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RestoContainer = styled('div')({
  flexGrow: 1,
});

export default function RestauDetails() {
  const [expandedCards, setExpandedCards] = useState([]);
  const [restos, setRestos] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState("");
  const [selectedSerieId, setSelectedSerieId] = useState("");
  const [zones, setZones] = useState([]);
  const [series, setSeries] = useState([]);
  const { Option } = Select;

  const handleExpandClick = (restoId) => {
    setExpandedCards((prevExpandedCards) => {
      if (prevExpandedCards.includes(restoId)) {
        return prevExpandedCards.filter((id) => id !== restoId);
      } else {
        return [...prevExpandedCards, restoId];
      }
    });
  };
const handleFavoriteClick = (restoId) => {
    setRestos((prevRestos) =>
      prevRestos.map((resto) =>
        resto.id === restoId ? { ...resto, favorite: !resto.favorite } : resto
      )
    );
  };


  useEffect(() => {
    axios.get("/api/villes/").then((response) => {
      setCities(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/series/all").then((response) => {
      setSeries(response.data);

    });
  }, []);

  const handleCityChange = (value) => {
    setSelectedCityId(value);
    axios.get(`/api/zones/ville/zones/${value}`).then((response) => {
      setZones(response.data);
      console.log(value);
    });
  };

  const handleZoneChange = (value) => {

    setSelectedZoneId(value);
    axios.get(`/api/resto/filter/${selectedCityId}/${value}`).then((response) => {
      setRestos(response.data);
      console.log(response.data);
    });
    console.log(value)

  };

  const handleSerieChange = (value) => {

    setSelectedSerieId(value);
    axios.get(`/api/resto/filter2/${selectedCityId}/${selectedZoneId}/${value}`).then((response) => {
      setRestos(response.data);
      console.log(response.data);
    });
    console.log(value)

  };



  useEffect(() => {
    const fetchRestaurants = () => {
      axios.get("/api/resto/all")
        .then((response) => {
          const updatedRestos = response.data.map((resto) => ({
            ...resto,
            favorite: false,
          }));
          setRestos(updatedRestos);
        })
        .catch((error) => {
          console.error("Error fetching restaurant data:", error);
        });
    };

    fetchRestaurants();
  }, []);

  return (
    <RestoContainer>
      <div style={{ marginBottom: '16px' }}>
      <Select
  style={{
    width: 200,
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    padding: '8px',
    backgroundColor: '#f8f8f8',
    color: '#333',
    fontSize: '14px',
  }}
  dropdownStyle={{
    borderRadius: '4px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#fff',
  }}
  placeholder="Filter by Ville"
  value={selectedCityId}
  onChange={handleCityChange}
>
  {cities.map((ville) => (
    <Option key={ville.id} value={ville.nom}>
      {ville.nom}
    </Option>
  ))}
</Select>

<Select
  style={{
    width: 200,
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    padding: '8px',
    backgroundColor: '#f8f8f8',
    color: '#333',
    fontSize: '14px',
  }}
  dropdownStyle={{
    borderRadius: '4px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#fff',
  }}
  placeholder="Filter by Zone"
  value={selectedZoneId}
  onChange={handleZoneChange}
>
  {zones.map((zone) => (
    <Option key={zone.id} value={zone.nom}>
      {zone.nom}
    </Option>
  ))}
</Select>



<Select
  style={{
    width: 200,
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    padding: '8px',
    backgroundColor: '#f8f8f8',
    color: '#333',
    fontSize: '14px',
  }}
  dropdownStyle={{
    borderRadius: '4px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#fff',
  }}
  placeholder="Filter by Serie"
  value={selectedSerieId}
  onChange={handleSerieChange}
>
  {series.map((serie) => (
    <Option key={serie.id} value={serie.nom}>
      {serie.nom}
    </Option>
  ))}
</Select>

            
          </div>
      <Grid container spacing={2}>
        {restos.map((resto) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={resto.id}>
            <Card sx={{ maxWidth: 345, width: '100%' }}>
              <CardHeader
               
                action={
                  <IconButton aria-label="settings">
                   <a href={`map/${resto.id}`}>
        <MoreVertIcon />
      </a>
                  </IconButton>
                }
                title={resto.nom}
                //subheader={resto.date}
              />
              <CardMedia
                component="img"
                height="240"
                src={resto.image}
                alt="Restaurant Image"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">Adresse:  
                  {resto.adresse}
                </Typography>
                <Typography variant="body2" color="text.secondary">Heure d'ouverture:  De
                  {resto.h_Open} à {resto.h_Close}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
              <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleFavoriteClick(resto.id)}
                >
                  <FavoriteIcon
                    style={{
                      color: resto.favorite ? red[500] : 'inherit',
                    }}
                  />
                </IconButton>
               
                <ExpandMore
                  expand={expandedCards.includes(resto.id)}
                  onClick={() => handleExpandClick(resto.id)}
                  aria-expanded={expandedCards.includes(resto.id)}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expandedCards.includes(resto.id)} timeout="auto" unmountOnExit>
                <CardContent>
                 
                  <Typography paragraph>Serie:  {resto.serie.nom}</Typography>
                  <Typography>Zone:  {resto.zone.nom}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </RestoContainer>
  );
}