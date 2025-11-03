# Pokedex

## Knowledge

This application will work as a warm up for our foundational skills, including:

- Base React's APIs: [useState](https://react.dev/reference/react/useState), [useEffect](https://react.dev/reference/react/useEffect)
- React's template engine called [jsx](https://react.dev/learn/writing-markup-with-jsx)
- React's foundational concept called [rendering](https://react.dev/learn/render-and-commit), required for being able to follow the code flow
- [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) model, through the usage of [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- Schema validation understanding and usage
- What _data persistance_ is and how to use it?

## By the end of this project

- Expect to to understand and feel confortable using `JSX`
- Expect to feel confortable working with arrays in React
- Expect to feel confortable using `useEffect` and `useState`
- Expect to feel confortable following the flow of execution of your React application's code
- Expect to understand and feel confortable knowing when and how to use a _validation schema_, which transform an unknown piece of data into a known piece of data
- Expect to understand and feel confortable when and how to _persist data_

## Description

- It will list pokemons showing their name, types and image
- The application will have two sections: the "uncatched" pokemons and the pokedex
- This application will allow adding, one of the "uncatched" pokemons, to the pokedex
- It will allow removing the added pokemon from the pokedex
- It will allow filtering the list of pokemons by name and pokemon type
- It will "remember" the pokemons that were added to the pokedex when refreshing the page

## Repository

- Link to [Github](https://github.com/niconiahi/kopius/blob/main/projects/01_pokedex.md)

## Demo

- Link to the [demo](https://e798bb48.pokedex-cdm.pages.dev)

## Endpoints

To list pokemons: `https://pokeapi.co/api/v2/pokemon?limit=${AMOUNT}&offset=0`
To get detailed information about a given Pokemon: `https://pokeapi.co/api/v2/pokemon/${ID_POKEMON}`

Endpoints are called with [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Starting point

1. Run the command `npm create vite@latest 01_pokedex -- --template react-ts`
2. Install [biome](../formatter_and_linter.md)
