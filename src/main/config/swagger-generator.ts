
import { Pokemon } from '@domain/entities/pokemon';
import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Express Sample API',
    description:
      'API de exemplo desenvolvida para a disciplina Tópicos Especiais em Engenharia de Software (UFF)',
  },
  host: 'localhost:3333',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Pokemons',
      description: 'Endpoints de gerenciamento de Pokemons',
    },
  ],
  definitions: {
    Pokemon: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Pikachu',
      type: 'water',
      hp: 1231,
      rarity:'legendary',
      nickname:'bixin'
    },
    createPokemonDTO: {
      $id: '123e4567-e89b-12d3-a456-426614174000',
      $name: 'Pikachu',
      $type: 'water',
      $hp: 1231,
      $rarity:'legendary',
      $nickname:'bixin'
    },
    ErrorResponse: {
      error: 'Mensagem de erro.',
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [path.resolve(__dirname, '../server.ts')];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
