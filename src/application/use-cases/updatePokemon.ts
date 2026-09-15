import { Pokemon } from "@domain/entities/pokemon";
import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";
import { UpdatePokemonDTO } from "@application/dtos/updatePokemonDTO";
import { AppError } from "@domain/errors/app.error";


export class UpdatePokemonUseCase{
    constructor(private pokemonRepository: IPokemonRepositoryContract ){}
    async execute(data: UpdatePokemonDTO):Promise<Pokemon>{
        const pokemon = await this.pokemonRepository.findById(data.id);
        if(!pokemon){
            throw new AppError('Pokemon não encontrado para atualização',400);
        }
        pokemon.updateProps({
            name: data.name,
            type: data.type,
            hp: data.hp,
            rarity: data.rarity,
            nickname: data.nickname
        });
        await this.pokemonRepository.update(pokemon);
        return pokemon
    }
}