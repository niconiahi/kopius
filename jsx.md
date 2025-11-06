# JSX

JSX is React's opinion on [template engine](https://www.fullstackpython.com/template-engines.html). It allows you to combine HTML + JS

So take this HTML for example:

```html
<ul>
  <li><span>section 1</span></li>
  <li><span>section 2</span></li>
  <li><span>section 3</span></li>
</ul>
```

You can write this in JSX like so:

```jsx
function Component() {
  const sections = [1, 2, 3]
  return (
    <ul>
      {sections.map((section) => {
        const id = `section-${section}`
        return (
          <li key={id}><span>section {section}</span></li>
        )
      })}
    </ul>
  )
}
```

As you can see, you can use Javascript to [programmatically](#programmatically) create pieces of HTML

Let's disect the example:

1. We are setting the attribute _value_ dinamically

```jsx
<li key={id}>//the other stuff</li>
```

2. We are setting the `span`'s [HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)'s _content_ dinamically

```jsx
<span>section {section}</span>
```

3. We are creating each `<li>` dinamically based on an existing array

```jsx
<ul>
  {sections.map((section) => {
    const id = `section-${section}`
    return (
      <li key={id}>//the other stuff</span></li>
    )
  })}
</ul>
```

## Important note

You will always be able to determine if you are about to start writting _JSX_ or _HTML_ because of the curly braces `{}`

Consider this _HTML valid_ `<li>` element

```html
<li key="section-1">//the other stuff</li>
```

You would do archieve the same with JSX doing the following

```jsx
function Component() {
  const id = 'section-1'
  return <li key={id}>//the other stuff</li>
}
```

The expectation is that between `{}` you write valid _JSX_ code

Valid _JSX_ code includes:

1. Assigning _HTML attributes_ values dinamically

```tsx
<li key={id}>//the other stuff</li> // id is a valid Javascript exception
```

2. Returning _HTML_

```tsx
function Component() {
  return <span>some content</span>
}
```

3. Setting _HTML_ content dinamically

```tsx
function Component({ name }: { name: string }) {
  return <span>the name is {name}</span>
}
```

4. Sending data from parent to child via _props_

```tsx
function Parent() {
  const name = 'Silvio'
  return <Child name={name} />
}
function Child({ name }: { name: string }) {
  return <span>the name is {name}</span>
}
```

## Dictionary

###### programmatically

That is done through code
