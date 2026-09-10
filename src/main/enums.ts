enum PokemonType{
    FIRE = 'fire',
    WATER = 'water',
    GRASS = 'grass',
    ELETRIC = 'eletric',
    PSYCHIC = 'psychic'
}
enum  Rarity{
    COMMON = 'common',
    RARE = 'rare',
    LEGENDARY = 'legendary'
}
export interface IPokemon{
    id : string;
    name : string;
    type : PokemonType;
    hp:number;
    rarity : Rarity;
    nickname? : string;
}

const Comum : IPokemon = {
    id:'1',
    name:'Magikarp',
    type: PokemonType.WATER,
    hp:25,
    rarity : Rarity.COMMON
};
const Lendario: IPokemon = {
  id: '2',
  name: 'Mewtwo',
  type: PokemonType.PSYCHIC,
  hp: 280,
  rarity : Rarity.LEGENDARY,
  nickname: 'MT'
};
console.log(Lendario?.nickname);
console.log(Comum.type);