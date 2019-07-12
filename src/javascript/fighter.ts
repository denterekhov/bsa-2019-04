import { getRandomChance } from './helpers/getRandom.ts';

interface IFighter {
  _id: number,
  name: string,
  health: number,
  attack: number,
  defense: number,
  source: string,
}

class Fighter implements IFighter {
  _id: number;
  name: string;
  health: number;
  attack: number;
  defense: number;
  source: string;

  constructor({_id, name, health, attack, defense, source}: IFighter) {
    this._id = _id;
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.source = source;
  }

  getHitPower(enemy: Fighter): number {
    const power = this.attack * getRandomChance();
    const damage = enemy.setDamage(power);
    return damage > 0 ? damage : 0;
  }

  getBlockPower(): number {
    const power = this.defense * getRandomChance();
    return power;
  }

  setDamage(power: number): number {
    const damage = Math.floor(power - this.getBlockPower());
    this.health -= damage > 0 ? damage : 0;
    return damage;
  }
}

export { IFighter, Fighter };
