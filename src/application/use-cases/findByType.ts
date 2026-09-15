import { Pokemon } from "@domain/entities/pokemon";
import { AppError } from "@domain/errors/app.error";
import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";

export class FindByTypeCase{
    constructor(private pokemonRepository:IPokemonRepositoryContract){}
    async execute(type:string): Promise<Pokemon[]|null>{
        const pokemon = this.pokemonRepository.findByType(type);
        if(!pokemon){
           throw new AppError("Nenhum pokemon com esse tipo",404);
        }
        return pokemon;
    }
}