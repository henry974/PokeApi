import { Router } from "express";
import { makeTrainerController } from "@main/factories/makeTrainerController.factory";

const trainerRoutes = Router();
const TrainerController = makeTrainerController();

trainerRoutes.get('/', (req, res) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Lista todos os treinadores'
      #swagger.description = 'Retorna a lista completa de treinadores cadastrados.'
      #swagger.responses[200] = {
        description: 'Lista de treinadores retornada com sucesso',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                data: { type: 'array', items: { $ref: '#/components/schemas/Trainer' } }
              }
            }
          }
        }
      }
    */
    return TrainerController.list(req, res);
});


trainerRoutes.post('/', (req, res) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Cria um novo treinador'
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: '#/components/schemas/createTrainerDTO' }
          }
        }
      }
      #swagger.responses[201] = {
        description: 'Treinador criado com sucesso',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Treinador criado com sucesso' },
                data: { $ref: '#/components/schemas/Trainer' }
              }
            }
          }
        }
      }
      #swagger.responses[400] = {
        description: 'Dados inválidos (nome, cidade ou e-mail)',
        content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
      #swagger.responses[409] = {
        description: 'Já existe um treinador com este e-mail',
        content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
    */
    return TrainerController.create(req, res);
});

trainerRoutes.get('/:email', (req, res) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Busca um treinador pelo e-mail'
      #swagger.parameters['email'] = {
        in: 'path',
        required: true,
        description: 'E-mail do treinador',
        schema: { type: 'string' },
        example: 'ash@exemplo.com'
      }
      #swagger.responses[200] = {
        description: 'Treinador encontrado com sucesso',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: { data: { $ref: '#/components/schemas/Trainer' } }
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Treinador não encontrado',
        content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
    */
    return TrainerController.findByEmail(req, res);
});

trainerRoutes.put('/:email', (req, res) => {
    /*
      #swagger.tags = ['Trainers']
      #swagger.summary = 'Atualiza um treinador existente'
      #swagger.description = 'Localiza o treinador pelo e-mail da URL. Os campos enviados no corpo substituem os atuais; se o corpo trouxer um e-mail novo, o e-mail do treinador é alterado.'
      #swagger.parameters['email'] = {
        in: 'path',
        required: true,
        description: 'E-mail atual do treinador a ser atualizado',
        schema: { type: 'string' },
        example: 'ash@exemplo.com'
      }
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: '#/components/schemas/updateTrainerDTO' }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Treinador atualizado com sucesso',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Treinador atualizado' },
                data: { $ref: '#/components/schemas/Trainer' }
              }
            }
          }
        }
      }
      #swagger.responses[400] = {
        description: 'Dados inválidos',
        content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
      #swagger.responses[404] = {
        description: 'Treinador não encontrado',
        content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
      #swagger.responses[409] = {
        description: 'O novo e-mail já pertence a outro treinador',
        content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
      }
    */
    return TrainerController.update(req, res);
});

export {trainerRoutes};