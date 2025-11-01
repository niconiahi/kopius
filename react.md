# React

## Rendering cycle and virtual DOM

This is the backbone of React. Understanding this is a requirement to be able to follow the flow of your code. Without having this foundational knowledge, debugging (a constant practice while programming) becomes much harder, tiring and unpredictable. Let's start with it:

### Rendering

So, what's a _render_? Well, when React _renders_ it basically transforms a (root) React component into HTML + CSS + Javascript. Let's see the API that React uses to _render_ our application

```tsx
import { hydrateRoot } from "react-dom/client"
import { Component } from "./component"

const element = document.querySelector("#app")
hydrateRoot(element, <Component />)
```

So this code tells React to render the `Component` component into the element with selector `#app`

This is what we are going to call the _initial render_

### Re-rendering

After the initial rendering, React will allow us to trigger a new render using specific APIs: `useState`, `useEffect` and `useReducer`. We'll focus on `useState` for now

Let's take this initial React component

```tsx
function ColorPicker() {
  const [color, setColor] = useState('red')
  return (
    <>
      <span>{color}</span>
      <button
        onClick={() => {
          setColor('blue') // this triggers a re-render
        }}
      >
        turn color to blue
      </button>
    </>
  )
}
const element = document.querySelector("#app")
hydrateRoot(element, <ColorPicker />)
```

The flow for this: 

1. `hydrateRoot` initially renders the `ColorPicker` on the element `#app`
2. The render starts from `ColorPicker`, at first code line. In that line the initial state of the `color` state is `red`
3. The user clicks on _turn color to blue_ button
4. The `onClick` callback calls `setColor` setting the state `color` to `blue`
5. After React finishes setting the `color` state to `blue`, it triggers a re-render
5. The render starts from `ColorPicker`, at first code line. In that line the initial state of the `color` state is now `blue`, because it was stored upon button click

This flow condenses how React works: 

render -> something triggers re-render -> render -> something triggers re-render -> render -> something triggers re-render -> render -> so on

## Storing state

Many times, you'll need to persist some state across multiple renders. Let's see it with an example:

Imagine you have a list of users and want to keep track of a "selected user":

```tsx
export default function() {
  const [selectedUser, setSelectedUser] = useState(null)
  const USERS = ['Mario', 'Ana']
  return (
    <ul>
      {USERS.map((user) => {
        const key = `user-${user}`
        return (
          <li key={key}>
            {user}
            <button
              onClick={() => {
                setSelectedUser(user)
              }}
            >
              select this user
            </button>
          </li>
        )
      })}
    </ul>
  )
}
```

## Working with lists

This is one of the most common patterns in React. It could be said that every page will have a list of elements listed in the UI. For example:

- A list of links in a header
- A list of users in a dashboard
- A list of posts in a feed

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

### Extracting functions outside of components

We'll maintain funcitons outside of components in order to have clean and simple components
If we leave the function's declarations inside the component, it may too big too fast

```tsx
function App() {
  const [name, setName] = useState("Alonso")
  function handleClick() {
    setName('Fernando')
  }
  return (
    <button onClick={() => {
      handleClick()
    }}>
      change name
    </button>
  )
}
```

This would would get extracted outside the component

```tsx
function handleClick(setName) {
  setName('Fernando')
}
function App() {
  const [name, setName] = useState("Alonso")
  return (
    <button onClick={() => {
      handleClick()
    }}>
      change name
    </button>
  )
}
```

Another possibility is not creating a function at. Just move all the code to an [anonymous function](https://en.wikipedia.org/wiki/Anonymous_function)

An _anonymous function_ is a function which is not assigned to a variable

```tsx
function App() {
  const [name, setName] = useState("Alonso")
  return (
    <button onClick={() => {
      setName('Fernando')
    }}>
      change name
    </button>
  )
}
```

Unless the function is reused, I'll prefer using an _anonymous function_

Why will I prefer this? Because it means I will make fewer _line jumps_. I don't have to go see the code being executed in another function (namely `handleClick` in the case of this example), I can see it right there. It's only one line of code and it executes the `setName` function


