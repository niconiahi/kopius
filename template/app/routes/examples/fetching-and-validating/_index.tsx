import { useEffect, useState } from "react"
import * as v from "valibot"

const PersonSchema = v.object({
  name: v.string(),
  height: v.string(),
  mass: v.string(),
  hair_color: v.string(),
  skin_color: v.string(),
  eye_color: v.string(),
  birth_year: v.string(),
  gender: v.string(),
  homeworld: v.string(),
  films: v.array(v.string()),
  species: v.array(v.string()),
  vehicles: v.array(v.string()),
  starships: v.array(v.string()),
  created: v.string(),
  edited: v.string(),
  url: v.string(),
})
type Person = v.InferOutput<typeof PersonSchema>

export default function () {
  const [person, setPerson] = useState<Person | null>(null)
  useEffect(() => {
    async function run() {
      const person = await fetch(
        "https://swapi.dev/api/people/1",
      )
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          const person = v.parse(PersonSchema, data)
          return person
        })
        .catch((error) => {
          throw new Error("error while fetching a person", {
            cause: error,
          })
        })
      setPerson(person)
    }
    run()
  }, [])
  return (
    <h1 className="text-red-500">
      {person?.name ?? "no person yet"}
    </h1>
  )
}
