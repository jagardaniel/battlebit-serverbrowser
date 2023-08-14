"use client";

import { useState, ChangeEvent } from "react";
import FilterBar from "./FilterBar";
import ServerTable from "./ServerTable";
import { ServerFilters } from "@/types/ServerFilters";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";

export default function FilterableServerTable() {
  // Input is pretty slow right now, not exactly sure why
  // It seems to be better if you filter out most of the servers before searching
  const [serverFilters, setServerFilters] = useState<ServerFilters>({
    serverName: "",
    gameModes: [],
    maps: [],
    regions: [],
    type: [],
  });

  const handleMultiSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { name, value } = event.target;
    setServerFilters({
      ...serverFilters,
      [name]: value,
    });
  };

  // This function is almost similar to the one above
  // Can I generics in some way so only one of the functions are needed?
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setServerFilters({
      ...serverFilters,
      [name]: value,
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Box sx={{ p: 2 }}>
        <FilterBar
          serverFilters={serverFilters}
          onFilterTextChange={handleTextChange}
          onMultiSelectChange={handleMultiSelectChange}
        />
      </Box>
      <Box>
        <ServerTable serverFilters={serverFilters} />
      </Box>
    </Box>
  );
}
