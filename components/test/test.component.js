import { RenderDOM } from "../../utils/RenderDOM.js";

export class Test {
  constructor(data, hostElement) {
    this.data = {
      notes: [
        {
          text: "unemployed since 2020",
          date: new Date(),
        },
        {
          text: "got married in 2019",
          date: new Date(),
        },
      ],
    };
    this.hostElement = hostElement;
    this.template = `
      <h2>Should display \`{{phoneNumber}}\` in next two rows</h2>
      <div data-dom="iterator" his-data="notes"> {{phoneNumber}} I have sub components {{text}}</div>
    `;
  }

  async render() {
    this.hostElement.innerHTML = await RenderDOM(this.data, this.template);
  }
}
