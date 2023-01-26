import { useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const Maps = () => {
  const [center, setCurrentLoc] = useState({
    lat: 31.9539,
    lng: 35.9106,
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA7f_t2Ccx3tdV_Mz2pT0zdVioGU6SiKS4',
  });
  const containerStyle = {
    height: 350,
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    padding: 0,
  };
  return (
    <>
      <useLoadScript>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18} />
      </useLoadScript>
    </>
  );
};
export default Maps;
