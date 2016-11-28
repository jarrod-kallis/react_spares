import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, DELETE_ALL_FLASH_MESSAGES } from '../actions/types';
// Generates unique identifiers
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.id });

      if (index >= 0) {
        // Return a new array without the deleted message
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      } else {
        return state;
      }
    case DELETE_ALL_FLASH_MESSAGES:
      return [];
    default:
      return state;
  }
};
