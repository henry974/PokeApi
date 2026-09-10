import { Pokemon, PokemonType,Rarity } from "@domain/entities/pokemon";
import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";
import { AppError} from '@domain/errors/app.error';

export interface CreatePokemonDTO{
    id : string;
    name : string;
    type : PokemonType;
    hp:number;
    rarity : Rarity;
    nickname? : string;
}

export class CreatePokemonUseCase {
    constructor(private pokemonRepository: IPokemonRepositoryContract ){}

    async execute(data: CreatePokemonDTO): Promise<Pokemon> {
        const pokemonAlreadyExists = await this.pokemonRepository.findById(data.id);
        if(pokemonAlreadyExists){
            throw new AppError('ja existe pokemon com esse id',400);
        }
        const pokemon = new Pokemon(data);
        await this.pokemonRepository.save(pokemon);
        return pokemon;    
    }
}