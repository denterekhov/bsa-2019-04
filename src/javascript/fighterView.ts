import View from './view';
import { Fighter } from './fighter';

class FighterView extends View {
  constructor(fighter: Fighter, handleFighterClick: Function, handleFighterCheckboxClick: Function) {
    super();

    this.createFighter(fighter, handleFighterClick, handleFighterCheckboxClick);
  }

  private createFighter(fighter: Fighter, handleFighterClick: Function, handleFighterCheckboxClick: Function) {
    const { _id, name, source } = fighter;
    const checkboxElement = this.createCheckbox(_id);
    const imageElement = this.createImage(source);
    const nameElement = this.createName(name);
    const fighterElement = super.createElement({ tagName: 'div', className: 'fighter' });
    this.element = super.createElement({ tagName: 'div', className: 'fighter_wrapper' });

    fighterElement.append(imageElement, nameElement);
    fighterElement.addEventListener('click', (event: Event) => handleFighterClick(event, fighter), false);
    checkboxElement.addEventListener('click', (event: Event) => handleFighterCheckboxClick(event, fighter), false);
    this.element.append(checkboxElement, fighterElement);
  }

  private createName(name: string) {
    const nameElement = super.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  private createCheckbox(id: number) {
    const checkboxElement = super.createElement({ tagName: 'input', attributes: { type: 'checkbox', id: id } });

    return checkboxElement;
  }

  private createImage(source: string) {
    const attributes = { src: source };
    const imgElement = super.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }
}

export default FighterView;