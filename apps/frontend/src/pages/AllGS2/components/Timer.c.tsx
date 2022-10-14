import { Box, Stack, Text } from "@mantine/core";
import { useWsState } from "store/redux.hooks";
import arrow from "../assets/arrow.png";

const TimerComponent = () => {
  const { timer, teamA, status } = useWsState();
  const mins = Math.floor(timer / 60);
  const secs = timer % 60;

  const rotation = teamA.isActive ? 180 : 0;
  return (
    <Stack
      align="center"
      justify="center"
      sx={{
        position: "absolute",
        height: 462,
        bottom: 0,
        width: "100%",
        zIndex: 999,
      }}
    >
      <Stack
        spacing={0}
        align="center"
        sx={{ height: 200, width: 100, flexDirection: "column-reverse" }}
      >
        <Box
          sx={{
            width: 59,
            height: 53,
            backgroundImage: `url("${status !== "completed" && arrow}")`,
            transform: `rotate(${rotation}deg)`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            animation: "pulse 1s ease-out infinite alternate",

            "@keyframes pulse": {
              from: { opacity: 0.5 },
              to: { opacity: 1 },
            },
          }}
        ></Box>
        <Text size={60} color="white" sx={{ height: 80, fontFamily: "Subway" }}>
          {status !== "completed" && (
            <>
              {!!mins && `${mins}:`}
              {secs < 10 && !!mins ? `0${secs}` : secs || ""}
            </>
          )}
        </Text>
      </Stack>
    </Stack>
  );
};

export default TimerComponent;
