import * as render from "./renderToTheDom.js";

export class List {
  constructor(data, hostElement) {
    this.data = data;
    this.hostElement = hostElement;
    this.template = this.hostElement.outerHTML;
    this.render();
  }

  render() {
    for (let index of this.data) {
      const temp = document.createElement("div");
      temp.innerHTML = this.template;
      // console.log(temp.innerHTML);
      [].forEach.call(temp.children, (element, i) => {
        element.innerHTML = render.renderToDom(index, element.innerHTML);
        // render.switchImports(index, element);
      });
      while (temp.childNodes.length > 0) {
        this.hostElement.parentNode.insertBefore(
          temp.childNodes[0],
          this.hostElement
        );
      }
    }
    this.hostElement.remove();
  }
}
