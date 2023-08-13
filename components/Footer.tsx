"use client";

import Link from "next/link";
import { GitHub } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box px={1}>
      <Grid container spacing={24} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography variant="caption">
            This site is not affiliated with BattleBit Remastered/SgtOkiDoki
          </Typography>
        </Grid>
        <Grid item mt={0.5}>
          <Typography variant="caption">
            <Link
              target="_blank"
              rel="noopener"
              href="https://github.com/jagardaniel/battlebit-serverbrowser"
              color="white"
            >
              <GitHub sx={{ color: "text.primary" }} />
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
