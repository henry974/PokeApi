import { IPokemonRepositoryContract } from "@domain/repositories/pokemon.repository";

export class DeletePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepositoryContract) {}

  async execute(id: string): Promise<void> {
    const wasDeleted = await this.pokemonRepository.delete(id);

    if (!wasDeleted) {
      throw new Error('Pokémon não encontrado para exclusão');
    }
  }
}