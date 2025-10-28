# Typescript

In Typescript we have many different data types. The amount is the same as Javascript, given that Typescript is a _superset_ for Javascript. This means, in essence, that every Javascript code is valid Typescript code, but not the other way around

Typescript will determine the type via _inference_ or _explicit type annotations_

## Definition

### string

In this next example, a _string_ is declared. It's type is _inferred_ as it's not being _explicitely annotated_

```js
const name = 'Victor'
```

You can also declare _explicitely_


```ts
const name: string = 'Victor'
```

This way, you are telling Typescript that this `name` variable is always expected to be a _string_. If you try storing a new value into `name` that's not a _string_, the Typescript compiler will show an error

```ts
const name: string = 'Victor'
name = 3 // this will show an error
```

### array

In this next example, an _array of strings_ is declared. It's type is _inferred_ as it's not being _explicitely annotated_

```ts
const names = ['Victor', 'Maria']
```

You can also declare _explicitely_

```ts
const names: string[] = ['Victor', 'Maria']
```

### object

In this next example, an _object_ is declared. It's type is _inferred_ as it's not being _explicitely annotated_

```ts
const person = { name: "Victor", surname: "Menendez" }
```

You can also declare _explicitely_

```ts
type Person = {
  name: string,
  surname: string
}
const person: Person = { name: "Victor", surname: "Menendez" }
```

You can also combine `object` + `array`

```ts
type Person = {
  name: string,
  surname: string
}
const people: Person[] = [{ name: "Victor", surname: "Menendez" }]
```

### number

```js
const age = 22
```

## Actions I can execute on them

You can execute the very same actions as you can in [Javascript](./javascript.md) as Typescript _does not_ functionality to the language, only types
