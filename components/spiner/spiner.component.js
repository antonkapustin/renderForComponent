import { RenderDOM } from "../../utils/RenderDOM.js";

export class Spiner {
  constructor(data, hostElement) {
    this.data = data;
    this.hostElement = hostElement;
    this.template = `<p>loading(...)</p>`;
  }

  async render() {
    this.hostElement.innerHTML = await RenderDOM(this.data, this.template);
  }
}
