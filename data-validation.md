# Data validation

To perform this validation process, we'll use [`valibot`'s `parse` method](https://valibot.dev/guides/parse-data/). This method allows us to perform an exahustive structure validation over an `unknown` piece of data

The output of this method can be two things: the data stored in a variable typed with high fidelity or an error. This process, as being the first thing we do for every _Request_ we receive, effectively means that we are controlling the exact data that enters our system

This makes our system less prone to errors and safer. Why safer? bacause even if people send malicious data, the only data we'll end up having is the one that matches the structure defined by the [`valibot schema`](https://valibot.dev/guides/schemas/) used with the `parse` method. If the data being checked doesn't match exactly the structure defined in schema, an error is [_thrown_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) and the application stops

`valibot` will be our swiss-knife library. Let's see some example on how to validate different types of data:

- Validate a number with `v.number`

```tsx
const UNKNOWN_NUMBER = 22
const number = v.parse(v.number(), UNKNOWN_NUMBER)
console.log("number", number) // "number" 22
```

- Validate a string with `v.string`

```tsx
const UNKNOWN_STRING = "Alfonso"
const string = v.parse(v.string(), UNKNOWN_STRING)
console.log("string", string) // "string" "Alfonso"
```

- Validate multiple things, all at once, with `v.pipe`

```tsx
const UNKNOWN_STRING = "Alfonso"
const string = v.parse(
    v.pipe(v.string(), v.minLength(4)),
    UNKNOWN_STRING
  )
)
console.log("string", string) // "string" "Alfonso"
```

In this case for example, we are validating: first, that is a string. Then, that the string is minimally 4 characters long

Let's go step by step over what this snippet of code does:

1. First we see the `pipe` method. What this will do is hand the validated result as the input for the next validation, so. Keep this in mind. It will start with the left-most validation (`v.string` in this case) and go one by one until it reaches the right-most validation (`v.minLength` in this case)
2. The first validation is that is a string using `v.string`: "is the variable UNKNOWN_STRING a valid string?" -> "yes"
3. Then this validated string is handed as input for the next step in the `v.pipe` operator, in this case, to the `v.minLength` method, so: "does the input string have a minimum of 4 characters?" -> "yes"
4. Validation is finished and the returned data is stored in the `string` variable

- Validate multiple things and transform with `v.transform`. In order to use `v.transform`, you have to use it along with `v.pipe` method

```tsx
const UNKNOWN_STRING = "22"
const number = v.parse(
    v.pipe(v.string(), v.transform(Number)),
    UNKNOWN_STRING
  )
)
console.log("number", number) // "number" 22
```

Let's go step by step over what this snippet of code does:

1. First we see the `pipe` method. What this will do is hand the validated result as the input for the next validation, so. It will start with the left-most validation (`v.string` in this case) and go one by one until it reaches the right-most validation (`v.transform` in this case)
2. The first validation is that is a `v.string`: "is the variable UNKNOWN_STRING a valid string?" -> "yes"
3. Then this validated string is handed as input for the next step in the `v.pipe` operator, in this case, to the `v.tranform` method, so: "can the input string be transformed to a valid number?" -> "yes"
4. Validation is finished and the data returned in stored in the `number` variable
