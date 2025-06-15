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

### Request that write

If the `method` has the value of `POST`, `DELETE` or `PUT`, then it's a request that intend to mutate some data. These requests:

- May have a `url.formData` (most possibly, you will)
- May have `url.searchParams` available

All other types of requests, are going to be handled by the `react-router`'s `action` function

## Characteristics found in this model

- The information travels as strings. This means that the structure of the information we send is lost when travelling. We'll consider the data received as `unknown` both conceptually and as its type. This is why for any _Response_ received, we'll extract it's data and perform a validation process

##  The URL anatomy

There are several parts to an URL, let's dig into some of them by examples

### Search params

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const searchParam = url.searchParams.get("v")
console.log("searchParam", searchParam) // "searchParam" "YKRfTA-Vx9M"
```

### Origin

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const origin = url.origin
console.log("origin", origin) // "origin" "https://www.youtube.com"
```

### Pathname

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const pathname = url.pathname
console.log("pathname", pathname) // "pathname" "/watch"
```

### Href

```tsx
const url = new URL("https://www.youtube.com/watch?v=YKRfTA-Vx9M")
const href = url.href
console.log("href", href) // "href" "https://www.youtube.com/watch?v=YKRfTA-Vx9M"
```
