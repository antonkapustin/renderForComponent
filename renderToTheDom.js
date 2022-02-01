export const renderToDom = (data, template) => {
  const temp = document.createElement("div");
  temp.innerHTML = template;

  let matchDomDiv = temp.children;

  let matchChildren = [];

  [].forEach.call(matchDomDiv, (el) => {
    if (el.getAttribute("data-dom")) {
      matchChildren.push(el.outerHTML);
      el.innerHTML = "[[here]]";
    }
  });

  template = temp.innerHTML;
  const matchDiv =
    template.match(/<(\w*?)\s(data-dom="\w.*?")>\[\[here\]\](<\/\w*?>)/gi) ||
    [];
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
  matchDiv.forEach((el, i) => {
    result = result.replace(el, matchChildren[i]);
  });

  return result;
};

export const switchImports = (data, container) => {
  let matchDataDom =
    container.innerHTML.match(/(?<=data-dom="| ?<= \,)\w.+?(?=")/gi) || [];

  // filter unique values
  matchDataDom = [...new Set(matchDataDom)];

  if (matchDataDom) {
    matchDataDom.forEach(async (element) => {
      const hosts = container.querySelectorAll(`[data-dom="${element}"]`);
      const module = await import(`./${element}.component.js`);
      const name = Object.keys(module)[0];

      hosts.forEach((host) => {
        const hisData = host.getAttribute("his-data");
        let value;

        if (hisData) {
          const keys = hisData.replace("[", ".").replace("]", "").split(".");
          value = keys.reduce((sum, curr) => {
            return sum[curr];
          }, data);
        }
        new module[name](value || data, host);
      });
    });
  }
};

// export const iterator = (data, hostElement) => {
//   let template = hostElement.outerHTML;
//   let arr = [];
//   for (let index of data) {
//     const temp = document.createElement("div");
//     temp.innerHTML = renderToDom(index, template);

//     [].forEach.call(temp.children, (element) => {
//       switchImports(index, element);
//       arr = [...arr, ...temp.children];
//     });

//     while (temp.childNodes.length > 0) {
//       hostElement.parentNode.insertBefore(temp.childNodes[0], hostElement);
//     }
//   }
//   hostElement.remove();
//   return arr;
// };
