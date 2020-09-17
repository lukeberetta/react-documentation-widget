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
