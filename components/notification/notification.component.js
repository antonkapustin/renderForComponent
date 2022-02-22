import { RenderDOM } from "../../utils/RenderDOM.js";

export class Notification {
  constructor(data, hostElement) {
    this.data = data;
    this.hostElement = hostElement;
    this.template = this.hostElement.innerHTML;
  }

  async render() {
    this.hostElement.innerHTML = await RenderDOM(this.data, this.template);
  }
}
