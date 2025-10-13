# Wishful thinking

What does this idea entail? It's very straightforward: when you are about to start implementing _any_ feature, you will first think: "how would I like consuming this API"? "how do I wish to interact with this API"?

## Example

Let's say I need to get the owner for a given property. How would you write the code for it? You don't know yet, right? It depends. Will I be fetching it from a database? will I be fetching it from LocalStorage? the are a lot of options

### What's my wish?

Well, for starters, I know I would like seeing something like this:

```tsx
const owner = fetchOwner(propertyId)
```

Makes sense? I start by writing the how I want to _consume_ the information. This is _my wish_. I'm _wishfully thinking_ how I want to interact with the code

### Implement

Once I have this, I can start writting the function. Whatever code needs to be written to fulfill the task.

```tsx
function fetchOwner(propertyId: number) {
  // I don't even know yet what's going to be here
}
```

Let's say that in this case, I'll be reading the owner from LocalStorage


```tsx
function fetchOwner(propertyId: number) {
  const owner = v.parse(
    OwnerSchema,
    localStorage.get('owner')
  )
  return owner
}
```

Done.

### Positive extra points

The fact that we write the function in this modular fashion

```tsx
const owner = fetchOwner(propertyId)
```

It means that in the future, `fetchOwner` internal code can change and the change will spread all over the app. Just making a change in one place, it will change it everywhere. Let's say we will start reading the _owner_ from the database.


```tsx
function fetchOwner(propertyId: number) {
  const owner = v.parse(
    OwnerSchema,
    query_builder
      .selectFrom('user')
      .innerJoin('user', 'user.id', 'property.user_id')
      .where('user.role', '=', USER_ROLE.OWNER)
      .select(['owner.name'])
      .executeTakeFirstOrThrow()
  )
  return owner
}
```

I'll still keep on receiving a _owner_. I hid the complexity behind a function
