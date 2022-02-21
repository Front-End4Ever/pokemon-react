import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

function getPokemon(URL) {
  return fetch(URL).then((r) => r.json());
}
// creating a component that will render our pokemon
function Pokemon({ pokemon }) {
  //getter and setter
  //making a new state variable and starting it out as false
  const [open, setOpen] = React.useState(false)
  return (
    //whenever the card is clicked it will open 
    <div onClick={() => setOpen(true)} className={styles.card}>
      <h2>{pokemon.name}</h2>
      <p>Find in-depth information about Next.js features and API.</p>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Set backup account</DialogTitle>
      </Dialog>
    </div>
  );
}
export default function Home() {
  const { data } = useSWR(
    "https://pokeapi.co/api/v2/pokemon?limit=151",
    getPokemon
  );
  console.log(data);
  if (!data) {
    return "Loading...";
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta
          name="description"
          content="An electronic device created and designed to catalog and provide information regarding the various species of Pokémon."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className={styles.grid}>
          {/* in the data you get an array of pokemon in the results. this is looping through each item in the results array and rendering an anchor element for each pokemon */}
          {data.results.map((pokemon) => {
            // turning pokemon data into a new custom component
            return <Pokemon key={pokemon.url} pokemon={pokemon}></Pokemon>;
          })}
        </div>
      </main>
    </div>
  );
}
