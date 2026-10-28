import { errorHandler } from '@infrastructure/http/middleware/errorHandler';
import { pokemonRoutes } from '@infrastructure/http/routes/pokemon.routes';
import {trainerRoutes} from '@infrastructure/http/routes/trainer.routes';
import express, {NextFunction, Request, Response} from 'express';
import { setupSwagger } from './config/swagger';
import cors from 'cors';

const app = express();
app.use(cors());
app.use((req: Request,res:Response,next: NextFunction) =>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
setupSwagger(app);
app.use('/api/v1/trainers', trainerRoutes);
app.use('/api/v1/pokemons',pokemonRoutes);
app.use(errorHandler);

const PORT= 3333;
app.listen(PORT, ()=>{
    console.log(`[server]: API rodando em http://localhost: ${PORT}`);
})

