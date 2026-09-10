import { Request,Response } from "express";
import { CreatePokemonUseCase } from "@application/use-cases/createPokemon";
import { FindByIdUseCase } from "@application/use-cases/findById";
import { ListAllUseCase } from "@application/use-cases/listAll";
import { UpdatePokemonUseCase } from "@application/use-cases/updatePokemon";
import { DeletePokemonUseCase } from "@application/use-cases/deletePokemon";

export class PokemonController{
    constructor(
        private createPokemonUseCase : CreatePokemonUseCase,
        private findByIdUseCase : FindByIdUseCase,
        private listAllUseCase : ListAllUseCase,
        private updateUseCase : UpdatePokemonUseCase,
        private deleteUseCase: DeletePokemonUseCase,

    ){}
    async create(req: Request,res: Response): Promise<Response>{
        const {id,name,type,hp,rarity,nickname='sem apelido' } = req.body;
        const pokemon = await this.createPokemonUseCase.execute({id,name,type,hp,rarity,nickname});
        return res.status(201).json({message:'Pokemon Criado com Sucesso',data: pokemon.toJSON()});

    }
    async list(req: Request,res: Response): Promise<Response>{
        const {type} = req.query;
        
        const pokemons = await this.listAllUseCase.execute(type as string | undefined);
        const formattedPokemons = pokemons.map((pokemon)=> pokemon.toJSON());
        return res.status(200).json({data:formattedPokemons});
        
    }
    async findById(req:Request, res:Response): Promise<Response>{
        const {id} = req.params;
        const pokemon = await this.findByIdUseCase.execute(String(id));
        if(!pokemon){
            return res.status(404).json({message:'Pokemon nao entrado'});
        }
        return res.status(200).json({data: pokemon.toJSON()});
    }
    async update(req:Request, res: Response): Promise<Response>{
        const {id} = req.params;
        const { name, type, hp, rarity, nickname } = req.body;
        const pokemonAtualizado = await this.updateUseCase.execute({
           id:String(id),
            name,
            type,
            hp,
            rarity,
            nickname
        });
        return res.status(200).json({
            message:'Pokemon atualizado',
            data: pokemonAtualizado.toJSON()
        });
    }
    async delete(req:Request,res:Response):Promise<Response>{
    const { id } = req.params;

      await this.deleteUseCase.execute(String(id));

      return res.status(204).send();
    } 
}