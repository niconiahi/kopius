import { useEffect, useState } from "react";
import "./App.css";
import * as v from "valibot";

const AbilitySchema = v.object({
  ability: v.object({
    name: v.string(),
    url: v.string(),
  }),
  is_hidden: v.boolean(),
  slot: v.number(),
});
const PokemonSchema = v.object({
  id: v.number(),
  name: v.string(),
  abilities: v.array(AbilitySchema),
});

type Person = {
  name: string;
  age: number;
};

function App() {
  const [user, setUser] = useState("Jose");
  const [person, setPerson] = useState<Person>({ name: "Matias", age: 22 });
  const [validPerson, setValidPerson] = useState<Person | null>(null);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    const PersonSchema = v.object({
      name: v.string(),
      age: v.number(),
    });
    sdfisadfsadfasdff;
    const validPerson = v.parse(PersonSchema, person);
    setValidPerson(validPerson);
  }, [person]);

  // 1. useEffect
  useEffect(() => {
    // top level promise gotcha
    async function run() {
      // 2. Response
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
      const data = await response.json();
      console.log("data", data);
      // 3. schema validation
      const pokemon = v.parse(PokemonSchema, data);
      console.log("pokemon", pokemon);
    }
    run();
  }, []);

  return (
    <main>
      <h1>Typescript lesson</h1>
      <button
        type="button"
        onClick={() => {
          setUser("Manu");
          setPerson({ name: "Lala", age: 35 });
        }}
      >
        change name
      </button>
      {validPerson ? <span>the valid person is {validPerson.name}</span> : null}
    </main>
  );
}

export default App;
