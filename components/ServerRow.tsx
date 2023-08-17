import Image from "next/image";
import { Server } from "@/types/Server";
import { Maps } from "@/types/Maps";
import { GameModes } from "@/types/GameModes";
import { Regions } from "@/types/Regions";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Tooltip from "@mui/material/Tooltip";

type Props = {
  server: Server;
};

export default function ServerRow({ server }: Props) {
  let imageName = Maps.includes(server.Map)
    ? server.Map.toLowerCase()
    : "unknown";

  let gameMode =
    GameModes[server.Gamemode as keyof typeof GameModes] || "Unknown mode";

  let regionFlagChar = Regions[server.Region as keyof typeof Regions] || "🌍";

  let lockIcon = server.HasPassword ? (
    <LockIcon />
  ) : (
    <LockOpenIcon sx={{ color: "#334155" }} />
  );

  let officialIcon = server.IsOfficial ? (
    <KeyboardDoubleArrowUpIcon />
  ) : (
    <KeyboardDoubleArrowUpIcon sx={{ color: "#334155" }} />
  );

  return (
    <TableRow sx={{ py: 1.2, borderBottom: 1, borderColor: "#0f172a" }}>
      <TableCell sx={{ py: 1.2 }}>
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar
              variant="square"
              sx={{
                width: 87,
                height: 43,
                boxShadow: 1,
              }}
            >
              <Image
                src={"/images/maps/" + imageName + ".png"}
                alt={server.Map}
                width={87}
                height={43}
              />
            </Avatar>
            <Stack>
              <Typography noWrap>{server.Name}</Typography>
              <Stack spacing={0.8} direction="row" alignItems="center">
                <Tooltip
                  title={server.Region.split("_")[0]}
                  placement="top-start"
                >
                  <Typography variant="body1">{regionFlagChar}</Typography>
                </Tooltip>
                <Typography variant="caption" color="text.secondary">
                  {gameMode} • {server.Map} ({server.MapSize}) • {server.Hz}Hz
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </TableCell>
      <TableCell>
        <Stack spacing={3} direction="row">
          <Tooltip
            title={server.HasPassword ? "Password protected" : "No password"}
            placement="top-start"
          >
            {lockIcon}
          </Tooltip>
          <Tooltip
            title={server.IsOfficial ? "Official server" : "Community server"}
            placement="top-start"
          >
            {officialIcon}
          </Tooltip>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography>
          {server.Players} / {server.MaxPlayers}{" "}
          {server.QueuePlayers > 0 && "(" + server.QueuePlayers + ")"}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
