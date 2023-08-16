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
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

type Props = {
  serverFilters: ServerFilters;
};

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, mr: 2 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

const initialRowsPerPage = 20;

export default function ServerTable({ serverFilters }: Props) {
  const [data, setData] = useState<Server[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
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
    // Load available servers from the public API
    getServers();

    // Load rows per page from local storage
    const rowsFromStorage = JSON.parse(
      localStorage.getItem("rowsPerPage") || JSON.stringify(initialRowsPerPage)
    );
    if (rowsFromStorage) setRowsPerPage(rowsFromStorage);
  }, []);

  // Save rows per page to local storage
  useEffect(() => {
    localStorage.setItem("rowsPerPage", JSON.stringify(rowsPerPage));
  }, [rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  data.forEach((server) => {
    if (
      server.Name.toLowerCase().indexOf(
        serverFilters.serverName.toLowerCase()
      ) === -1
    ) {
      return;
    }

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
            <>
              {rows.length > 0 ? (
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Box sx={{ my: 2 }} display="flex" justifyContent="center">
                      <Typography variant="body1">No servers found</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                10,
                20,
                50,
                100,
                { value: -1, label: "All" },
              ]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              labelRowsPerPage="Servers per page"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
