'use client'

import { useEffect, useState } from 'react';
import ServerTable from '../components/ServerTable';
import FilterBar from './FilterBar';
import { Server } from '../types/Server';
import { Option } from '../types/Option';

export default function FilterableServerTable() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Server[]>([]);

  const [filterText, setFilterText] = useState('');
  const [selectedGameModes, setSelectedGameModes] = useState<Option[]>([]);
  const [selectedMaps, setSelectedMaps] = useState<Option[]>([]);
  const [selectedOfficial, setSelectedOfficial] = useState<Option[]>([{label: "Community", value: "false"}]);
  const [selectedRegions, setSelectedRegions] = useState<Option[]>([]);

  async function getServers() {
    try {
      const response = await fetch('https://publicapi.battlebit.cloud/Servers/GetServerList');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServers();
  }, []);

  return (
    <div className="shadow-md">
      <div className="bg-slate-800 p-3 rounded-t-lg">
        <FilterBar
          filterText={filterText}
          onFilterTextChange={setFilterText}
          selectedGameModes={selectedGameModes}
          onSelectedGameModeChange={setSelectedGameModes}
          selectedMaps={selectedMaps}
          onSelectedMapsChange={setSelectedMaps}
          selectedOfficial={selectedOfficial}
          onSelectedOfficialChange={setSelectedOfficial}
          selectedRegions={selectedRegions}
          onSelectedRegionsChange={setSelectedRegions}
        />
      </div>
      <div className="bg-slate-800">
        <ServerTable
          servers={data}
          isLoading={isLoading}
          filterText={filterText}
          selectedGameModes={selectedGameModes}
          selectedMaps={selectedMaps}
          selectedOfficial={selectedOfficial}
          selectedRegions={selectedRegions}
        />
      </div>
    </div>
  );
}
