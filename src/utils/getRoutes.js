export default function getRoutes() {
  const data = {
    DXM: {
      "Site Management": "dxmSites",
      "Site Instance Management": "dxmSiteInstances",
      "Multi Domain Management": "dxmMultidomains",
      TLS: "dxmTLS",
      Proxy: "dxmProxy",
      "IP restrictions": "dxmIPRestrictions",
      Backup: "dxmBackup",
      Audit: "dxmAudit",
      Redirects: "dxmRedirects",
      Content: "dxmContent",
      Revisions: "dxmRevisions",
      Snapshots: "dxmSnapshots",
    },
    Documents: {
      "Document Loading": "docloader",
      "Search and Retrieval": "documents",
      "Meta Data Setup": "docmeta",
      "Production Center": "docworkflow",
      "Layout and Components": "layout",
    },
    Studio: {
      "Studio App Manager": "appmanager",
      Applications: "apps",
    },
    Management: {
      Authentiction: "auth",
      "User Management": "user",
      Roles: "roles",
      Modules: "modules",
      Permissions: "permissions",
      Client: "client",
      Activity: "activity",
      "Two Factor Authentication": "twofa",
      "System Dashboard": "dashboard",
      Email: "email",
    },
    Data: {
      "Property Setup and Management": "properties",
      "Data Loading": "dataloader",
      "Search and Retrieval": "entitysearch",
      "Data Formats": "formats",
      "Segmentation List Management": "fundlists",
      "Segmentation Tags": "segmentationTags",
      "Commentary Management": "commentary",
      "Disclaimer Management": "disclaimers",
      Translations: "translations",
      "Approval Groups": "approvalGroups",
      Statistics: "statistics",
    },
  };

  const routes = [];

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
  return routes;
}

// const fetchRoutes = async () => {
//   const data = await fetch("https://api-rel.kurtosys.app/readme/routes");
//   const routes = await data.json();

//   // Sort API Data
//   let sortedRoutes = [];
//   Object.keys(routes).forEach(function (key, index) {
//     let title, endpoint, slug;
//     let nested = [];
//     title = key;
//     slug = key.toLowerCase().replace(/\s/g, "-");

//     if (typeof routes[key] === "object") {
//       Object.keys(routes[key]).forEach(function (key2, index2) {
//         nested.push({
//           title: key2,
//           endpoint: routes[key][key2],
//           slug: slug + "/" + key2.toLowerCase().replace(/\s/g, "-"),
//         });
//       });
//       endpoint = false;
//     } else {
//       endpoint = routes[key];
//       nested = false;
//     }
//     sortedRoutes.push({ title, endpoint, nested, slug });
//   });
//   console.log(sortedRoutes);
//   setRoutes(sortedRoutes);
// };
