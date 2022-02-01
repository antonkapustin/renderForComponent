import * as render from "./renderToTheDom.js";

export class Spiner {
  constructor(data, hostElement) {
    this.data = data;
    this.hostElement = hostElement;
    this.template = `<p>(loading...)</p>`;

    this.render();
  }

  render() {
    this.hostElement.innerHTML = render.renderToDom(this.data, this.template);
  }
}
