import React from "react";
import { RenderSDGS } from "./RenderSDGS.interface";
import { Box, Popover, Typography } from "@mui/material";
import { SDGSLIST } from "../../config/constants.config";

const RenderSDG = ({ ImageArray }: RenderSDGS) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Box
      display="flex"
      alignItems="center"
      // sx={{cursor:'pointer'}}
      onMouseEnter={(e) => {
        if (ImageArray.length > 3) {
          handlePopoverOpen(e);
        }
      }}
      onMouseLeave={() => {
        if (ImageArray.length > 3) {
          handlePopoverClose();
        }
      }}
    >
      <Typography>Planned</Typography>
      <Box marginLeft="4px" display="flex" alignItems="center">
        {ImageArray.slice(0, 3).map((value: number) => {
          const matchingSDG = SDGSLIST.find((sdg) => sdg.key === value);
          if (matchingSDG) {
            return (
              <img
                key={value}
                src={matchingSDG.image}
                alt={`SDG ${value}`}
                style={{ width: "30px", height: "30px", marginRight: "3px" }}
              />
            );
          }
          return null;
        })}
        {ImageArray.length > 3 ? (
          <Typography>+{ImageArray.length - 3}</Typography>
        ) : null}
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px",
            gap: "5px",
          }}
        >
          {ImageArray.map((value: number) => {
            const matchingSDG = SDGSLIST.find((sdg) => sdg.key === value);
            if (matchingSDG) {
              return (
                <img
                  key={value}
                  src={matchingSDG.image}
                  alt={`SDG ${value}`}
                  style={{ width: "40px", height: "40px" }}
                />
              );
            }
            return null;
          })}
        </Box>
      </Popover>
    </Box>
  );
};

export default RenderSDG;
