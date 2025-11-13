import { Form, redirect } from "react-router";
import type { Route } from "./+types/home";
import * as v from "valibot";

const INTENT = {
  SET_NAME: "set_name",
  SET_AGE: "set_age",
  REMOVE_AGE: "remove_age",
};

const PokemonSchema = v.object({
  name: v.string(),
  id: v.number(),
});

export async function action({ request }: Route.LoaderArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case INTENT.SET_NAME: {
      const name = v.parse(v.string(), formData.get("name"));
      const url = new URL(request.url);
      url.searchParams.set("name", name);
      return redirect(url.toString());
    }
    case INTENT.SET_AGE: {
      const age = v.parse(v.string(), formData.get("age"));
      const url = new URL(request.url);
      url.searchParams.set("age", age);
      return redirect(url.href);
    }
    case INTENT.REMOVE_AGE: {
      const url = new URL(request.url);
      url.searchParams.delete("age");
      return redirect(url.href);
    }
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const name = v.parse(v.string(), url.searchParams.get("name"));
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const data = await response.json();
  const pokemon = v.parse(PokemonSchema, data);
  return { name, pokemon };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { name, pokemon } = loaderData;
  return (
    <main>
      <p>{name}</p>
      <p>{pokemon.name}</p>
      <Form method="POST">
        <p>
          <label htmlFor="name">Name</label>
          <input style={{ border: "1px solid #0f0" }} id="name" name="name" />
        </p>
        <button type="submit" name="intent" value={INTENT.SET_NAME}>
          Change name
        </button>
      </Form>
      <Form method="POST">
        <p>
          <label htmlFor="age">Age</label>
          <input
            style={{ border: "1px solid #0f0" }}
            id="age"
            name="age"
            type="number"
          />
        </p>
        <input name="secret" type="hidden" value="thi2isasc3ret" />
        <button type="submit" name="intent" value={INTENT.SET_AGE}>
          Change age
        </button>
        <button type="submit" name="intent" value={INTENT.REMOVE_AGE}>
          Remove age
        </button>
      </Form>
    </main>
  );
}
