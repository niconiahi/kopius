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

You will always be able to determine if you should be writting Javascript (or Typescript) or not by looking at the `{}`

So let's see this why the previous example:

```jsx
<li key={id}>//the other stuff</li>
```

The HTML version of this would be 

```html
<li key="section-1">//the other stuff</li>
```

What I'm trying to ilustrate is this

> The delimiter that you are about to write Javascript instead of HTML are the `{}`

See them again:

1. The `{id}` part is expected to be Javascript

```jsx
<li key={id}>//the other stuff</li>
```

2. The `{section}` part is expected to be Javascript

```jsx
<span>section {section}</span> 
```

3. The `{sections.map()}` part is expected to be Javascript

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

If you have a sharp eye, you may tell me: "But returning HTML is not valid Javascript". And you'd be totally correct

The actual expectation is not that between `{}` valid Javascript code is run but valid _JSX_ code. What this essentially means is that now your Javascript is allowed to return HTML

## Dictionary

###### programmatically

That is done through code
