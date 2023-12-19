import React from 'react';

const Statistics = () => {
  const url =
    'https://app.powerbi.com/view?r=eyJrIjoiM2RiMzkwMDEtZTUzMS00OTU5LWI1NTYtMzJkYWM0ZDgyYmE0IiwidCI6IjNmODA1YWZhLTY3YjQtNDU2NC04NWVjLWFhZGJkMWE3OTUzZCIsImMiOjl9';
  return (
    <div>
      <iframe src={url} title="Statistics" width="100%" height="500vh" />
    </div>
  );
};

export default Statistics;
