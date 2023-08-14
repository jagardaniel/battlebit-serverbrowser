"use client";

import { useState } from "react";
import FilterBar from "./FilterBar";
import ServerTable from "./ServerTable";
import { ServerFilters } from "@/types/ServerFilters";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";

export default function FilterableServerTable() {
  // Input is super slow right now, not sure why
  // Could probably also be included in serverFilters instead
  const [filterText, setFilterText] = useState<string>("");
  const [serverFilters, setServerFilters] = useState<ServerFilters>({
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
          filterText={filterText}
          onFilterTextChange={setFilterText}
          serverFilters={serverFilters}
          onMultiSelectChange={handleMultiSelectChange}
        />
      </Box>
      <Box>
        <ServerTable filterText={filterText} serverFilters={serverFilters} />
      </Box>
    </Box>
  );
}
