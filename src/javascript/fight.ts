import View from './view';
import { Fighter, IFighter } from './fighter';
import * as FightLogo from '../assets/fight.png';
import * as roundSound from '../assets/audio/round.mp3';
import * as koSound from '../assets/audio/ko.mp3';
import * as littleKick from '../assets/audio/little_kick.mp3';
import * as littlePunch from '../assets/audio/little_punch.mp3';
import * as bigPunch from '../assets/audio/big_punch.mp3';

export interface IFight {
  fighter1: IFighter;
  fighter2: IFighter;
}

class Fight extends View implements IFight {
  fighter1: Fighter;
  fighter2: Fighter;
  sounds: Array<any>

  constructor([fighter1, fighter2]: Array<Fighter>) {
    super();
    this.fighter1 = new Fighter(fighter1);
    this.fighter2 = new Fighter(fighter2);
    this.sounds = [littleKick, littlePunch, bigPunch];
  }

  private createMeter(fighter: Fighter, className: string): HTMLElement {
    const attributes = { 
      min: '0',
      max: fighter.health,
      low: Math.floor(fighter.health / 4),
      high: Math.floor(fighter.health * 0.5),
      optimum: fighter.health,
      value: fighter.health
    };
    const meterElement = super.createElement({
      tagName: 'meter',
      className,
      attributes
    });

    return meterElement;
  }

  private playSound(sound: any) {
    (new Audio(sound)).play();
  }

  private playRandomKickSound() {
    const randomSound = Math.floor(Math.random() * this.sounds.length);
    (new Audio(this.sounds[randomSound])).play();
  }

  public prepareForFight() {
    Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(el => (el as HTMLInputElement).disabled = true);
    document.querySelector('button').remove();
    const rootElement = document.getElementById('root');
    this.element = super.createElement({ tagName: 'div', className: 'battlefield' });
    const fighter1Wrapper = super.createElement({ tagName: 'div', className: 'fighter1-wrapper' });
    const fighter2Wrapper = super.createElement({ tagName: 'div', className: 'fighter2-wrapper' });

    const fighter1Health = this.createMeter(this.fighter1, 'fighter1-health');
    const fighter1 = super.createElement({ tagName: 'img', className: 'fighter1', attributes: { src: this.fighter1.source } });
    fighter1Wrapper.append(fighter1Health, fighter1);

    const fighter2Health = this.createMeter(this.fighter2, 'fighter2-health');
    const fighter2 = super.createElement({ tagName: 'img', className: 'fighter2', attributes: { src: this.fighter2.source } });
    fighter2Wrapper.append(fighter2Health, fighter2);

    const fightImg = super.createElement({ tagName: 'img', className: 'fightLogo', attributes: { src: FightLogo } });
    this.element.append(fighter1Wrapper, fightImg, fighter2Wrapper);
    rootElement.after(this.element);

    this.playSound(roundSound);

    setTimeout(() => {
      this.startFight();
    }, 2500);
  };

  private startFight() {
    if(this.fighter1.health > 0) {
      const fighter1Element = document.querySelector('.fighter1');
      const fighter2Element = document.querySelector('.fighter2');
      const fighter1Health = document.querySelector('.fighter1-health');
      const fighter2Health = document.querySelector('.fighter2-health');
      const fighter2DamageIndicator = super.createElement({ tagName: 'div', className: 'damage-indicator' });

      fighter1Element.classList.add('left-kick');
      fighter2Element.classList.add('damage');
      const fighter2Damage = this.fighter1.getHitPower(this.fighter2);
      fighter2DamageIndicator.innerText = fighter2Damage > 0 ? `-${fighter2Damage}` : '0';
      fighter2Health.after(fighter2DamageIndicator);
      this.playRandomKickSound();
      
      setTimeout(() => {
        fighter2DamageIndicator.remove();
        (fighter2Health as HTMLMeterElement).value -= fighter2Damage;
        fighter1Element.classList.remove('left-kick');
        fighter2Element.classList.remove('damage');
        
        if(this.fighter2.health > 0) {
          const fighter1DamageIndicator = super.createElement({ tagName: 'div', className: 'damage-indicator' });
          fighter2Element.classList.add('right-kick');
          fighter1Element.classList.add('damage');
          const fighter1Damage = this.fighter2.getHitPower(this.fighter1);
          fighter1DamageIndicator.innerText = fighter1Damage > 0 ? `-${fighter1Damage}` : '0';
          fighter1Health.after(fighter1DamageIndicator);
          this.playRandomKickSound();

          setTimeout(() => {
            fighter1DamageIndicator.remove();
            (fighter1Health as HTMLMeterElement).value -= fighter1Damage;
            fighter2Element.classList.remove('right-kick');
            fighter1Element.classList.remove('damage');

            this.startFight();
          }, 800);
        } else {
          this.finishFight(this.fighter1);
        }
      }, 800);
    }  else {
      this.finishFight(this.fighter2);
    }
  }

  private finishFight(winner: Fighter) {
    Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(el => (el as HTMLInputElement).checked = false);

    const winnerElement = super.createElement({ tagName: 'div', className: 'winner' });
    winnerElement.innerText = `${winner.name} wins!`;
    const fightLogo = document.querySelector('.fightLogo');
    fightLogo.replaceWith(winnerElement);

    this.playSound(koSound);

    setTimeout(() => {
      Array.from(document.querySelectorAll('input[type=checkbox]')).forEach((el) => (el as HTMLInputElement).disabled = false);
      document.querySelector('.battlefield').remove();
    }, 5000);
  }
}

export default Fight;
