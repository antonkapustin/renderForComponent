import { RenderDOM } from "../../utils/RenderDOM.js";
import { Router } from "../../utils/router.js";

export class App {
  router = new Router([]);
  data = {
    title: "Renderer",
    notification: [
      {
        text: {
          message: `Some notification with:`,
        },
      },
    ],
    discription: "discription of html",
    users: [
      {
        name: "John",
        greetings: "Hello, I'm {{name}}",
        group: { titles: "1" },
      },
      {
        name: "Lisa",
        greetings: "Hello, I'm {{name}}",
        group: { titles: "2" },
      },
      {
        name: "Dandy",
        greetings: "Hello, I'm {{name}}",
        group: { titles: "3" },
      },
    ],
    description: "some text",
    firstName: "Alex",
    secondName: "Green",
    email: "alex.green@mail.com",
    age: 14,
    phoneNumber: "+123-456-789",
    parents: ["John Smith"],
    address: {
      town: "Grodno",
      postalcode: "230034",
    },
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
    is_null: null,
    undef: undefined,
  };

  template = `
  <header data-dom="header"></header>
  `;

  constructor(hostElement) {
    this.hostElement = hostElement;
    // this.template = hostElement.innerHTML;
  }

  async render() {
    this.hostElement.innerHTML = await RenderDOM(this.data, this.template);
    const routerOutlet = document.querySelector("[data-router-outlet]");

    console.log(routerOutlet);
    this.router.add("Home", () => {
      routerOutlet.innerHTML = "";
      import("../home/home.component.js").then(({ Home }) => {
        new Home(this.data, routerOutlet).render();
      });
    });
    this.router.add("About", () => {
      routerOutlet.innerHTML = "";
      import("../about/about.component.js").then(({ About }) => {
        new About(this.data, routerOutlet).render();
      });
    });
  }
}
