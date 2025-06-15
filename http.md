# The holy grail: the HTTP protocol

One of the most important concepts you need to understand in modern web development is the HTTP protocol. This protocol states that the communication between clients and servers is going to be in the form of a Request/Response model: a client sends a [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) which the server receives, executes some code and returns a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

One of the components for both requests and responses are the [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)s. An example of an _URL_ for example would be _https://www.youtube.com/watch?v=1hJKhiew2O0_

## Request method

There are two distinctive types of _Requests_:

- Requests that ask to read data
- Requests that ask to mutate data

This is signaled by the `url.method` property

### Request that read

If the `method` has the value of `GET`, then it's a request that intend to read some data. These requests:

- Won't have a `url.formData`
- May have `url.searchParams` available

All the `GET` requests, are going to be handled by the `react-router`'s `loader` function

### Request that mutate

If the `method` has the value of `POST`, `DELETE` or `PUT`, then it's a request that's intend to mutate some data. These requests:

- May have a `url.formData` (most possibly, they will)
- May have `url.searchParams` available

These other 3 types, are going to be handled by the `react-router`'s `action` function

## Characteristics found in this model

- The information travels as strings. This means that the structure of the information we send is lost when travelling. Say for example we want to send a list of people from end to the other, it will not travel as such, but as a stringified version of that list of people

Because of that, we'll consider the data received as _unknown_ both conceptually and as its type. This is why for any _Response_ received, the first thing we'll do it to perform an [exahustive validation process](./data-validation.md)

##  The URL anatomy

There are several parts to an URL, let's dig into some of them by examples

### searchParams

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const searchParam = url.searchParams.get("v")
console.log("searchParam", searchParam) // "searchParam" "YKRfTA-Vx9M"
```

### origin

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const origin = url.origin
console.log("origin", origin) // "origin" "https://www.youtube.com"
```

### pathname

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const pathname = url.pathname
console.log("pathname", pathname) // "pathname" "/watch"
```

### href

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const href = url.href
console.log("href", href) // "href" "https://www.youtube.com/watch?v=YKRfTA-Vx9M"
```

### formData

If the Request is of type `POST`, `DELETE` or `PUT`, it most surely was originated by a _form submission_. To perform such submission, we'll use [`Form`](https://reactrouter.com/api/components/Form) from `react-router` (see [`action` section](./metaframework.md#action))

But in here we'll focus on the [`FormData` part](https://developer.mozilla.org/en-US/docs/Web/API/FormData) which is part of the HTTP protocol, more specifically part of the URL

We'll check out it's API in depth

```tsx
// this "formData" we would usually get from "react-router"
const formData = new FormData();
formData.append('username', 'John');
formData.append('age', '30'); // numbers are not allowed, only strings, because remember, we can send only strings over the internet
const username = formData.get('username')
console.log('username', username) // "username" "John"
const age = formData.get('age')
console.log('age', age) // "age" "30"
```

There is one more important API: `formData.getAll`. This comes in handy when you want to capture multiple values of the same type. Let's consider the following example where we are capturing all the colors liked by the user. Let's see how that would happen

```tsx
// this "formData" we would usually get from "react-router"
const formData = new FormData()
formData.append('color', 'red')
formData.append('color', 'blue')
formData.append('color', 'yellow')
// note the plural on "colors" variable name. That's intended
const colors = formData.getAll('color')
console.log('colors', colors) // "colors" "John"
```
