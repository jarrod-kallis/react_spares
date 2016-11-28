// import toaster from 'react-toaster';
const toaster = require('@hps/react-toaster');

import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, DELETE_ALL_FLASH_MESSAGES } from './types';

export function addFlashMessage(message) {
  toastr.info(message, { timeOut: 5000 });

  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}

export function deleteFlashMessage(id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  };
}

export function removeAllFlashMessages() {
  return {
    type: DELETE_ALL_FLASH_MESSAGES
  };
}
