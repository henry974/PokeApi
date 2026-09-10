import express, {NextFunction, Request, Response} from 'express';

const app = express();

app.use((req: Request,res:Response,next: NextFunction) =>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

export interface Pokemon{
    id: string;
    name: string;
    type: string;
    hp: number;
}
export interface CreateTrainerDTO{
    name: string;
    age: number;
    city: string;
}
export interface TrainerParams{
    trainerId: string;
}



const pokemons: Pokemon[] = [
    {id:'1',name:'Bulbassaur',type:'grass',hp:45},
    {id:'2',name:'Charmander',type:'fire',hp:43},
    {id:'3',name:'Squirtle',type:'water',hp:44},
    {id:'4',name:'Pikachu',type:'eletric',hp:40}
];

app.post('/api/v1/trainers' ,(req: Request<{},{},CreateTrainerDTO>,res: Response) =>{
    const {name,age,city} = req.body;
    if(!name || !city || isNaN(Number(age)) || Number(age) < 0){
        return res.status(400).json({error: 'Dados inválidos. Os campos name, city e age (número positivo) são obrigatórios.'})
    }
    const newTrainer : CreateTrainerDTO = {name:String(name),age: Number(age),city:String(city)};
    return res.status(201).json({message:'Treinador criado com sucesso',trainer: newTrainer});
});


app.get('/api/v1/pokemons', (req: Request, res: Response) => {
    const {type} = req.query;
    if(type){
        const filteredPokemons = pokemons.filter(
            (p) => p.type.toLowerCase() === String(type).toLowerCase()
        );
        return res.status(200).json(filteredPokemons);
    }
    return res.status(200).json(pokemons);
});

app.get('/api/v1/pokemons/stats',(req: Request, res:Response)=>{
    const numPokemons = pokemons.length;
    const contagemTipo = pokemons.reduce((acc,pokemon) => {
        acc[pokemon.type] = (acc[pokemon.type] || 0) +1;
        return acc;
    },{} as Record<string,number>);
    return res.status(200).json({totalPokemons:numPokemons,typeCount: contagemTipo});
});

app.post('/api/v1/pokemons' , (req: Request, res: Response) =>{
    const {id,name,type,hp} = req.body;
    if(!id || !name ||!type || !hp){
        return res.status(400).json({error:'Campos obrigatórios ausentes: id,nome,tipo,hp'});
    }
    
    const pokemonExists = pokemons.some((p) => p.id === id);
    if(pokemonExists){
        return res.status(400).json({error:'pokemon ja existe'});
    }
    const newPokemon: Pokemon ={id,name,type,hp:Number(hp)};
    pokemons.push(newPokemon);
    return res.status(201).json({
        message:'pokemon  cadastrado com sucesso',
        data: newPokemon,
    })
})

app.delete('/api/v1/pokemons/:id' , (req: Request, res: Response)=>{
    const {id} = req.params;
    const pokemonExists = pokemons.some((p) => p.id === id);
    if(!pokemonExists){
        return res.status(404).json({error:'pokemon não encontrado delete'});
    }
    const index = pokemons.findIndex((p) => p.id === id);
    if(index !== -1){
        pokemons.splice(index,1);
    }
    return res.status(200).json({messase:'pokemon removido'});
})

app.put('/api/v1/pokemons/:id' , (req: Request, res: Response)=>{
    const {id} = req.params;
    const {name,type,hp} = req.body;
    const pokemonEncontrado = pokemons.find((p) => p.id === id);
    if(!pokemonEncontrado){
        return res.status(404).json({error:'pokemon não encontrado put '});
    }
    
    pokemonEncontrado.hp = Number(hp);
    pokemonEncontrado.type = type.toString();
    pokemonEncontrado.name = name.toString();
    
    
    
    return res.status(200).json({messase:'pokemon atualizado'});
});
app.get('/api/v1/pokemons/:id',(req: Request,res: Response) =>{
const {id} = req.params;
    const pokemon = pokemons.find((p)=> p.id === id);
    if(!pokemon){
        return res.status(404).json({error:'Pokemon não encontrado get por id'});
    }
    return res.status(200).json(pokemon);
});


const PORT= 3333;
app.listen(PORT, ()=>{
    console.log(`[server]: API rodando em http://localhost: ${PORT}`);
})