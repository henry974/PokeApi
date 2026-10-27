//import { IPokemonRepositoryContract } from "../../types/repository";

export enum PokemonType {
    NORMAL = 'normal',
    FIRE = 'fire',
    WATER = 'water',
    ELECTRIC = 'electric',
    GRASS = 'grass',
    ICE = 'ice',
    FIGHTING = 'fighting',
    POISON = 'poison',
    GROUND = 'ground',
    FLYING = 'flying',
    PSYCHIC = 'psychic',
    BUG = 'bug',
    ROCK = 'rock',
    GHOST = 'ghost',
    DRAGON = 'dragon',
    DARK = 'dark',
    STEEL = 'steel',
    FAIRY = 'fairy',
}
 

export interface IPokemonProps{
    id : string;
    name : string;
    type1 : PokemonType;
    type2?: PokemonType;
    level : number;
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed : number;
    nickname? : string;
}

export class Pokemon{
    private props: IPokemonProps;
    constructor(props: IPokemonProps){
        this.validate(props);
        this.props = props;
    }
    
    get id() : string {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get type1(){
        return this.props.type1;
    }
    get type2(){
        return this.props.type2 ?? null;
    }
    get level(){
        return this.props.level;
    }
    get hp(){
        return this.props.hp;
    }
    get attack(){
        return this.props.attack;
    }
    get defense(){
        return this.props.defense;
    }
    get special_attack(){
        return this.props.special_attack;
    }
    get special_defense(){
        return this.props.special_defense;
    }
    get speed(){
        return this.props.speed;
    }
    get nickname(){
        return this.props.nickname ?? this.props.name;
    }

    public updateProps(data : Partial<Omit<IPokemonProps, 'id'>>):void{
        const updateProps = {...this.props,...data};
        this.validate(updateProps);
        
        if (data.name) this.props.name = data.name;
        if (data.type1) this.props.type1 = data.type1;
        if(data.type2) this.props.type2 = data.type2;
        if(data.level) this.props.level = data.level;
        if (data.hp !== undefined) this.props.hp = data.hp;
        if (data.attack) this.props.attack = data.attack;
        if (data.defense) this.props.defense = data.defense;
        if (data.special_attack) this.props.special_attack = data.special_attack;
        if (data.special_defense) this.props.special_defense = data.special_defense;
        if (data.speed) this.props.speed = data.speed;
        if (data.nickname) this.props.nickname = data.nickname;
    }

    private validate(props: IPokemonProps): void {
        if (!props.id || props.id.trim().length === 0) {
            throw new Error('O ID do Pokémon é obrigatório.');
        }
        if (!props.name || props.name.trim().length === 0) {
            throw new Error('O nome do Pokémon não pode ser vazio.');
        }
        if (props.level < 1 || props.level > 100){
            throw new Error('level inválido');
        }
        if (props.hp <= 0) {
            throw new Error('O HP deve ser maior que zero.');
        }
        if (!Object.values(PokemonType).includes(props.type1)) {
            throw new Error('Tipo de Pokémon inválido.');
        }
        if (props.type2 !== null && props.type2 !== undefined && !Object.values(PokemonType).includes(props.type2)) {
            throw new Error('Tipo secundário de Pokémon inválido.');
        }
        
        
    }

    public toJSON() {
    return {
      id: this.id,
      name: this.name,
      type1: this.type1,
      type2:this.type2,
      level:this.level,
      hp: this.hp,
      attack:this.attack,
      defense:this.defense,
      special_attack : this.special_attack,
      special_defense: this.special_defense,
      speed: this.speed,
      nickname: this.nickname
    };
  }
  public updateLevel(level : number): void{
    this.validate({...this.props,level});
    this.props.level = level;

  }
    
}