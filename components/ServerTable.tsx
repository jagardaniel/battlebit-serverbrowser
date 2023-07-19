import ServerRow from './ServerRow';
import { Server } from '../types/Server';
import Spinner from './Spinner';
import { Option } from '../types/Option';

type Props = {
  servers: Server[];
  isLoading: boolean;
  filterText: string;
  selectedGameModes: Option[];
  selectedMaps: Option[];
  selectedOfficial: Option[];
  selectedRegions: Option[];
}

export default function ServerTable({ servers, isLoading, filterText, selectedGameModes, selectedMaps, selectedOfficial, selectedRegions }: Props) {
  const rows: React.ReactElement[] = [];

  servers.forEach((server) => {
    // Filter based on selected official type
    if (selectedOfficial.length > 0) {
      if (!selectedOfficial.some(official => official.value == server.IsOfficial.toString())) {
        return;
      }
    }

    // Filter based on game mode
    if (selectedGameModes.length > 0) {
      if (!selectedGameModes.some(mode => mode.value == server.Gamemode)) {
        return;
      }
    }

    // Filter based on selected maps
    if (selectedMaps.length > 0) {
      if (!selectedMaps.some(map => map.value == server.Map)) {
        return;
      }
    }

    // Filter based on region
    if (selectedRegions.length > 0) {
      if (!selectedRegions.some(region => region.value == server.Region)) {
        return;
      }
    }

    // Filter search input
    if (
      server.Name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }

    rows.push(
      <ServerRow
        server={server}
      />
    );
  });

  return (
    <table className="table-fixed w-full border-collapse text-left text-sm">
      <thead className="bg-slate-700 uppercase text-gray-50">
        <tr>
          <th className="px-4 py-3 w-2/3">Server</th>
          <th className="px-4 py-3">Players</th>
          <th className="px-4 py-3"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-900 border-t border-slate-900 text-slate-400">
        {isLoading ? (
          <tr>
            <td colSpan={3}>
              <div className="text-center m-5">
                <Spinner />
              </div>
            </td>
          </tr>
        ) : (
          <>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={3}>
                  <div className="text-center text-xl text-slate-500 m-5">No servers found</div>
                </td>
              </tr>
            )}
          </>
        )}
      </tbody>
    </table>
  );
}
