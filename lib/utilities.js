'use strict';

export const isValidPassword = (password) => {
  let isValid = (password.length > 5) ? true : false;
  return isValid;
}

export const isValidName = (name) => {
  let isValid = name.match(/^[a-zA-Z0-9_]{4,32}$/);
  return isValid;
}

export const isValidTitle = (title) => {
  let isValid = title.match(/^.{1,150}$/);
  return isValid;
}

export const isValidTestCase = (testCase) => {
  let isValid = testCase.match(/^.{1,150}$/);
  return isValid;
}

export const isValidRejection = (rejection) => {
  let isValid = rejection.match(/^.{1,150}$/);
  return isValid;
}

export const getProjectPlaceholderText = () => {
  let placeholders = ['my best friend\'s wedding', 'my summer vacation', 'our dad\'s 45th birthday', 'the family reunion', 'this Saturday night'];
  let index = getRandomArbitrary(0, placeholders.length);
  return placeholders[index];
}

export const getTestCasePlaceholderText = () => {
  let placeholders = ['have us holding the cake', 'get the old gang together', 'include the mascot', 'us crossing the finish line'];
  let index = getRandomArbitrary(0, placeholders.length);
  return placeholders[index];
}

export const getCollaboratorPlaceholderText = () => {
  let placeholders = ['jane@doe.com', 'john@doe.com'];
  let index = getRandomArbitrary(0, placeholders.length);
  return placeholders[index];
}

export const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min ) + min);
}
