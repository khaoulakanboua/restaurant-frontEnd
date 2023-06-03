import './App.css';
import { Footer, ResponsiveAppBar } from './component/Layout';
import SpecilaiteList from './component/SpecialiteList';
import SpecialiteForm from './component/SpecialiteForm';
import VilleForm from './component/VilleForm';
import VilleList from './component/VilleList';
import ZoneList from './component/ZoneList';
import ZoneForm from './component/ZoneForm';
import SerieList from './component/SerieList';
import SerieForm from './component/SerieForm';
import RestoList from './component/RestoList';
import ZoneByCity from './component/RestoForm';
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import RestoEdit from './component/RestoEdit';
import Map from './component/Map';
import GoogleMap from './component/MapAll'
import Login from './component/Login';
import Register from './component/Register';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import RestauDetails from './component/RestauDetails';


function AppHeader() {
  

  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isRegisterPage = location.pathname === '/Register';

  if (isLoginPage || isRegisterPage) {
    return null; // Don't render the header on the login page
  }

  return <ResponsiveAppBar />;
}
function App() {
  return (
 
<Router>
      <div className="App">
        <AppHeader />

        <Routes>
        <Route path="/Register" element={<Register/>} />
          <Route path="/" element={<Login />} index={true} />
        <Route  element={<ProtectedRoute/>} >
          <Route path="/addSpecialite" element={<SpecialiteForm />} />
          <Route path="/specialiteList" element={<SpecilaiteList />} />
          <Route path="/addVille" element={<VilleForm />} />
          <Route path="/ville" element={<VilleList />} />
          <Route path="/zone" element={<ZoneList />} />
          <Route path="/addZone" element={<ZoneForm />} />
          <Route path="/serie" element={<SerieList />} />
          <Route path="/addSerie" element={<SerieForm />} />
          <Route path="/resto" element={<RestoList />} />
          <Route path="/addResto" element={<ZoneByCity />} />
          <Route path="editresto/:id" element={<RestoEdit />} />
          <Route path="/map" element={<Map />} />
          <Route path="/map/:id" element={<Map />} />
          <Route path="/mapAll" element={<GoogleMap />} />
          <Route path="/Details" element={<RestauDetails />} />

        
          </Route>

        </Routes>
      </div>
    </Router>

  );
}

export default App;
