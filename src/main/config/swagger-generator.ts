
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
    { name: 'Trainers', description: 'Endpoints de gerenciamento de Treinadores' },
  ],
  definitions: {
  Pokemon: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Pikachu",
    type1: "electric",
    type2: "flying",
    level: 10,
    hp: 35,
    attack: 55,
    defense: 40,
    special_attack: 50,
    special_defense: 50,
    speed: 90,
    nickname: "bixin",
  },
  createPokemonDTO: {
    $id: "123e4567-e89b-12d3-a456-426614174000",
    $name: "Pikachu",
    $type1: "electric",
    type2: "flying",
    $level:10,
    $hp: 35,
    $attack: 55,
    $defense: 40,
    $special_attack: 50,
    $special_defense: 50,
    $speed: 90,
    nickname: "bixin",
  },
  updatePokemonDTO: {
    name: "Pikachu",
    type1: "electric",
    type2: "flying",
    level: 10,
    hp: 35,
    attack: 55,
    defense: 40,
    special_attack: 50,
    special_defense: 50,
    speed: 90,
    nickname: "bixin",
  },
  updatePokemonLevelDTO: { 
    $level: 50 
  },
  Trainer: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Ash Ketchum",
    email: "ash@exemplo.com",
    city: "Pallet Town",
    createdAt: "2026-10-27T12:00:00.000Z",
  },
  createTrainerDTO: {
    $name: "Ash Ketchum",
    $email: "ash@exemplo.com",
    $city: "Pallet Town",
  },
  updateTrainerDTO: {
    name: "Ash Ketchum",
    email: "ash@exemplo.com",
    city: "Pallet Town",
  },
  ErrorResponse: {
    error: "Mensagem de erro.",
  },
  }
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');

const endpointsFiles = [path.resolve(__dirname, '../server.ts')];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
