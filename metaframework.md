# Metaframework

## Basic

A metaframework is a set of tools that allows our application to run both the client and the back end side of the application, all within the same codebase. Generally, every metaframework has some way of: loading dat, mutating data and rendering UI. NextJS, React Router, Solid Start, Svelte Kit, all of them do. We'll focus on `react-router`

## react-router

We'll use `react-router` in its ["framework mode"](https://reactrouter.com/start/framework/installation) (this is the _metaframework_ mode for it). With it, we'll be able to: load data using the `loader` function, mutate data using the `action` function and rendering UI exporting a component as a default export

`react-router` heavily relies on the Request/Response model. Both _loader_ and _action_ receive a _Request_ and returns a _Response_, always

### loader

Let's go through a couple of examples

1. Read a query param

```tsx
// URL: https://www.youtube.com/watch?v=YKRfTA-Vx9M
export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const video = v.parse(v.string(), url.searchParams.get('v')) 
  console.log("video", video) // "video" "I3GD4OAtEYo"
}
```

### action

1. Read form data

```tsx
export function action({ request }: Route.ActionArgs) {
  const formData = request.formData()
  // we deserialize the string, transforming it into a number, all in the same line
  const age = v.parse(
    v.pipe(v.string(), v.transform(Number)),
    url.searchParams.get('v'),
  )
  console.log("age", age) // "age" 23
}
export default function() {
  return (
    <Form method="POST">
      <input
        name="age"
        // we serialize the number to string, because data needs to travel as string
        value={String(23)}
        type="hidden"
      />
      <button type="primary">Enviar age</button>
    </Form>
  )
}
```
