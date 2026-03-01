// selectors
export const getAllTables = state => state.tables;

// actions
const createActionName = actionName => `app/tables/${actionName}`;
export const SET_TABLES = createActionName('SET_TABLES');
export const ADD_TABLE = createActionName('ADD_TABLE');

// action creators
export const setTables = payload => ({
  type: SET_TABLES,
  payload
});

export const addTable = payload => ({
  type: ADD_TABLE,
  payload
});

// thunk – pobranie danych z serwera
export const fetchTables = () => {
  return async dispatch => {
    try {
      const res = await fetch('http://localhost:3131/api/tables');
      const data = await res.json();
      dispatch(setTables(data));
    } catch (err) {
      console.error('Błąd pobierania stolików:', err);
    }
  };
};

// reducer
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case SET_TABLES:
      return action.payload;
    case ADD_TABLE:
      return [...statePart, action.payload];
    default:
      return statePart;
  }
};

export default tablesReducer;