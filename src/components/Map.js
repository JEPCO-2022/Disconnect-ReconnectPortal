import { Typography } from '@mui/material';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Mapsss = (props) => {
  const latitude = Number(props.latt);
  const longitude = Number(props.lang);
  if (props.lang === undefined || props.latt === undefined) {
    return (
      <>
        <Typography variant="h3" component="h1" paragraph align="center">
          لا يوجد خريطة
        </Typography>
        ;
      </>
    );
  }
  const renderMarkers = (map, maps, lang, latt) => {
    const marker = new maps.Marker({
      position: { lat: latt, lng: lang },
      internalPosition: { lat: latt, lng: lang },
      map,
      anchorPoint: { x: latt, y: lang },
      title: '',
    });
    return marker;
  };
  const defaultProps = {
    center: {
      lng: longitude,
      lat: latitude,
    },
    zoom: 16,
  };
  return (
    <>
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyALn3iml90eOf9YWtr5GBG8vnMJDijLnoc' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          shouldUnregisterMapOnUnmount
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) =>
            renderMarkers(map, maps, defaultProps.center.lng, defaultProps.center.lat)
          }
        >
          <AnyReactComponent lat={latitude} lng={longitude} />
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Mapsss;
