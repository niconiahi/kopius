# Javascript

In Javascript we have many different data types

## Definition

### string

```js
const name = 'Victor'
```

### array

```js
const names = ['Victor', 'Maria']
```

### object

```js
const person = { name: "Victor", surname: "Menendez" }
```

### number

```js
const age = 22
```

## Actions I can execute on them

### string

#### getting a portion of a string

```js
const name = 'Victor'
console.log(name.slice(0, 3)) // => "Vic"
```

#### interpolating strings

```js
const fullName = `${name} Menendez`
console.log(fullName) // => "Victor Menendez"
```

### array

#### map

```js
const names = ['Victor', 'Flavia']
const shortNames = names.map((name) => {
  return name.slice(0, 3)
})
console.log(shortNames) // => ["Vic", "Fla"]
```

#### reduce

```js
const prices = [2, 6, 15]
const INITIAL_PRICE = 0
const total = prices.reduce((total, price) => {
  return total + price
}, INITIAL_PRICE)
console.log(total) // => 23
```

#### filter

```js
const names = ['Victor', 'Aristobulo']
const longNames = names.filter((name) => {
  return name.length > 7
})
console.log(longNames) // => ["Aristobulo"]
```

#### using indices

```js
const names = ['Victor', 'Flavia']
const someNames = names.map((name, index) => {
  if (index === 1) {
    return name
  }
  return null
})
console.log(someNames) // => [null, "Flavia"]
```

### object

#### Object.keys

```js
const person = { name: "Victor", surname: "Menendez" }
const keys = Object.keys(person)
console.log(keys) // => ["name", "surname"]
```

#### Object.values

```js
const person = { name: "Victor", surname: "Menendez" }
const values = Object.values(person)
console.log(values) // => ["Victor", "Menendez"]
```

#### Object.entries

```js
const person = { name: "Victor", surname: "Menendez" }
const entries = Object.entries(person)
console.log(entries) // => [["name", "Victor"], ["surname", "Menendez"]]
```

#### accessing with square brackets

```js
const person = { name: "Victor", surname: "Menendez" }
const name = person['name']
console.log(name) // => "Victor"
```

#### accessing by property name

```js
const person = { name: "Victor", surname: "Menendez" }
const surname = person.surname
console.log(surname) // => "Menendez"
```

### number

#### aggregate numbers

```js
const one = 1
const two = 2
const sum = one + two
console.log(sum) // => 3
```
