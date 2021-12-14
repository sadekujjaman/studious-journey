import React, { ReactElement, useState } from "react";
import { Typography, IconButton, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import TurnedInIcon from "@mui/icons-material/TurnedIn";

import {
  AbsoluteRightUpper,
  MultiLineTruncate,
} from "../../layout/dashboard-wrapper";
import { Badge } from "../../widgets";
import { Card, CardProps } from "./card";

export type ImageCardProps = {
  /**
   * Card image/thumbnail
   */
  image?: string;
  /**
   * Icon in top right corner
   */
  icon?: ReactElement;
  /**
   * is the project active? (display thumbnail or badge)
   */
  active?: boolean;
} & CardProps;

const StyledTurnedInIcon = styled(TurnedInIcon)(({ theme }) => ({
  fill: theme.palette.error.main,
  stroke: grey[600],
  strokeWidth: 1,
}));

/**
 * Project card
 *
 * TODO:
 * - rename or make a general image card (e.g. where icon can be anything, not just bookmark)
 * - probably move the action elsewhere, maybe to the footer
 */
const ImageCard = ({
  image,
  title,
  subtitle,
  actions,
  children,
  active,
}: ImageCardProps): JSX.Element => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Card
      actions={actions}
      image={image}
      imageProps={{
        alt: `Thumbnail image showing one of the charts from ${title} landscape`,
        height: "48%",
        sx: { display: "block" },
      }}
      sx={{ position: "relative", height: 370 }}
    >
      {!active && <Badge>Coming Soon</Badge>}
      <AbsoluteRightUpper>
        <IconButton
          aria-label="bookmarked"
          edge="end"
          onClick={() => setBookmarked(!bookmarked)}
          size="small"
        >
          <StyledTurnedInIcon
            fontSize="large"
            sx={!bookmarked ? { fill: grey[300] } : {}}
          />
        </IconButton>
      </AbsoluteRightUpper>
      <MultiLineTruncate maxLines={2}>
        <Typography variant="h5">{title}</Typography>
      </MultiLineTruncate>
      <Typography color="text.secondary" variant="caption">
        {subtitle}
      </Typography>
      <MultiLineTruncate maxLines={3}>
        <Typography variant="body1">{children}</Typography>
      </MultiLineTruncate>
    </Card>
  );
};

export { ImageCard };
