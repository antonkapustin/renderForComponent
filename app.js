import * as render from "./renderToTheDom.js";

class App {
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
  template = "";

  constructor(hostElement) {
    this.template = hostElement.innerHTML;
    hostElement.innerHTML = render.renderToDom(this.data, this.template);
    render.switchImports(this.data, hostElement);
  }
}

new App(document.querySelector("#app"));
