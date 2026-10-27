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
            
            name : data.name,
            type1 : data.type1,
            type2: data.type2,
            level: data.level,
            hp: data.hp,
            attack: data.attack,
            defense: data.defense,
            special_attack: data.special_attack,
            special_defense: data.special_defense,
            speed: data.speed,
            nickname: data.nickname
        });
        await this.pokemonRepository.update(pokemon);
        return pokemon
    }
}