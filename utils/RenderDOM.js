export const RenderDOM = async (data, template) => {
  const temp = document.createElement("div");
  temp.innerHTML = template;
  let a = temp.querySelectorAll("[data-dom]:not([data-dom] [data-dom])");

  let matchChildren = [];
  let attrName = [];

  a.forEach((el) => {
    let element = el.querySelectorAll(
      "[data-dom]:not([data-dom] [data-dom]) > [data-dom]"
    );
    // let element = el.querySelectorAll("[data-dom]");

    element.forEach((elem) => {
      matchChildren.push(elem.outerHTML);
      elem.outerHTML = "[[here]]";
      // let attrValue = elem.getAttribute("data-dom");
      // elem.removeAttribute("data-dom");
      // elem.setAttribute("data-temp-dom", attrValue);
      // elem.innerHTML = elem.innerHTML.replace(/\{\{/g, "[[");
    });
    attrName.push(el.getAttribute("data-dom"));
  });

  attrName = [...new Set(attrName)];

  template = temp.innerHTML;

  const matchDiv = template.match(/\[\[here\]\]/gi) || [];
  const matchMarkers = template.match(/{{\w.+?}}/gi) || [];
  const matchKeys = template.match(/(?<={{)\w.+?(?=}})/gi) || [];

  const keys = matchKeys.map((element) => {
    element = element.replace("[", ".").replace("]", "");
    return element.split(".");
  });

  let result = template;

  matchMarkers.forEach((element, i) => {
    let value = keys[i].slice(0).reduce((sum, curr, i, arr) => {
      if (sum) {
        return sum[curr];
      } else {
        arr.splice(1);
        return undefined;
      }
    }, data);

    if (value === undefined) {
      value = element;
    }

    result = result.replace(element, value);
  });

  // result = result.replace(/\[\[/g, "{{");
  // result = result.replace(/data-temp-dom/g, "data-dom");
  matchDiv.forEach((el, i) => {
    result = result.replace(el, matchChildren[i]);
  });

  temp.innerHTML = result;

  if (attrName.length) {
    for (let i = 0; i < attrName.length; i++) {
      let element = attrName[i];
      const hosts = temp.querySelectorAll(`[data-dom="${element}"]`);
      const module = await import(
        `./../components/${element}/${element}.component.js`
      );
      const name = Object.keys(module)[0];
      for (let j = 0; j < hosts.length; j++) {
        const host = hosts[j];

        const hisData = host.getAttribute("his-data");
        let value;
        if (hisData) {
          const keys = hisData.replace("[", ".").replace("]", "").split(".");
          value = keys.reduce((sum, curr) => {
            return sum[curr];
          }, data);
        }

        if (host.hasAttribute("data-if")) {
          const option = host.getAttribute("data-if");
          if (!data[option]) {
            host.setAttribute("data-dom-false", host.getAttribute("data-dom"));
            host.removeAttribute("data-dom");
          } else {
            if (host.hasAttribute("data-dom-false")) {
              host.setAttribute(
                "data-dom",
                host.getAttribute("data-dom-false")
              );
              host.removeAttribute("data-dom-false");
            }
          }
        } else {
          const inst = new module[name](value || data, host);
          await inst.render();
        }
      }
    }
  }
  return temp.innerHTML;
};
