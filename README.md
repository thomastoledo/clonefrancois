
# Clone Francois

A lightweight utility function for deeply cloning JavaScript objects, arrays, and other complex data structures. Supports circular references and special cases like `Date`, `Map`, and `Set`.

## Features

- Handles primitive types, arrays, objects, dates, maps, and sets.
- Supports circular references.
- Lightweight and dependency-free.
- Fully written in TypeScript-compatible JavaScript (ESM).

## Installation

```bash
npm install clonefrancois
```

Or, using `yarn`:

```bash
yarn add clonefrancois
```

## Usage

### Import the function

Using ESM:

```javascript
import { deepClone } from 'clonefrancois';
```

### Examples

#### Clone a simple object

```javascript
const obj = { a: 1, b: { c: 2 } };
const clone = deepClone(obj);

console.log(clone); // { a: 1, b: { c: 2 } }
console.log(clone.b === obj.b); // false (different references)
```

#### Clone an array

```javascript
const arr = [1, 2, { a: 3 }];
const clone = deepClone(arr);

console.log(clone); // [1, 2, { a: 3 }]
console.log(clone[2] === arr[2]); // false
```

#### Clone with a `Date`

```javascript
const date = new Date();
const clone = deepClone(date);

console.log(clone); // Same date as original
console.log(clone === date); // false
```

#### Handle circular references

```javascript
const obj = { a: 1 };
obj.self = obj; // Circular reference

const clone = deepClone(obj);

console.log(clone); // { a: 1, self: [Circular] }
console.log(clone.self === clone); // true
```

#### Clone a `Map`

```javascript
const map = new Map();
map.set('key', { value: 42 });

const clone = deepClone(map);
console.log(clone.get('key')); // { value: 42 }
console.log(clone.get('key') === map.get('key')); // false
```

#### Clone a `Set`

```javascript
const set = new Set([{ a: 1 }]);

const clone = deepClone(set);
console.log(clone); // Set([{ a: 1 }])
console.log([...clone][0] === [...set][0]); // false
```

## API

### `deepClone(value: any): any`

- **`value`**: The value to clone. Can be of any type (object, array, date, map, set, etc.).
- **Returns**: A deep clone of the input value.

## License

MIT
