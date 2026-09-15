import { Pokemon } from "@domain/entities/pokemon";
import { AppError } from "@domain/errors/app.error";
import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";

export class FindByIdUseCase{
    constructor(private pokemonRepository:IPokemonRepositoryContract){}
    async execute(id:string): Promise<Pokemon|null>{
        const pokemon = this.pokemonRepository.findById(id);
        if(!pokemon){
            throw new AppError ("Pokémon não encontrado no catálogo.",404);
        }
        return pokemon;
    }
}