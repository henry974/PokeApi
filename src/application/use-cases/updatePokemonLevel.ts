import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";
import { UpdatePokemonLevelDTO } from "@application/dtos/updatePokemonLevel";
import { Pokemon } from "@domain/entities/pokemon";

export class UpdatePokemonLevelUseCase {
    constructor(private repository: IPokemonRepositoryContract) {}

    async execute({ id, level }: UpdatePokemonLevelDTO): Promise<Pokemon> {
        const pokemon = await this.repository.findById(id);
        if (!pokemon) throw new Error('Pokemon nao encontrado');

        pokemon.updateLevel(level);
        const updated = await this.repository.update(pokemon);
        return updated!;
    }
}