"use client";

import { useEffect, useState } from "react";
import { Server } from "@/types/Server";
import { ServerFilters } from "@/types/ServerFilters";
import ServerRow from "./ServerRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  serverFilters: ServerFilters;
};

export default function ServerTable({ serverFilters }: Props) {
  const [data, setData] = useState<Server[]>([]);
  const [isLoading, setLoading] = useState(true);
  const rows: React.ReactElement[] = [];

  async function getServers() {
    try {
      const response = await fetch(
        "https://publicapi.battlebit.cloud/Servers/GetServerList"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getServers();
  }, []);

  data.forEach((server) => {
    if (serverFilters.type.length > 0) {
      if (
        !serverFilters.type.some(
          (official) => official == server.IsOfficial.toString()
        )
      ) {
        return;
      }
    }

    if (serverFilters.gameModes.length > 0) {
      if (!serverFilters.gameModes.some((mode) => mode == server.Gamemode)) {
        return;
      }
    }

    if (serverFilters.maps.length > 0) {
      if (!serverFilters.maps.some((map) => map == server.Map)) {
        return;
      }
    }

    if (serverFilters.regions.length > 0) {
      if (!serverFilters.regions.some((region) => region == server.Region)) {
        return;
      }
    }

    rows.push(<ServerRow server={server} />);
  });

  return (
    <TableContainer>
      <Table
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
        }}
        size="small"
      >
        <TableHead
          sx={{
            bgcolor: "#334155",
            textTransform: "uppercase",
            borderBottom: 1,
            borderTop: 1,
            borderColor: "#0f172a",
          }}
        >
          <TableRow>
            <TableCell sx={{ px: 2, py: 1, width: "75%" }}>Servers</TableCell>
            <TableCell></TableCell>
            <TableCell sx={{ width: "12%" }}>Players</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3}>
                <Box sx={{ my: 2 }} display="flex" justifyContent="center">
                  <CircularProgress color="inherit" />
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            rows
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
