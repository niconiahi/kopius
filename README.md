This will hold all the documentation given for the React course

## Methodology

- Learn by example
- Do not omit steps, do not leave for later
- Write the code yourself
- Ask the AI for examplanations, plan with it. Do not ask for the final code to copy paste. You can ask to make you an explanatory example about what's explaning. It's usually a good idea, so that it's not only words

## Tech stack

- [`react-router` in framework mode](https://reactrouter.com/start/framework/installation)
- [Cloudflare](https://www.cloudflare.com/) as a deployment platform
- [valibot](https://valibot.dev/) for validating unknown data

## Concepts

### The holy grail: the HTTP protocol

One of the most important concepts you need to understand in modern web development is the HTTP protocol. This protocol states that the communication between clients and servers is going to be in the form of a Request/Response model: a client sends a [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) which the server receives, executes some code and returns a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response). One of the components for both requests and responses are URLs. One URL for example would be _https://www.youtube.com/watch?v=1hJKhiew2O0_

#### Characteristics found in this model

- The information travels as strings. This means that the structure of the information we send is lost when travelling. We'll consider the data received as `unknown` both conceptually and as its type. This is why for any _Response_ received, we'll extract it's data and perform a validation process

####  The URL anatomy

There are several parts to an URL, let's dig into some of them by examples

##### Search params

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const searchParam = url.searchParams.get("v")
console.log("searchParam", searchParam) // "searchParam" "YKRfTA-Vx9M"
```

##### Origin

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const origin = url.origin
console.log("origin", origin) // "origin" "https://www.youtube.com"
```

##### Pathname

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const pathname = url.pathname
console.log("pathname", pathname) // "pathname" "/watch"
```

##### Href

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const href = url.href
console.log("href", href) // "href" "https://www.youtube.com/watch?v=YKRfTA-Vx9M"
```

### Data validation

To perform this validation process, we'll use [`valibot`'s `parse` method](https://valibot.dev/guides/parse-data/). This method allows us to perform an exahustive structure validation over an `unknown` piece of data

The output of this method can be two things: the data stored in a variable typed with high fidelity or an error. This process, as being the first thing we do for every _Request_ we receive, effectively means that we are controlling the exact data that enters our system

This makes our system less prone to errors and safer, as even if people send malicious stuff, if the structure defined by the [`valibot schema`](https://valibot.dev/guides/schemas/) used with the `parse` method, then the program will error out

### Metaframework

#### Basic

A metaframework is a set of tools that allows our application to run both the client and the back end side of the application, all within the same codebase. Generally, every metaframework has some way of: loading dat, mutating data and rendering UI. NextJS, React Router, Solid Start, Svelte Kit, all of them do. We'll focus on `react-router`

#### react-router

We'll use `react-router` in its ["framework mode"](https://reactrouter.com/start/framework/installation) (this is the _metaframework_ mode for it). With it, we'll be able to: load data using the `loader` function, mutate data using the `action` function and rendering UI exporting a component as a default export

`react-router` heavily relies on the Request/Response model. Both _loader_ and _action_ receive a _Request_ and returns a _Response_, always

##### loader

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

##### action

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
