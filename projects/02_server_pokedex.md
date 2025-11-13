# Server pokedex

## Knowledge

This application will introduce how, normally, a React client application interacts with a server, including:

- How the `Request` and `Response` model fits into a React's metaframework
- How to send data from the client and how to receive such data from the server, using the native [form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form)
- How to _load data_ in the server [loader](https://reactrouter.com/start/framework/data-loading) and hand it off to your client
- How to _recieve data_ in the server [action](https://reactrouter.com/start/framework/actions) by reading the `Request`'s [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and do something with it. Generally, storing it
- How to create an [URL](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL) from a `Request` or `Response` and what's the anatomy of it, including the [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

## By the end of this project

- Expect to understand the communication between your _client_'s React application with your _server_'s metaframework function
- Expect to understand exactly how the `form` element works
- You will have the same the functionality as [01_pokedex](./01_pokedex.md) but without any `useState` or `useEffect`, that is, no Javascript on the client
- Expect to understand what we are talking when talking about _bundle size_ and good pratices around it
- Expect to understand and how to use `URLSearchParams`
- Expect to understand and how to use `FormData`

## Description

- It will list pokemons showing their name, types and image
- The application will have two sections: the "uncatched" pokemons and the pokedex
- This application will allow adding, one of the "uncatched" pokemons, to the pokedex
- It will allow removing the added pokemon from the pokedex
- It will allow filtering the list of pokemons by name and pokemon type
- It will "remember" the pokemons that were added to the pokedex when refreshing the page

## Plan

1. All data fetching should occur in the `loader`
2. All _data normalization_ should occur in the `loader`
3. All data mutation should occur in the `action`, executed from a [FormSubmission](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data)
4. There shouldn't be any `useState`
5. Data persistance should be done with `cookies`, as opposed to `localStorage`

## Starting point

1. Run the command `npx create-react-router@latest --template remix-run/react-router-templates/cloudflare`
2. Install [biome](../formatter_and_linter.md)
