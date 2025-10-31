import { useEffect, useState } from "react";
import "./App.css";
import * as v from "valibot";

// NOTE:
// 1. useEffect
// 2. fetch
// 3. Response
// 4. validation schema
// 5. data structure is lost when data travels through the internet => type "any"
// 6. derived state

function App() {
  const [name, setName] = useState("Jose");

  // 6. derived state
  const fullName = `${name} Garcia`;

  // 1. useEffect
  useEffect(() => {
    // runs only once on creation
    console.log("runs only once on creation");
  }, []);

  // 1. useEffect
  useEffect(() => {
    // runs every time "name" changes
    const fullName = `${name} Garcia`;
    console.log("fullName", fullName);
  }, [name]);

  // 1. invalid useEffect usage because of top level "async"
  // useEffect(async () => {
  //   const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  // }, []);

  // 1. useEffect
  useEffect(() => {
    async function run() {
      // 2. fetch
      // 3. Response
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
      console.log("response", response);
      // 5. data structure is lost when data travels through the internet => type "any"
      const data = await response.json(); // this deserializes the binary data into json
      console.log("data", data);
      // 4. validation schema
      const PokemonSchema = v.object({
        id: v.number(),
        name: v.string(),
      });
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
          setName("Maria");
        }}
      >
        change name
      </button>
      {/* 7. conditional rendering using ternary */}
      {fullName ? <span>{fullName}</span> : null}
    </main>
  );
}

export default App;
