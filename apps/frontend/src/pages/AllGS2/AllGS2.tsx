import { Box } from "@mantine/core";
import { SubwayPropBerlin } from "../../fonts/SubwayProBerlin/Subway.font";
import back from "./assets/back.png";
import front from "./assets/front.png";
import commonCss from "./commonCss";
import DraftComponent from "./components/Draft.c";
import TimerComponent from "./components/Timer.c";

const OverlayAllianceGames = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: 1080,
        width: 1920,
      }}
    >
      <Box
        sx={{
          ...commonCss,
          height: 462,
          backgroundSize: "contain",
          backgroundImage: `url("${front}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 100,
        }}
      ></Box>
      <Box
        sx={{
          ...commonCss,
          height: 433,
          backgroundSize: "contain",
          backgroundImage: `url("${back}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      ></Box>
      <DraftComponent />
      <TimerComponent />
      <SubwayPropBerlin />
    </Box>
  );
};

export default OverlayAllianceGames;
