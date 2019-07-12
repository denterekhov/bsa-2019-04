import View from './view.ts';
import { Fighter } from './fighter.ts';

class FighterView extends View {
  constructor(fighter: Fighter, handleFighterClick: Function, handleFighterCheckboxClick: Function) {
    super();

    this.createFighter(fighter, handleFighterClick, handleFighterCheckboxClick);
  }

  createFighter(fighter: Fighter, handleFighterClick: Function, handleFighterCheckboxClick: Function) {
    const { _id, name, source } = fighter;
    const checkboxElement = this.createCheckbox(_id);
    const imageElement = this.createImage(source);
    const nameElement = this.createName(name);
    const fighterElement = this.createElement({ tagName: 'div', className: 'fighter' });
    this.element = this.createElement({ tagName: 'div', className: 'fighter_wrapper' });

    fighterElement.append(imageElement, nameElement);
    fighterElement.addEventListener('click', (event: Event) => handleFighterClick(event, fighter), false);
    checkboxElement.addEventListener('click', (event: Event) => handleFighterCheckboxClick(event, fighter), false);
    this.element.append(checkboxElement, fighterElement);
  }

  createName(name: string) {
    const nameElement = this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createCheckbox(id: number) {
    const checkboxElement = this.createElement({ tagName: 'input', attributes: { type: 'checkbox', id: id } });

    return checkboxElement;
  }

  createImage(source: string) {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }
}

export default FighterView;