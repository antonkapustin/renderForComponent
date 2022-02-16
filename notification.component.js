import * as render from "./renderToTheDom.js";

export class Notification {
  constructor(data, hostElement) {
    this.data = data;
    this.hostElement = hostElement;
    this.template = this.hostElement.innerHTML;
    this.render();
  }
  render() {
    // console.log(this.template);
    this.hostElement.innerHTML = render.renderToDom(this.data, this.template);
    // render.switchImports(this.data, this.hostElement);
  }
}
