# Local storage

There is a way for us to _store_ some data in the browser. That data will be available for us to retrieve it whenever we want

### Storing simple values

The anatomy of [localStorage.setItem()](https://developer.mozilla.org/es/docs/Web/API/Storage/setItem) is:

```ts
localStorage.setItem("key", "value")
```

Here we are storing the value of the `name` variable under the key `"name"`

```ts
const name = "Luis"
localStorage.setItem("name", name)
```

### Naming

The key should match the _name of the variable_ being stored

```ts
const name = "Luis"
localStorage.setItem("name", name) // the key is "name" because the variable name is name
```

Another naming example:

```ts
const count = 22
localStorage.setItem("count", String(count)) // the key is "count" because the variable name is count
```

Notice that we are _stringifying_ the `count` to store it

### Storing complex values

You can also store more complex values like arrays and objects, but not directly. Let"s see how to do it:

```ts
const people = ["Sarah", "Mike"]
localStorage.setItem("people", JSON.stringify(people))
```

As you can see, we are making use of [JSON.stringify](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) to convert from array to string

Why? because `localStorage` can"t store complex structures directly, it can only store strings

Let"s see now how to store an object:

```ts
const person = { name: "Olga", surname: "Fernandez" }
localStorage.setItem("person", JSON.stringify(person))
```

Easy piecy, right?

Now let's store one last structure, a little more complex but more super normal to find. An _array of objects_

```ts
const people = [
  { name: "Olga", surname: "Fernandez" },
  { name: "Martina", surname: "Lorenzo" },
]
localStorage.setItem("people", JSON.stringify(people))
console.log(localStorage.getItem('people'))
console.log(typeof localStorage.getItem('people'))
```
