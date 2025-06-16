# Metaframework

## Introduction

A metaframework is a set of tools that allows our application to run both the client and the back end side of the application, all within the same codebase. Generally, every metaframework has some way of: loading dat, mutating data and rendering UI. NextJS, React Router, Solid Start, Svelte Kit, all of them do. We'll focus on `react-router`

## react-router

We'll use `react-router` in its ["framework mode"](https://reactrouter.com/start/framework/installation) (this is the _metaframework_ mode for it). With it, we'll be able to: load data using the `loader` function, mutate data using the `action` function and rendering UI exporting a component as a default export

`react-router` heavily relies on the Request/Response model. Both _loader_ and _action_ receive a _Request_ and returns a _Response_, always

### Form


The `Form` component is used to generate a [_form submission_](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit), with the intent of mutating some data on the server. This component has a few composing elements:

1. The data being sent: this in the form of one or more `<input />` elements
2. The submitting button
3. The wrapping `Form` component itself, with a required `method` attribute

All of that together looks like this

```tsx
export function loader({ request }) {
  const surname = v.parse(
    v.string(),
    url.searchParams.get('surname'),
  )
  return { surname }
}
export default function({ loaderData }: Route.LoaderArgs) {
  const { surname } = loaderData
  const [name, setName] = useState('Jonh')
  return (
    <Form method="POST">
      <input
        name="name"
        value={name}
        type="hidden"
      />
      <input
        name="surname"
        value={surname}
        type="hidden"
      />
      <button type="primary">Submit age</button>
    </Form>
  )
}
```

In this case we are sending two pieces of data as _formData_: `name` and `surname`

### loader

Let's go through a couple of examples

1. Safely read a query param with a validation schema

```tsx
// URL: https://www.youtube.com/watch?v=YKRfTA-Vx9M
export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const video = v.parse(v.string(), url.searchParams.get('v')) 
  console.log("video", video) // "video" "I3GD4OAtEYo"
}
```

### action

1. Safely read form data with a validation schema

```tsx
export function action({ request }: Route.ActionArgs) {
  const formData = request.formData()
  // we deserialize the string, transforming it into a number, all in the same line
  const age = v.parse(
    v.pipe(v.string(), v.transform(Number)),
    // here the "age" identifier is used back again, to capture the data back
    formData.get("age"),
  )
  console.log("age", age) // "age" 23
}
export default function() {
  return (
    <Form method="POST">
      <input
        // this is the identifier for the data
        // in this case it's "age". This will be used to capture it later on
        name="age"
        // we serialize the number to string, because data needs to travel as string
        value={String(23)}
        type="hidden"
      />
      <button type="primary">Submit age</button>
    </Form>
  )
}
```

```tsx
export function action({ request }: Route.ActionArgs) {
  const formData = request.formData()
  const id = v.parse(
    v.pipe(v.string(), v.transform(Number)),
    formData.get("id"),
  )
  return { selectedUserId: id }
}
export default function({ actionData }: Route.ActionArgs) {
  const users = [{ id: 1 }, { id: 3 }]
  return (
    <main>
      {actionData?.selectedUserId ? (
        <span>Selected user id: {actionData.selectedUserId}</span>
      ) : null}
      <ul>
        {users.map((user) => {
          return (
            <li>
              <Form method="POST">
                <input
                  name="id"
                  value={String(user.id)}
                  type="hidden"
                />
                <button type="primary">Select user</button>
              </Form>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
```
