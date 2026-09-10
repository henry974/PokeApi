import {IPokemon} from '@main/enums';

interface IPokemonRepositoryContract{
    save(pokemon: IPokemon): Promise<IPokemon>;
    findAll(): Promise<IPokemon[]>;
    findById(id: string): Promise<IPokemon | null>;
}

export class MockPokemonRepository implements IPokemonRepositoryContract{
    private pokemons : IPokemon[] = [];
    async save(pokemon: IPokemon): Promise<IPokemon> {
        const newPokemon:IPokemon = {
            id:pokemon.id,
            name:pokemon.name,
            type:pokemon.type,
            hp:pokemon.hp,
            rarity:pokemon.rarity,
            nickname : pokemon.nickname ?? pokemon.name
        }
        this.pokemons.push(newPokemon);
        return newPokemon;
    }
    async findAll(): Promise<IPokemon[]> {
        return this.pokemons;
    }
    async findById(id: string): Promise<IPokemon | null> {
        const pokemonEncontrado = this.pokemons.find((p)=> p.id === id);
        if(!pokemonEncontrado){
            return null;
        }
        return pokemonEncontrado;
    }
}