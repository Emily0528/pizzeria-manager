import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTables, getAllTables } from '../../store/tablesReducer';
import TableCard from './TableDetails';

const TablesList = () => {
  const dispatch = useDispatch();
  const tables = useSelector(getAllTables);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <div>
      <h1>All tables</h1>
      {tables.map(table => (
        <TableCard key={table.id} table={table} />
      ))}
    </div>
  );
};

export default TablesList;