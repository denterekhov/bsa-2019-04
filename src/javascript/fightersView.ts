import View from './view.ts';
import FighterView from './fighterView.ts';
import { Fighter } from './fighter.ts';
import Fight from './fight.ts';
import { fighterService } from './services/fightersService';

class FightersView extends View {
  public element: HTMLElement

  constructor(fighters: [Fighter, Fighter]) {
    super();
    
    this.handleFighterClick = this.handleFighterClick.bind(this);
    this.handleFighterCheckboxClick = this.handleFighterCheckboxClick.bind(this);
    this.createFighters(fighters);
  }

  private fightersDetailsMap = new Map();

  createFighters(fighters: [Fighter, Fighter]) {
    const fighterElements = fighters.map((fighter: Fighter) => {
      const fighterView = new FighterView(fighter, this.handleFighterClick, this.handleFighterCheckboxClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
  }

  async handleFighterClick(event: Event, fighter: Fighter) {
    await this.checkIfFighterExist(fighter);
    const fighterInfo = this.fightersDetailsMap.get(fighter._id);
    this.showModal(fighterInfo);
  }

  async handleFighterCheckboxClick(event: Event, fighter: Fighter) {
    await this.checkIfFighterExist(fighter);

    if (this.getCheckedCheckboxLength() === 2) {
      this.setCheckboxStatus(true);
      const checkboxIds = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(el => el.id);
      const fightersForFight = Array.from(this.fightersDetailsMap.values()).filter(fighter => checkboxIds.includes(fighter._id));
      const rootElement = document.getElementById('root');
      const buttonElement = this.createElement({ tagName: 'button', className: 'start-fight' });
      buttonElement.innerText = 'FIGHT!';
      const fight = new Fight(fightersForFight);
      buttonElement.addEventListener('click', () => fight.prepareForFight());
      rootElement.after(buttonElement);
    };

    if (this.getCheckedCheckboxLength() === 1) {
      this.setCheckboxStatus(false);
      if (document.querySelector('.start-fight')) document.querySelector('.start-fight').remove();
    };
  }

  getCheckedCheckboxLength() {
    return Array.from(document.querySelectorAll('input[type=checkbox]:checked')).length;
  }

  setCheckboxStatus(status: boolean) {
    return Array.from(document.querySelectorAll('input[type=checkbox]:not(:checked)')).forEach(el => (el as HTMLInputElement).disabled = status);
  }

  async checkIfFighterExist(fighter: Fighter) {
    if(!this.fightersDetailsMap.get(fighter._id)) {
      const fullFighterInfo = await fighterService.getFighterDetails(fighter._id);
      this.fightersDetailsMap.set(fullFighterInfo._id, fullFighterInfo);
    };
  }

  showModal({ _id, name, source, ...charStats}: { _id: number, name: string, source: string, charStats: number[]}) {
    const overlay = this.createElement({ tagName: 'div', className: 'overlay' });
    const modal = this.createElement({ tagName: 'div', className: 'modal' });
    const headerElement = this.createElement({ tagName: 'h4' });
    headerElement.innerText = name;
    modal.append(headerElement);

    for (const [key, value] of Object.entries(charStats)) {
      const labelElement = this.createElement({ tagName: 'label' });
      const text = document.createTextNode(`${key}:`);
      const inputElement = this.createElement({ tagName: 'input', attributes: { type: 'number', min: '0', name: key, value: value} });
      labelElement.append(text, inputElement);
      modal.append(labelElement);
    }

    const text = document.createTextNode('Save stats');
    const submitElement = this.createElement({ tagName: 'button' });

    submitElement.addEventListener('click', () => {
      const obj = {};
      const changedValue = Array.from(modal.querySelectorAll('input')).reduce((acc, el) => {
        obj[el.name] = Number((el as HTMLInputElement).value) > 0 ? Number((el as HTMLInputElement).value) : 0;
        return acc;
      }, obj);

      this.fightersDetailsMap.set(_id, {
        _id,
        ...changedValue,
        name,
        source
      });
      overlay.remove();
    });

    submitElement.append(text);
    modal.append(submitElement);
    overlay.append(modal);
    document.body.append(overlay);
  }
}

export default FightersView;