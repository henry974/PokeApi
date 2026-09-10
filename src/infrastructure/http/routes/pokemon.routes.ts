import { Router } from "express";
import { makePokemonController } from "@main/factories/makeUserController.factory";

const pokemonRoutes = Router();
const pokemonController = makePokemonController();


pokemonRoutes.get('/',(req,res) =>{
    
    return pokemonController.list(req,res);
});

pokemonRoutes.post('/' , (req,res) =>{
    return pokemonController.create(req,res);
})

export {pokemonRoutes};