import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTables, getAllTables } from '../../store/tablesReducer';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TablesList = () => {
  const dispatch = useDispatch();
  const tables = useSelector(getAllTables);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (tables.length === 0) {
      dispatch(fetchTables());
    }
  }, [dispatch, tables.length]);

  const handleShowMore = (id) => {
    setLoading(true); 
    setTimeout(() => {
      navigate(`/table/${id}`);
    }, 500);
  };

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      <h1 className="mb-4">All tables</h1>
      {tables.map(table => (
        <Card key={table.id} className="mb-3 p-3 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">Table {table.id}</h5>
              <span>Status: </span>
              <Badge bg={table.status === 'Busy' ? 'danger' : table.status === 'Free' ? 'success' : 'secondary'}>
                {table.status}
              </Badge>
            </div>
            <Button onClick={() => handleShowMore(table.id)}>Show more</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TablesList;