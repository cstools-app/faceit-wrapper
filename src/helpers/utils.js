/**
 * @function isString
 * @description Internal helper to check if parameter is a string
 *
 * @param {any} str
 *
 * @return {boolean}
 */
const isString = (str) => {
  return typeof str === 'string' || str instanceof String;
};

/**
 * @function isArray
 * @description Internal helper to check if parameter is an array
 *
 * @param {any} arr
 *
 * @return {boolean}
 */
const isArray = (arr) => {
  return Array.isArray(arr);
};

/**
 * @function isStringEmpty
 * @description Internal helper to check if string is empty
 *
 * @param {any} str
 *
 * @return {boolean}
 */
const isStringEmpty = (str) => {
  return !str || !isString(str) || str.length === 0;
};

/**
 * @function isDate
 * @description Internal helper to check if parameter is a date
 *
 * @param {any} date
 *
 * @return {boolean}
 */
const isDate = (date) => {
  if (isString(date) || isArray(date) || date === undefined || date === null) return false;
  return date && Object.prototype.toString.call(date) === '[object Date]' && !Number.isNaN(date);
};

/**
 * @function isObject
 * @description Internal helper to check if parameter is an object
 *
 * @param {any} obj
 *
 * @return {boolean}
 */
const isObject = (obj) => {
  if (isArray(obj) || isDate(obj)) return false;
  return obj !== null && typeof obj === 'object';
};

/**
 * @function isNumber
 * @description Internal helper to check if parameter is a number
 *
 * @param {any} num
 *
 * @return {boolean}
 */
const isNumber = (num) => {
  return !Number.isNaN(num) && !Number.isNaN(parseInt(num));
};

export default {
  isString,
  isStringEmpty,
  isDate,
  isObject,
  isNumber,
  isArray,
};
