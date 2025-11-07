# Feedback

### Never write code in spanish

We don"t want to see or read any code that"s not English

### Never work without formatting

We don"t want to lose _ANY_ time manually formatting the code. If it doesn"t work, take the time until it"s working

### Always open the function body

Don"t do an _implicit return_ when creating functions

```tsx
<input onChange={(f) => setFilter({ ...filter, name: f.target.value })}/>
```

Instead, always _open_ the body of the function

```tsx
<input 
  onChange={(f) => {
    setFilter({ ...filter, name: f.target.value })}
  }
/>
```

Why? because say you have to add a `console.log` for debugging purposes. If you _don"t_ have the body of the function opened, you"d need to restructure the code just to add it. Let"s see it in an example

If I want to log `filter` just to see what"s there, or even the `f.target.value` in this case, I can"t do it

```tsx
<input onChange={(f) => setFilter({...filter, name:f.target.value})}/>
```

I would need to open the body of the function and add them

```tsx
<input onChange={(f) => {
  console.log("filter", filter)
  console.log("f.target.value", f.target.value)
  setFilter({ ...filter, name: f.target.value })}
}/>
```

So basically you are ending up having to write the `{}`. Then why not do it _from the get go_. No reason not to. So don"t do it

### Don"t create types as variables if you don"t reuse them

In this example, `filterProps` is a type that is only being used with the `Filter` component. It"s _declared_ outside of the component, not _inlined_. We want our types to be _inlined_, always

```tsx
type filterProps ={
  filter: {name: string, type: string},
  setFilter: (value: {name: string, type: string}) => void;
  types: string[];
}

function Filter ({filter , setFilter, types}: filterProps){
  return(
    <>
    <input value= {filter.name} type="text" onChange={(f) => setFilter({...filter, name:f.target.value})}/>
      <select
        value={filter.type}
        onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
        <option value="">All types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </>
  )
}
```

When I say _inline_, I"m speaking about this

```tsx
function Filter({
  filter,
  setFilter,
  types
}: {
  filter: { name: string, type: string },
  setFilter: (value: {name: string, type: string}) => void;
  types: string[];
}) {
  return(
    <>
    <input value= {filter.name} type="text" onChange={(f) => setFilter({...filter, name:f.target.value})}/>
      <select
        value={filter.type}
        onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
        <option value="">All types</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </>
  )
}
```

Why this is better? You have side by side, the _props_ being received *AND* their types

The only moment that we"ll want to extract a type is going to be we that type is reused in multiple parts of the application, for example:

```tsx
type User = {
  email: string
  name: string
  age: number
}
function App() {
  const [user, setUser] = useState<User>({
    email: "nico@kopius.com.ar",
    name: "Nicolas",
    age: 32
  })
  return (
    <>
      <NavigationBar user={user} />
      <Profile user={user} />
    </>
  )
}
function NavigationBar({ user }: { user: User }) {
  return (
    <nav>
      <h1>{user.email}</h1>
    </nav>
  )
}
function Profile({ user }: { user: User }) {
  return (
    <main>
      <span>{user.name}</span>
      <span>{user.age}</span>
    </main>
  )
}
```

### Prefer pure array methods over non-pure ones

Pure methods are the ones that instead of mutating the value of the array directly, they create a new array from that one

Take this example of _inpure_ array manipulation. What"s the inpure part here? the `.push` method, which mutates the `pokemons` array"s value. It does not return a new array

```tsx
const pokemons: Pokemon[] = [];
for (const p of parsed) {
  const responsePokemon = await fetch(p.url);
  const dataPokemon = await responsePokemon.json();
  const validatePokemon = v.parse(PokemonSchema, dataPokemon);
  pokemons.push(validatePokemon);
}
```

The pure way (the _React way_ of doing stuff is the _pure way_) of doing this is the following

```tsx
const pokemons = await Promise.all(
  parsed.map((parsedPokemon) => {
    const response = await fetch(url);
    const dataPokemon = await response.json();
    const validatePokemon = v.parse(PokemonSchema, dataPokemon);
    return validatePokemon
  })
)
```

### Restrict yourself to naming conventions when possible

Whenever you can, stay aligned with conventions so that you don"t have to think about names at all

Let"s take this key usage when iterating a list

```tsx
{types.map((type, index) => {
  const typeId = `type-${index}`;
  return <option key={typeId}>{type}</option>;
})}
```

Let"s _keep it simple_ by always using the same variable name. In this case `id`

```tsx
{types.map((type, index) => {
  const id = `type-${index}`;
  return <option key={id}>{type}</option>;
})}
```

This will give you one less problem to think about: "I need a `key` for my item on the list. OK -- I"ll create an `id` variable and use it". Always the same conventional pattern

### Don"t abstract functions unless is reused

Take this example, which creates a `capturePokemon` function that is oonly used in that button

```tsx
function capturePokemon(
  setCaptured: SetCaptured,
  captured: Captured,
  pokemon: Pokemon,
) {
  if (!captured.some((p) => p.name === pokemon.name)) {
    setCaptured([...captured, pokemon]);
  }
}
<button
  type="button"
  onClick={() => {
    capturePokemon(setCaptured, captured, pokemon);
  }}
>
  +
</button>
```

Let"s prefer _inlining_ the function if it"s only used in one place. So we don"t have to travel through the code to see what it does

```tsx
function capturePokemon(
  setCaptured: SetCaptured,
  captured: Captured,
  pokemon: Pokemon,
) {
}
<button
  type="button"
  onClick={() => {
    if (!captured.some((p) => p.name === pokemon.name)) {
      setCaptured([...captured, pokemon]);
    }
  }}
>
  +
</button>
```

Much cleaner in my opinion. I don"t have to go see what"s in `capturePokemon` to see what it does. It"s just right there

### Always declare your types next to your schemas

ALWAYS ALWAYS, right under you schema, extract and store the type for it

```tsx
const PokemonSchema = v.object({
  name: v.string(),
  sprites: PokemonSpritesSchema,
  types: v.array(TypesSchema),
});
type Pokemon = v.InferOutput<typeof PokemonSchema>
```

Don"t ever create your types manually

```tsx
const PokemonSchema = v.object({
  name: v.string(),
  sprites: PokemonSpritesSchema,
  types: v.array(TypesSchema),
});
// DON"T DO THIS
type Pokemon = {
  name: string,
  sprites: Array<{ front_default: string }>
  types: Array<{ type: { name: string } }>
}
```

### Try to keep the creation of new variables to a minimum

Here, _every process_ that the initial `pokemons` variable goes through, is stored in a new variable

```tsx
const pokemonsFilteredByName = nameSearch
  ? pokemons.filter((p) =>
      p.name.toLowerCase().includes(nameSearch.toLowerCase()),
    )
  : pokemons;
const pokemonsFilteredByType = typeSearch
  ? pokemonsFilteredByName.filter((p) =>
      p.types.find((t) => t.type.name === typeSearch),
    )
  : pokemonsFilteredByName;
```

We"ll prefer _chaining_ array methods together, like so:

```tsx
const pokemonsFiltered = pokemons
  .filter((pokemon) => {
    if (!nameSearch) {
      return true
    }
    return p.name.toLowerCase().includes(nameSearch.toLowerCase())
  })
  .filter((pokemon) => {
    if (!typeSearch) {
      return true
    }
    return p.types.find((t) => t.type.name === typeSearch)
  })
```

### Keep the number of props to a minimum

Take this code as an example

```tsx
<Card
  key={p.id}
  name={p.name}
  image={p.sprites.front_default}
  type={p.types.map((t) => t.type.name)}
  isCaptured={isCaptured}
  onCapture={() => capturePokemon(p)}
  state="list"
/>
```

In here, I"m seeing that are 3 props that are coming from a `p`: `p.name`, `p.sprites` and `p.types`. Also the `capturePokemon(p)`, which uses `p` as well.

Whenever you found yourself passing down many props whose values all come from the same variable (`p` in this case), just share the whole variable with that component. This means:

```tsx
<Card
  key={p.id}
  pokemon={p}
  isCaptured={isCaptured}
  state="list"
/>
```

Then inside `Card`

```tsx
function Card({ 
  pokemon, 
  isCaptured, 
  state 
}: { 
  pokemon: Pokemon, 
  isCaptured: boolean,
  state: "list" | "captured"
}) {
  const { name, sprites, types } = pokemon
  function onCapture() {
    capturePokemon(pokemon)
  }
  return (
      // the JSX here
  )
}
```

As as result, we get much less bloated components. The more props a component has, the more difficult is to read and follow its code

### Prefer inlining function over creating an early abstraction

Take this code as an example. The `searchPokemon` function is _only_ used in _one place_. Given that, we will prefer _inlining_ the function"s content right in the `onChange` prop

```tsx
function searchPokemon(e: React.ChangeEvent<HTMLInputElement>){
  setTextPokemon(e.target.value);
}
<input value={textPokemon} type="text" placeholder="Busca el Pokemon" onChange={searchPokemon}  />
```

Here is how this same code looks with the `searchPokemon` _inlined_

```tsx
<input
  value={textPokemon}
  type="text"
  placeholder="Busca el Pokemon"
  onChange={(e) => {
    setTextPokemon(e.target.value);
  }}
/>
```

### Don"t use "List" or "Array" as name for an array

Take this example, which has the `typesList` variable. The `List` part is totally redundant. The fact that is an array is signaled by either or not having an _s_

```tsx
const typesList: string[] = [];
for (const pokemon of pokemons) {
  for (const t of pokemon.types) {
    const type = t.type.name;
    if (!typesList.includes(type)) {
      typesList.push(type);
    }
  }
}
```

Here is how to name an array correctly, without the noise coming from having `List` or `Array` in its name

```tsx
const types: string[] = [];
for (const pokemon of pokemons) {
  for (const t of pokemon.types) {
    const type = t.type.name;
    if (!types.includes(type)) {
      types.push(type);
    }
  }
}
```

The golden rule: add `s` to the end of a variable to signal that"s a list/array. No more, no less

```tsx
const type = "rock"
const types = ["rock", "fire"]
```

### Don't use IIFE to calculate a variable's value

An [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) is a function that's _inmediately_ called after it's declaration

```tsx
const types = (() => {
  const allTypes: string[] = [];
  pokemons.forEach((pokemon) => {
    pokemon.types.forEach((typesArray) => {
      allTypes.push(typesArray.type.name);
    });
  });
  return [...new Set(allTypes)];
})();
```

Here is how to do it without it

```tsx
const types = [
  ...new Set(
    pokemons.flatMap((pokemon) => {
      return pokemon.types.map((type) => {
        return type.name
      })
    }),
  ),
]
```

### Don't use name constractions

No

```tsx
const updatedList = capturedPokemons.filter((c) => c.id !== p.id);
```

Prefer using explicit names

```tsx
const updatedList = capturedPokemons.filter((captured) => captured.id !== pokemon.id);
```
