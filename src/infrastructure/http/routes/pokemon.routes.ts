import { Router } from "express";
import { makePokemonController } from "@main/factories/makePokemonController.factory";

const pokemonRoutes = Router();
const pokemonController = makePokemonController();


pokemonRoutes.get('/',(req,res) =>{
    /* 
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Lista todos os Pokémons'
      #swagger.description = 'Retorna a lista completa de Pokémons ou filtrada por tipo.'
      #swagger.parameters['type'] = {
        in: 'query',
        description: 'Filtrar por tipo de Pokémon (ex: fire, water)',
        type: 'string',
        required: false
      }
      #swagger.responses[200] = {
        description: 'Lista de Pokémons retornada com sucesso',
        schema: {
          data: [{ $ref: "#/definitions/Pokemon" }]
        }
      }
    */
    return pokemonController.list(req,res);
});
pokemonRoutes.get('/:id', (req, res) => {
    /* 
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Busca um Pokémon pelo ID'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do Pokémon',
        required: true,
        type: 'string'
      }
      #swagger.responses[200] = {
        description: 'Pokémon encontrado com sucesso',
        schema: {
          data: { $ref: "#/definitions/Pokemon" }
        }
      }
      #swagger.responses[404] = {
        description: 'Pokémon não encontrado',
        schema: { $ref: "#/definitions/ErrorResponse" }
      }
    */
    return pokemonController.findById(req, res);
});

pokemonRoutes.post('/' , (req,res) =>{
    /* 
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Cria um novo Pokémon'
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/definitions/createPokemonDTO" }
          }
        }
      }
      #swagger.responses[201] = {
        description: 'Pokémon criado com sucesso',
        schema: {
          message: 'Pokemon Criado com Sucesso',
          data: { $ref: "#/definitions/Pokemon" }
        }
      }
    */
    return pokemonController.create(req,res);
});

pokemonRoutes.put('/:id',(req,res)=>{
    /* 
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Atualiza um Pokémon existente'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do Pokémon a ser atualizado',
        required: true,
        type: 'string'
      }
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/definitions/createPokemonDTO" }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Pokémon atualizado com sucesso',
        schema: {
          message: 'Pokemon atualizado',
          data: { $ref: "#/definitions/Pokemon" }
        }
      }
      #swagger.responses[404] = {
        description: 'Pokémon não encontrado',
        schema: { $ref: "#/definitions/ErrorResponse" }
      }
    */
    return pokemonController.update(req,res);
});

pokemonRoutes.delete('/:id', (req, res) => {
    /* 
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Deleta um Pokémon pelo ID'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do Pokémon a ser removido',
        required: true,
        type: 'string'
      }
      #swagger.responses[204] = {
        description: 'Pokémon removido com sucesso'
      }
      #swagger.responses[404] = {
        description: 'Pokémon não encontrado',
        schema: { $ref: "#/definitions/ErrorResponse" }
      }
    */
    return pokemonController.delete(req, res);
});

export {pokemonRoutes};