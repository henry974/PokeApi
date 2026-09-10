import { Request,Response } from "express";
import { CreatePokemonUseCase } from "@application/use-cases/createPokemon";
import { FindByIdUseCase } from "@application/use-cases/findById";
import { ListAllUseCase } from "@application/use-cases/listAll";

export class PokemonController{
    constructor(
        private createPokemonUseCase : CreatePokemonUseCase,
        private findByIdUseCase : FindByIdUseCase,
        private listAllUseCase : ListAllUseCase

    ){}
    async create(req: Request,res: Response): Promise<Response>{
        const {id,name,type,hp,rarity,nickname='sem apelido' } = req.body;
        const pokemon = await this.createPokemonUseCase.execute({id,name,type,hp,rarity,nickname});
        return res.status(201).json({message:'Pokemon Criado com Sucesso',data: {id:pokemon.id,name:pokemon.name}});

    }
    async list(req: Request,res: Response): Promise<Response>{
        const pokemons = await this.listAllUseCase.execute();
        const formattedPokemons = pokemons.map((pokemon)=> ({
            id: pokemon.id,
            name: pokemon.name,
            type: pokemon.type,
            hp: pokemon.hp,
            rarity: pokemon.rarity,
            nickname: pokemon.nickname
        }));
        return res.status(200).json({data:formattedPokemons});
        
    }
}