# State

### Normal states

```jsx
const [name, setName] = useState("Ana")
```

### Derived states

I calculate the value for this state using previously declared variables. In this next example, the `fullName` value is calculated using the values of `name` and `surname`

In other others, the `fullName` is _composed_ from `name` and `surname` values

```jsx
const [name, setName] = useState("Ana")
const surname = "Gonzalez"
const fullName = `${name} ${surname}`
```
