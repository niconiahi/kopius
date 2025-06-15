# React

## Working with lists

This is one of the most common patterns in React. It could be said that every page will have a list of elements listed in the UI

When rendering a list, React will ask for us to have a `key` so that when a _re-render_ happens, React will know exactly which element to mutate (if necessary)

Let's see some examples:

```tsx
export default function() {
  const FRUITS = ['apple', 'banana']
  return (
    <ul>
      {FRUITS.map((fruit) => {
        const key = `fruit-${fruit}`
        return (
          <li key={key}>{fruit}</li>
        )
      })}
    </ul>
  )
}
```

It can be a list of anything. Usually, it'll be an array of objects, like so:

```tsx
export default function() {
  const PEOPLE = [{ name: "Jose" }, { name: "Maria" } ]
  return (
    <ul>
      {PEOPLE.map((person) => {
        const key = `person-${person.name}`
        return (
          <li key={key}>{person.name}</li>
        )
      })}
    </ul>
  )
}
```

## Effects

When you want to connect your application with the external world, for example, a third-party API (for example, the very well-known the PokeAPI), you'll have to use an `useEffect`. Let's see it in an example

```tsx
useEffect(() => {
  const data = fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then((response) => {
      return response.json()
    })
    .catch((error) => {
      console.error('error', error)
    })
}, [])
```

In this example we are _fetching_ the data for Ditto, a Pokemon. Then we are _deserealizing_ the _response_ into JSON and storing the result of that into a variable called "data".
