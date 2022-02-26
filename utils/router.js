export class Router {
  constructor(routes) {
    this.routes = new Map();
    if (routes || []) {
      routes.forEach((element) => {
        this.routes.set(element.path, element.cb);
      });
    }

    this.listener();
  }
  add(path, cb) {
    this.routes = this.routes.set(path, cb);
    return this.routes;
  }

  listener() {
    window.addEventListener("hashchange", this.onHashChange);
  }

  onHashChange = () => {
    const current = location.hash.slice(1);
    const newCurrent = current.charAt(0).toUpperCase() + current.slice(1);

    this.routes.get(newCurrent).call(null);
  };
}
