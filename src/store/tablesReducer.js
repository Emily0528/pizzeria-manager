export const getAllTables = state => state.tables;

const createActionName = actionName => `app/tables/${actionName}`;

export const ADD_TABLE = createActionName('ADD_TABLE');

export const addTable = payload => ({
  type: ADD_TABLE,
  payload
});

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_TABLE:
      return [...statePart, action.payload];
    default:
      return statePart;
  }
};

export default tablesReducer;