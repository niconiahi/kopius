# Coding practices

## Naming your variables

Names should try to reflect the most it can, the data it stores

#### Singular vs plural

We'll only use plural variable names for array

```tsx
const name = "Jose"
const names = ["Cintia", "Jose", "Brenda"]
```

#### Naming your function by action

If your function gets information from some existing state, the name should be prefixed with _get_

```tsx
function getName(names: string[]) {
  const index = Math.floor(Math.random() * names.length)
  return names[index]
}
console.log(getName(['Jonh', 'Jeremy'])) // ['Jonh'] or ['Jeremy']
```

If your function removes something from an existing state, the name should be prefixed with _remove_ 

```tsx
function removeLastColor(colors: string[]) {
  return colors.slice(0, colors.length - 1)
}
console.log(removeLastColor(['red', 'blue'])) // ['red']
```

If your function mixes different pieces of data to create a new one, the name should be prefixed with _compose_

```tsx
function composeFullName(name: string, surname: string) {
  return `${name} ${surname}`
}
console.log(composeFullName("Eleonor", "Garcia")) // "Eleonor Garcia"

function composeCoordinate(x: number, y: number) {
  return [x, y]
}
console.log(composeCoordinate(-23.8, 34.2)) // [-23.8, 34.2]
```

If your function sets a state, the name should be prefixed with _set_

```tsx
let name = "Jonh"
function setName(nextName: string) {
  name = nextName
}
setName("Brad")
console.log('name', name) // "name" "Brad"
```

If your function gets some data from an external system via a _Request_, the name should be prefixed with _fetch_

```tsx
function fetchPokemons(nextName: string) {
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      console.error('error', error)
    })
}
const pokemons = await fetchPokemons()
console.log('pokemons', pokemons) // [{ name: "Ditto" }, { name: "Pikachu" }]
```

#### Pattern to name your variable declarations

Let's see this with examples and conclude with the explanation

```tsx
const colors = getColors()
const fullName = getFullName()

// also for React hooks
const fetcher = useFetcher()
const navigation = useNavigation()
```

Are you able to see the pattern? it's simple: the variable name (the _left_ part of the equal sign) will be the same as it's _right_ part, minus the the prefix. So, let's see it again:

```tsx
function getColors() {
  return ['red', 'blue']
}
// "getColors" is the full name of the function that gets a list of colors
const colors = getColors() // "getColors" minus the prefix "get" equals "colors"
```

```tsx
function fetchUsers() {
  return fetch('/get/users')
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      console.error('error', error)
    })
}
// "fetchUsers" is the full name of the function that gets a list of users
const users = fetchUsers() // "fetchColors" minus the prefix "fetch" equals "users"
```
