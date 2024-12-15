// deep-clone.js

/**
 * Deeply clones a given value (object, array, etc.).
 * Handles special cases like Dates, Maps, Sets, and recursive structures.
 *
 * @param {*} value - The value to deeply clone.
 * @param {WeakMap} [seen=new WeakMap()] - Tracks references to handle circular references.
 * @returns {*} - The deeply cloned value.
 */
export function deepClone(value: any, seen = new WeakMap()) {
    // Handle primitive types and functions (no cloning required)
    if (value === null || typeof value !== 'object') {
      return value;
    }
  
    // Handle circular references
    if (seen.has(value)) {
      return seen.get(value);
    }
  
    // Handle Dates
    if (value instanceof Date) {
      return new Date(value.getTime());
    }
  
    // Handle Arrays
    if (Array.isArray(value)) {
      const clone: any[] = [];
      seen.set(value, clone);
      value.forEach((item, index) => {
        clone[index] = deepClone(item, seen);
      });
      return clone;
    }
  
    // Handle Maps
    if (value instanceof Map) {
      const clone = new Map();
      seen.set(value, clone);
      value.forEach((v, k) => {
        clone.set(deepClone(k, seen), deepClone(v, seen));
      });
      return clone;
    }
  
    // Handle Sets
    if (value instanceof Set) {
      const clone = new Set();
      seen.set(value, clone);
      value.forEach((item) => {
        clone.add(deepClone(item, seen));
      });
      return clone;
    }
  
    // Handle Objects
    if (Object.prototype.toString.call(value) === '[object Object]') {
      const clone: {[k: string]: any} = {};
      seen.set(value, clone);
      Object.keys(value).forEach((key) => {
        clone[key] = deepClone(value[key], seen);
      });
      return clone;
    }
  
    // Throw an error for unsupported types
    throw new Error(`Unsupported type: ${Object.prototype.toString.call(value)}`);
  }
  
  