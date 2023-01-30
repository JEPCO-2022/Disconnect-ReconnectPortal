import React from 'react';
import GoogleMapReact from 'google-map-react';

// eslint-disable-next-line react/prop-types
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Mapsss = () => {
  const defaultProps = {
    center: {
      lat: 31.9539,
      lng: 35.9106,
    },
    zoom: 11,
  };
  return (
    <>
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA7f_t2Ccx3tdV_Mz2pT0zdVioGU6SiKS4' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Mapsss;
