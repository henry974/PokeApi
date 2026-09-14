import { Pokemon } from "@domain/entities/pokemon";
import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";

export class FindByTypeCase{
    constructor(private pokemonRepository:IPokemonRepositoryContract){}
    async execute(type:string): Promise<Pokemon[]|null>{
        const pokemon = this.pokemonRepository.findByType(type);
        if(!pokemon){
            return null;
        }
        return pokemon;
    }
}