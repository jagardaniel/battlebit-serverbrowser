import ServerRow from './ServerRow';
import { Server } from '../types/Server';
import Spinner from './Spinner';

type Props = {
  servers: Server[];
  isLoading: boolean;
  filterText: string;
}

export default function ServerTable({ servers, isLoading, filterText }: Props) {
  const rows: React.ReactElement[] = [];

  servers.forEach((server) => {
    // Ignore official servers for now, this should be a filter from FilterBar
    if (server.IsOfficial) {
      return;
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
