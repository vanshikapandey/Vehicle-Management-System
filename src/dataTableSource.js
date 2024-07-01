import clsx from "clsx";
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "vehicleno",
    headerName: "Vehicle No.",
    width: 150,
    fontWeight: 700,
    editable: true,
  },
  {
    field: "ownername",
    headerName: "Owner Name",
    width: 150,
    fontWeight: 700,
    cellClassName: "super-app-theme--cell",
    editable: true,
  },

  {
    field: "taxdate",
    headerName: "Tax Date",
    width: 150,
    editable: true,
    cellClassName: (params) => {
      console.log(params.row.t_status);
      if (params.value == null) {
        return "";
      }

      return clsx("super-app", {
        negative: params.row.t_status === 1,
        positive: params.row.t_status === 0,
      });
    },
  },
  {
    field: "fitnessdate",
    headerName: "Fitness Date",
    width: 150,
    editable: true,
    cellClassName: (params) => {
      console.log(params.row.f_status);
      if (params.value == null) {
        return "";
      }

      return clsx("super-app", {
        negative: params.row.f_status === 1,
        positive: params.row.f_status === 0,
      });
    },
  },
  {
    field: "uppermit",
    headerName: "UP Permit",
    width: 150,
    editable: true,
    cellClassName: (params) => {
      console.log(params.row.up_status);
      if (params.value == null) {
        return "";
      }

      return clsx("super-app", {
        negative: params.row.up_status === 1,
        positive: params.row.up_status === 0,
      });
    },
  },
  {
    field: "nppermit",
    headerName: "NP Permit",
    width: 150,
    editable: true,
    cellClassName: (params) => {
      console.log(params.row.np_status);
      if (params.value == null) {
        return "";
      }

      return clsx("super-app", {
        negative: params.row.np_status === 1,
        positive: params.row.np_status === 0,
      });
    },
  },
  {
    field: "pollutiondate",
    headerName: "Pollution Date",
    width: 150,
    editable: true,
    cellClassName: (params) => {
      console.log(params.row.p_status);
      if (params.value == null) {
        return "";
      }

      return clsx("super-app", {
        negative: params.row.p_status === 1,
        positive: params.row.p_status === 0,
      });
    },
  },
  {
    field: "mobileno",
    headerName: "Mobile No.",
    width: 150,
    editable: true,
  },
];
