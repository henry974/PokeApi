import { AppError } from "@domain/errors/app.error";
import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";

export class DeletePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepositoryContract) {}

  async execute(id: string): Promise<void> {
    const wasDeleted = await this.pokemonRepository.delete(id);

    if (!wasDeleted) {
      throw new AppError('Pokémon não encontrado para exclusão',400);
    }
  }
}