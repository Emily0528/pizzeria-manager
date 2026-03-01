import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTables, fetchTables, setTables } from '../../store/tablesReducer';
import { Card, Form, Button } from 'react-bootstrap';

const TableDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tables = useSelector(getAllTables);

  useEffect(() => {
    if (tables.length === 0) {
      dispatch(fetchTables());
    }
  }, [dispatch, tables.length]);

  const table = tables.find(t => t.id === id);

  const [status, setStatus] = useState(table?.status || 'Free');
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount || 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table?.maxPeopleAmount || 4);
  const [bill, setBill] = useState(table?.bill || 0);

  const handleUpdate = () => {
    const updatedTable = { ...table, status, peopleAmount, maxPeopleAmount, bill };
    const newTables = tables.map(t => (t.id === id ? updatedTable : t));
    dispatch(setTables(newTables));
    console.log('Updated Table:', updatedTable);
  };

  if (!table) return <p>Ładowanie stolika...</p>;

  return (
    <Card className="mb-3 p-3">
      <Card.Header>Table {table.id}</Card.Header>
      <Card.Body>
        {/* Status */}
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
            <option>Free</option>
            <option>Busy</option>
            <option>Cleaning</option>
          </Form.Select>
        </Form.Group>

        {/* People */}
        <Form.Group className="mb-3">
          <Form.Label>People</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max={maxPeopleAmount}
            value={peopleAmount}
            onChange={e => setPeopleAmount(Number(e.target.value))}
          />
          <small className="text-muted">/ {maxPeopleAmount}</small>
        </Form.Group>

        {/* Max People */}
        <Form.Group className="mb-3">
          <Form.Label>Max People</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={maxPeopleAmount}
            onChange={e => setMaxPeopleAmount(Number(e.target.value))}
          />
        </Form.Group>

        {/* Bill */}
        <Form.Group className="mb-3">
          <Form.Label>Bill ($)</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={bill}
            onChange={e => setBill(Number(e.target.value))}
          />
        </Form.Group>

        {/* Update button */}
        <Button variant="primary" onClick={handleUpdate} className="w-100">
          Update
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TableDetails;