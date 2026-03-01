import React from 'react';
import { useParams } from 'react-router-dom';

const TableDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detail {id}</h1>
    </div>
  );
};

export default TableDetails;