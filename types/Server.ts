/*
{
  "Name": " [02][144Hz][Cla BR] Sem Chorar [64vs64]",
  "Map": "Construction",
  "MapSize": "Big",
  "Gamemode": "DOMI",
  "Region": "Brazil_Central",
  "Players": 128,
  "QueuePlayers": 0,
  "MaxPlayers": 128,
  "Hz": 144,
  "DayNight": "Day",
  "IsOfficial": false,
  "HasPassword": false,
  "AntiCheat": "EAC",
  "Build": "Production 1.6.4 Hotfix"
}
*/

export type Server = {
  Name: string;
  Map: string;
  MapSize: string;
  Gamemode: string;
  Region: string;
  Players: number;
  QueuePlayers: number;
  MaxPlayers: number;
  Hz: number;
  DayNight: string;
  IsOfficial: boolean;
  HasPassword: boolean;
  AntiCheat: string;
  Build: string;
}
