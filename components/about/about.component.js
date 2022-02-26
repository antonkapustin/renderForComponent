import { RenderDOM } from "../../utils/RenderDOM.js";

export class About {
  scoup = {
    loading: true,
    username: "test",
  };

  constructor(data, hostElement) {
    this.data = data;
    this.hostElement = hostElement;
    this.template = `
      <h1>About Page!</h1>
      <div data-dom="spiner" data-if="loading"></div>
    `;

    setTimeout(() => {
      this.scoup.loading = false;
      this.render();
    }, 2000);
  }

  async render() {
    this.hostElement.innerHTML = await RenderDOM(this.scoup, this.template);
  }
}
