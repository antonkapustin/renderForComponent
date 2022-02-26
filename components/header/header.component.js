import { RenderDOM } from "../../utils/RenderDOM.js";

export class Notification {
  constructor(data, hostElement) {
    this.data = data;
    this.hostElement = hostElement;
    this.template = this.template = `
    <nav>
      <a href="#home" name="home">Home</a>
      <a href="#about" name="about">About</a>
    </nav>
  `;
  }

  async render() {
    this.hostElement.innerHTML = await RenderDOM(this.data, this.template);
  }
}
