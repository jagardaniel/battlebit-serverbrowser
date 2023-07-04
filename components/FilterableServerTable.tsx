'use client'

import { useEffect, useState } from 'react';
import ServerTable from '../components/ServerTable';
import FilterBar from './FilterBar';
import { Server } from '../types/Server';

export default function FilterableServerTable() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Server[]>([]);

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
    <div>
      <div className="bg-slate-800 p-3 rounded-t-lg">
        <FilterBar />
      </div>
      <div className="bg-slate-800">
        <ServerTable servers={data} isLoading={isLoading} />
      </div>
    </div>
  );
}
