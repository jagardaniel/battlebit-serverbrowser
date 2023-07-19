import { useEffect, Dispatch, SetStateAction } from "react";
import { GameModes } from "../types/GameModes";
import { Maps } from "../types/Maps";
import { Regions } from "../types/Regions";
import { Option } from "../types/Option";

import { MultiSelect } from "react-multi-select-component";

type Props = {
  filterText: string;
  selectedGameModes: Option[];
  selectedMaps: Option[];
  selectedOfficial: Option[];
  selectedRegions: Option[];
  onFilterTextChange: Dispatch<SetStateAction<string>>;
  onSelectedGameModeChange: Dispatch<SetStateAction<Option[]>>;
  onSelectedMapsChange: Dispatch<SetStateAction<Option[]>>;
  onSelectedOfficialChange: Dispatch<SetStateAction<Option[]>>;
  onSelectedRegionsChange: Dispatch<SetStateAction<Option[]>>;
}

export default function FilterBar({ filterText, selectedGameModes, selectedMaps, selectedOfficial, selectedRegions, onFilterTextChange, onSelectedGameModeChange, onSelectedMapsChange, onSelectedOfficialChange, onSelectedRegionsChange } : Props) {
  // Create multiselect for all game modes
  const gameModeOptions: Option[] = [];
  for (const [key, value] of Object.entries(GameModes)) {
    gameModeOptions.push({label: value, value: key});
  }

  const regionsOptions = [];
  for (const [key, value] of Object.entries(Regions)) {
    const regionSplit = key.split("_");
    regionsOptions.push({label: regionSplit[0], value: key});
  }

  const mapOptions = [];
  for (const map of Maps) {
    mapOptions.push({label: map, value: map});
  }

  const officialOptions = [
    {label: "Official", value: "true"},
    {label: "Community", value: "false"}
  ];

  const gameModesValueRenderer = (selected: Option[], _options: Option[]) => {
    return selected.length
      ? selected.length + " mode(s) selected"
      : "Game modes";
  };

  const mapsValueRenderer = (selected: Option[], _options: Option[]) => {
    return selected.length
      ? selected.length + " map(s) selected"
      : "Maps";
  };

  const regionsValueRenderer = (selected: Option[], _options: Option[]) => {
    return selected.length
      ? selected.length + " region(s) selected"
      : "Regions";
  };

  const officialValueRenderer = (selected: Option[], _options: Option[]) => {
    return selected.length
    ? selected.map(function(elem){return elem.label}).join(", ")
      : "Server type";
  };

  // Use instead?
  useEffect(() => {

  }, []);

  return (
    <div className="grid grid-cols-6 gap-2 mb-1">
      <div className="col-span-2">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd">
                </path>
            </svg>
          </div>
            <input 
              type="text"
              id="table-search"
              className="border text-sm rounded-lg block pl-10 p-2.5 bg-slate-700 border-gray-600 placeholder-slate-400 text-white w-11/12 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by name"
              value={filterText}
              onChange={(e) => onFilterTextChange(e.target.value)}
            />
        </div>
      </div>
      <div className="text-sm placeholder-slate-400 text-slate-300 mt-1">
        <MultiSelect
          options={gameModeOptions}
          value={selectedGameModes}
          onChange={onSelectedGameModeChange}
          labelledBy="Select game modes"
          disableSearch={true}
          hasSelectAll={false}
          valueRenderer={gameModesValueRenderer}
        />
      </div>
      <div className="text-sm placeholder-slate-400 text-slate-300 mt-1">
        <MultiSelect
          options={mapOptions}
          value={selectedMaps}
          onChange={onSelectedMapsChange}
          labelledBy="Select maps"
          hasSelectAll={false}
          valueRenderer={mapsValueRenderer}
        />
      </div>
      <div className="text-sm placeholder-slate-400 text-slate-300 mt-1">
        <MultiSelect
          options={regionsOptions}
          value={selectedRegions}
          onChange={onSelectedRegionsChange}
          labelledBy="Select regions"
          disableSearch={true}
          hasSelectAll={false}
          valueRenderer={regionsValueRenderer}
        />
      </div>
      <div className="text-sm placeholder-slate-400 text-slate-300 mt-1">
        <MultiSelect
          options={officialOptions}
          value={selectedOfficial}
          onChange={onSelectedOfficialChange}
          labelledBy="Select type"
          disableSearch={true}
          hasSelectAll={false}
          valueRenderer={officialValueRenderer}
        />
      </div>
    </div>
  );
}
