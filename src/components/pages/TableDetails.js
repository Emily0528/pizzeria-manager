import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTables, fetchTables, setTables } from '../../store/tablesReducer';
import { Form, Button, InputGroup, Container, Row, Col } from 'react-bootstrap';

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
    <Container style={{ maxWidth: '400px', marginTop: '40px',  marginLeft: 0 }}>
      <h2>Table {table.id}</h2>

      <Form className="mt-4">
        {/* Status */}
        <Form.Group as={Row} className="mb-3" controlId="formStatus">
          <Form.Label column sm={3}>
            Status:
          </Form.Label>
          <Col sm={9}>
            <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
              <option>Free</option>
              <option>Busy</option>
              <option>Cleaning</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* People */}
        <Form.Group as={Row} className="mb-3" controlId="formPeople">
          <Form.Label column sm={3}>
            People:
          </Form.Label>
          <Col sm={9}>
            <InputGroup style={{ width: 'fit-content' }}>
              <Form.Control
                type="number"
                className="rounded-number"
                style={{ width: '60px', flex: '0 0 auto', borderRadius: '8px' }}
                min="0"
                max={maxPeopleAmount}
                value={peopleAmount}
                onChange={e => setPeopleAmount(Number(e.target.value))}
              />
              <InputGroup.Text 
                style={{ background: 'transparent', border: 'none'}}
              >/</InputGroup.Text>
              <Form.Control
                type="number"
                className="rounded-number"
                style={{ width: '60px', flex: '0 0 auto', borderRadius: '8px' }}
                min="1"
                value={maxPeopleAmount}
                onChange={e => setMaxPeopleAmount(Number(e.target.value))}
              />
            </InputGroup>
          </Col>
        </Form.Group>

        {/* Bill */}
        <Form.Group as={Row} className="mb-3" controlId="formBill">
          <Form.Label column sm={3}>
            Bill:
          </Form.Label>
          <Col sm={9}>
            <InputGroup>
              <InputGroup.Text
                style={{ background: 'transparent', border: 'none'}}
              >$</InputGroup.Text>
              <Form.Control
                type="number"
                className="rounded-number"
                style={{ width: '60px', flex: '0 0 auto', borderRadius: '8px' }}
                min="0"
                value={bill}
                onChange={e => setBill(Number(e.target.value))}
              />
            </InputGroup>
          </Col>
        </Form.Group>

        {/* Update button */}
        <Button variant="primary" onClick={handleUpdate} className="w-30 mt-3">
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default TableDetails;