import { Pokemon } from "@domain/entities/pokemon";
import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";

export class ListAllUseCase{
    constructor(private pokemonRepository: IPokemonRepositoryContract){}
    async execute(type?:string) : Promise<Pokemon[]>{
        return await this.pokemonRepository.findAll();
    }
}