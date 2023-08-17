import { ChangeEvent } from "react";
import { ServerFilters } from "@/types/ServerFilters";
import { GameModes } from "@/types/GameModes";
import { Maps } from "@/types/Maps";
import { Regions } from "@/types/Regions";
import { MultiSelectItem } from "@/types/MultiSelectItem";
import FilterMultiSelect from "./FilterMultiSelect";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import BackspaceIcon from "@mui/icons-material/Backspace";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";

type Props = {
  serverFilters: ServerFilters;
  refreshServers: () => Promise<void>;
  onFilterTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMultiSelectChange: (event: SelectChangeEvent<string[]>) => void;
  onClearFilters: () => void;
};

// Available items for each multiselect
const gameModeItems: MultiSelectItem[] = Object.entries(GameModes).map(
  ([key, value]) => ({
    key: key,
    value: value,
  })
);
const mapsItems: MultiSelectItem[] = Maps.map((item) => ({
  key: item,
  value: item,
}));
const regionsItems: MultiSelectItem[] = Object.entries(Regions).map(
  ([key]) => ({
    key: key,
    value: key.split("_")[0],
  })
);
const typesItems: MultiSelectItem[] = [
  { value: "Official", key: "true" },
  { value: "Community", key: "false" },
];
const maxPlayersItems: MultiSelectItem[] = [
  { value: "254", key: "254" },
  { value: "128", key: "128" },
  { value: "64", key: "64" },
];
const hasPasswordItems: MultiSelectItem[] = [
  { value: "Password", key: "true" },
  { value: "No password", key: "false" },
];

export default function FilterBar({
  serverFilters,
  refreshServers,
  onFilterTextChange,
  onMultiSelectChange,
  onClearFilters,
}: Props) {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: "20%" }}>
          <TextField
            hiddenLabel
            type="text"
            name="serverName"
            size="small"
            placeholder="Search name..."
            variant="outlined"
            value={serverFilters.serverName}
            onChange={onFilterTextChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" sx={{ color: "text.disabled" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ width: "20%" }}>
          <FilterMultiSelect
            name="gameModes"
            placeholder="Game modes"
            renderValueText="mode(s)"
            items={gameModeItems}
            values={serverFilters.gameModes}
            onMultiSelectChange={onMultiSelectChange}
          />
        </Box>
        <Box sx={{ width: "20%" }}>
          <FilterMultiSelect
            name="maps"
            placeholder="Maps"
            renderValueText="maps(s)"
            items={mapsItems}
            values={serverFilters.maps}
            onMultiSelectChange={onMultiSelectChange}
          />
        </Box>
        <Box sx={{ width: "20%" }}>
          <FilterMultiSelect
            name="regions"
            placeholder="Regions"
            renderValueText="region(s)"
            items={regionsItems}
            values={serverFilters.regions}
            onMultiSelectChange={onMultiSelectChange}
          />
        </Box>
        <Box sx={{ width: "20%" }}>
          <FilterMultiSelect
            name="type"
            placeholder="Server type"
            renderValueText="type(s)"
            items={typesItems}
            values={serverFilters.type}
            onMultiSelectChange={onMultiSelectChange}
          />
        </Box>
      </Stack>
      <Stack direction="row" spacing={2} mt={2}>
        <Box sx={{ width: "20%" }}>
          <FilterMultiSelect
            name="maxPlayers"
            placeholder="Max players"
            renderValueText="size(s)"
            items={maxPlayersItems}
            values={serverFilters.maxPlayers}
            onMultiSelectChange={onMultiSelectChange}
          />
        </Box>
        <Box sx={{ width: "20%" }}>
          <FilterMultiSelect
            name="hasPassword"
            placeholder="Protected"
            renderValueText="setting(s)"
            items={hasPasswordItems}
            values={serverFilters.hasPassword}
            onMultiSelectChange={onMultiSelectChange}
          />
        </Box>
        <Box sx={{ width: "20%" }}></Box>
        <Box sx={{ width: "20%" }}></Box>
        <Box sx={{ width: "20%" }}>
          <Stack direction="row" spacing={1} sx={{ justifyContent: "right" }}>
            <Tooltip title="Clear filters" placement="left">
              <IconButton color="primary" onClick={onClearFilters}>
                <BackspaceIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh servers" placement="right">
              <IconButton color="primary" onClick={refreshServers}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
