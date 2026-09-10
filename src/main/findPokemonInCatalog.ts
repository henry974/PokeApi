
type SearchIdentifier = string | number;

function findPokemonInCatalog(identifier: SearchIdentifier){
    if(typeof identifier === 'number'){
        console.log(`Buscando por Pokedex ID: `)
    }else{
        console.log(`Buscando por Nome: `)
    }
}