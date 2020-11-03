import { url } from "../config";

export async function getRoutes(setRoutes) {
  const routes = [];

  fetch(`${url}routes`)
    .then((results) => results.json())
    .then((data) => {
      for (let k of Object.keys(data)) {
        const v = data[k];
        let parent = { path: k.toLowerCase(), title: k };

        if (typeof v === "string") {
          parent.endpoint = v;
        }

        routes.push(parent);

        if (typeof v === "object") {
          for (let ck of Object.keys(v)) {
            let child = {
              path: `${parent.path}/${ck.toLowerCase().replace(/\s/g, "-")}`,
              title: ck,
              endpoint: v[ck],
              parent: parent.path,
            };
            routes.push(child);
          }
        }
      }
      setRoutes(routes);
      console.log(routes);
    });
}
