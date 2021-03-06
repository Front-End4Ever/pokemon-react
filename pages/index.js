import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";

function getPokemon(URL) {
  return fetch(URL).then((r) => r.json());
}

function PokemonPopUp({ data, setOpen, open }) {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <div className={styles.dialog}>
        <DialogTitle>{data.name}</DialogTitle>
        <Image
          alt="pokemon sprite"
          src={data.sprites.front_default}
          width="100px"
          height="100px"
        ></Image>

        {/* loops through type array and renders all types... map goes through the current array and turns it into a new array*/}
        <label style={{display: "block"}}>Type:</label>
        <div className={styles.type}>
          {data.types.map((type) => (
            <strong key={type.type.url}>{type.type.name}</strong>
          ))}
        </div>
        <label>Height:</label>

        <span>{data.height}</span>

        {/* abilities is a list so you have to map over the abilities */}
        <label style={{display: "block"}}>Abilities:</label>
        <div className={styles.ability}>
          {data.abilities.map((ability) => (
            <strong key={ability.ability.url}>{ability.ability.name}</strong>
          ))}
        </div>
      </div>
    </Dialog>
  );
}

// creating a component that will render our pokemon
function Pokemon({ pokemon }) {
  //getter and setter
  //making a new state variable and starting it out as false
  const [open, setOpen] = React.useState(false);

  const { data } = useSWR(pokemon.url, getPokemon);
  console.log(data);
  if (!data) {
    return "Loading...";
  }
  return (
    // reacts way of grouping together things w/o a DOM elememt
    <>
      {/* //whenever the card is clicked it will open */}
      <PokemonPopUp data={data} setOpen={setOpen} open={open}></PokemonPopUp>
      <div className={styles.card} onClick={() => setOpen(true)}>
        <Image
          alt="pokemon sprite"
          src={data.sprites.front_default}
          width="100px"
          height="100px"
        ></Image>
        <h2>{pokemon.name}</h2>
      </div>
    </>
  );
}

function PokemonGrid() {
  const limit = 20;
  const [offset, setOffset] = React.useState(0);
  const { data } = useSWR(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    getPokemon
  );
  const page = offset / limit + 1;
  console.log(page);
  console.log(data);

  // data represents the original pokemon, so we useState to identify searched results
  const [searchedPokemon, setSearchedPokemon] = React.useState();

  if (!data) {
    return "Loading...";
  }

  // if there's searched pokemon we use the useState variable, otherwise we display all of the results
  const pokemon = searchedPokemon || data.results;
  return (
    <>
      <div className={styles.search}>
        <TextField
          onChange={(e) => {
            console.log(e.target.value);
            const value = e.target.value?.toLowerCase();
            setSearchedPokemon(
              data.results.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(value)
              )
            );
          }}
          id="outlined-basic"
          label="Search Pokemon"
          variant="outlined"
          color="tertiary"
        />
      </div>
      <div className={styles.pagination}>
        <Pagination
          size="large"
          count={Math.ceil(data.count / limit)}
          color="primary"
          page={page}
          // whenever user clicks on the page we set the offset to the value of the page they clicked
          onChange={(event, value) => {
            setOffset((value - 1) * limit);
          }}
        />
      </div>
      <div id="poke-card" className={styles.grid}>
        {/* in the data you get an array of pokemon in the results. this is looping through each item in the results array and rendering an anchor element for each pokemon */}
        {pokemon.map((pokemon) => {
          // turning pokemon data into a new custom component
          return <Pokemon key={pokemon.url} pokemon={pokemon}></Pokemon>;
        })}
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta
          name="description"
          content="An electronic device created and designed to catalog and provide information regarding the various species of Pok??mon."
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Who&apos;s that Pokemon?!
          {/* e stands for event listener */}
          {/* pokemon name includes the value that the user types in... filtering results and setting the searched pokemon to the filtered results */}
        </h1>
        <PokemonGrid></PokemonGrid>
      </main>
    </div>
  );
}
