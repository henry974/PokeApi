
interface IPokemonBattleStats{
  name : string;
  attack : number;
  defense :number;
  hp: number;
}





function calculatePokemonDamage(attacker:IPokemonBattleStats,defender: IPokemonBattleStats) {
  const baseDamage = attacker.attack - defender.defense; // Erro de digitação!
  const totalHpRemaining = defender.hp - baseDamage;
  return "HP restante: " + totalHpRemaining;
}

const pikachu : IPokemonBattleStats = { name: "Pikachu", attack: 55,defense:40, hp: 35 };
const charmander : IPokemonBattleStats = { name: "Charmander", attack: 52, defense: 43, hp: 39 }; // HP é string!

console.log(calculatePokemonDamage(pikachu, charmander));