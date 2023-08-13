"use client";

import { useState } from "react";
import FilterBar from "./FilterBar";
import ServerTable from "./ServerTable";
import { ServerFilters } from "@/types/ServerFilters";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";

export default function FilterableServerTable() {
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
          serverFilters={serverFilters}
          onMultiSelectChange={handleMultiSelectChange}
        />
      </Box>
      <Box>
        <ServerTable serverFilters={serverFilters} />
      </Box>
    </Box>
  );
}
