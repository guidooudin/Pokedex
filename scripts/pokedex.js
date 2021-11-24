const pokeCard = document.querySelector('.poke-card');
const pokeName = document.querySelector('.poke-name');
const pokeImg = document.querySelector('.poke-img');
const pokeImgContainer = document.querySelector('.img-container');
const pokeType = document.querySelector('.poke-types');
const pokeId = document.querySelector('.poke-id');
const pokeStats = document.querySelector('.poke-stats');
const form = document.querySelector('form');


const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    dark: '#2E2320',
    default: '#2A1A1F',
};
// The form search for the pokemon everytime it submits

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { value } = e.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
        
})

//I render the pokemon data
const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const {types, stats } = data;
    console.log(data);
    pokeName.innerText = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.innerText = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    
}

//I change the color of the card depending on the type
const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

//I render the type of the pokemon
const renderPokemonTypes = types => {
    pokeType.innerHTML = '';
    types.forEach(type => {
        const typeElement = document.createElement('div');
        typeElement.classList.add('type');
        typeElement.style.color = typeColors[type.type.name];
        typeElement.innerText = type.type.name;
        pokeType.appendChild(typeElement);
    })
    
}

//I render the stats of the pokemon
const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.innerText = stat.stat.name;
        statElementAmount.innerText = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.innerText = 'No encontrado';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background =  '#fff';
    pokeType.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.innerText = '';
}