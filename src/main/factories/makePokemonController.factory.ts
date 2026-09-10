import { CreatePokemonUseCase } from "@application/use-cases/createPokemon";
import { ListAllUseCase } from "@application/use-cases/listAll";
import { FindByIdUseCase } from "@application/use-cases/findById";
import { UpdatePokemonUseCase } from "@application/use-cases/updatePokemon";
import { DeletePokemonUseCase } from "@application/use-cases/deletePokemon";
import { PokemonController } from "@infrastructure/http/controllers/pokemon.controller";
import { InMemoryPokemonRepository } from "@infrastructure/database/in-memory/inMemoryPokemon.repository";

const PokemonRepository = new InMemoryPokemonRepository();

export function makePokemonController(): PokemonController{
    const createPokemonUseCase = new CreatePokemonUseCase(PokemonRepository);
    const listAllUseCase = new ListAllUseCase(PokemonRepository);
    const findByIdUseCase = new FindByIdUseCase(PokemonRepository);
    const deleteUseCase = new DeletePokemonUseCase(PokemonRepository);
    const updateUseCase = new UpdatePokemonUseCase(PokemonRepository);

    return new PokemonController(createPokemonUseCase,findByIdUseCase,listAllUseCase,updateUseCase,deleteUseCase);
}