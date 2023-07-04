import Image from 'next/image';
import { Server } from '../types/Server';

type Props = {
  server: Server;
}

export default function ServerRow({ server }: Props) {
  let imagePath = "/images/maps/" + server.Map.toLowerCase() + ".png";

  return (
    <tr>
      <td className="px-3 py-2">
        <div className="flex flex-row">
          <div className="pr-3 m-1">
            <Image
              src={imagePath}
              width={87}
              height={43}
              alt={server.Map}
            />
          </div>
          <div>
            <div className="text-base">{server.Name}</div>
            <div className="text-slate-300 text-xs mt-1 mb-1">{server.Gamemode} • {server.Map} ({server.MapSize}) • {server.Hz}Hz</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-2">
        {server.Players}/{server.MaxPlayers} {server.QueuePlayers > 0 ? '(' + server.QueuePlayers + ')': ''}
      </td>
      <td className="px-4 py-2">
        {server.HasPassword.toString()}/{server.AntiCheat}/{server.IsOfficial.toString()}
      </td>
    </tr>
  );
}
