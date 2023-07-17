import Image from 'next/image';
import { Server } from '../types/Server';
import { Maps } from '../types/Maps';
import { GameModes } from '../types/GameModes';

type Props = {
  server: Server;
}

export default function ServerRow({ server }: Props) {
  let imageName = (Maps.includes(server.Map)) ? server.Map.toLowerCase() : "unknown";
  let gameMode = GameModes[server.Gamemode as keyof typeof GameModes] || "Unknown mode";

  return (
    <tr>
      <td className="px-3 py-2">
        <div className="flex flex-row">
          <div className="pr-3 m-1">
            <Image
              src={"/images/maps/" + imageName + ".png"}
              width={87}
              height={43}
              alt={server.Map}
            />
          </div>
          <div>
            <div className="text-base mt-1">{server.Name}</div>
            <div className="text-slate-300 text-xs mb-1">
              {gameMode} • {server.Map} ({server.MapSize}) • {server.Hz}Hz
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-2">
        {server.Players}/{server.MaxPlayers} {server.QueuePlayers > 0 && '(' + server.QueuePlayers + ')'}
      </td>
      <td className="px-4 py-2">
        TODO
      </td>
    </tr>
  );
}
