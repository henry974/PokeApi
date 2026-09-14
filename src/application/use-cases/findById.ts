import { Pokemon } from "@domain/entities/pokemon";
import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";

export class FindByIdUseCase{
    constructor(private pokemonRepository:IPokemonRepositoryContract){}
    async execute(id:string): Promise<Pokemon|null>{
        const pokemon = this.pokemonRepository.findById(id);
        if(!pokemon){
            //throw new ResourceNotFoundError ("Pokémon não encontrado no catálogo."); //implementar?
            return null;
        }
        return pokemon;
    }
}