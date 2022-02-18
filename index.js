const pokemon = fetch("https://pokeapi.co/api/v2/pokemon?limit=151")

pokemon.then(result => {
  result.json().then(data => {
    myData(data);
  })
});
function myData(data) {
  console.log(data);
}

