interface IView {
  element: HTMLElement,
  createElement: ({tagName, className, attributes: any }: {tagName: string, className?: string, attributes?: { [key: string]: any }}) => HTMLElement;
}

class View implements IView {
  public element: HTMLElement;

  public createElement({ tagName, className = '', attributes = {} }: {tagName: string, className?: string, attributes?: { [key: string]: any }}): HTMLElement {
    const element = document.createElement(tagName);
    if(className) element.classList.add(className);
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
  }
}

export default View;
