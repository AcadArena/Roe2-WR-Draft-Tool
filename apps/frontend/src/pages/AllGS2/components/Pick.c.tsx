import { Box, Stack, Title } from "@mantine/core";
import { Pick } from "interface/state";
import { getImagePath } from "utils/getImagePath";
interface Props {
  pick: Pick;
}
const PickComponent = ({ pick }: Props) => {
  const hasChampion = !!pick.champion.name;
  const isActive = pick.status === "active";
  const isCompleted = pick.status === "complete";
  console.log(pick.champion.name);
  return (
    <Box
      sx={{ position: "relative", overflow: "hidden", width: 164, height: 315 }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 164,
          height: 315,
          backgroundImage: `url("${getImagePath(pick.champion.image)}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          // boxShadow: pick.isActive ? "inset 0 0 100px #004fff" : "none",
          filter:
            pick.status === "active" && hasChampion
              ? "brightness(0.5)"
              : "brightness(1)",
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 164,
          height: 315,
          animation: isActive
            ? "fade 1s ease-in-out infinite alternate"
            : pick.champion.name
            ? "flash 1000ms ease-out"
            : "none",

          "@keyframes fade": {
            from: { boxShadow: "inset 0 0 50px #004fff" },
            to: { boxShadow: "inset 0 0 0px #004fff" },
          },

          "@keyframes flash": {
            from: { boxShadow: "inset 0 0 100px #fff" },
            to: { boxShadow: "inset 0 0 0px #004fff" },
          },
          zIndex: 3,
        }}
      />
      <Stack
        sx={{
          width: "100%",
          position: "absolute",
          bottom: 15,
          zIndex: 10,
          flexDirection: "column-reverse",
          transition: "all 300ms ease-out",
        }}
        align="center"
        spacing={3}
      >
        {hasChampion && (
          <Title
            align="center"
            color="dimmed"
            sx={{
              overflow: "visible",
              textShadow: "0px 8px 8px rgba(0,0,0,1)",
              fontSize: 11,
              transform: isCompleted ? "translateY(0px)" : "translateY(100px)",
              transition: "transform 300ms ease-out",
            }}
            lineClamp={1}
          >
            {pick.champion.name}
          </Title>
        )}
        <Title
          align="center"
          color="#fff"
          size="xl"
          sx={{
            overflow: "visible",
            textShadow: "0px 8px 8px rgba(0,0,0,1)",
            // fontFamily: "Subway",
            // letterSpacing: 2,
          }}
          lineClamp={1}
        >
          {pick.displayName}
        </Title>
      </Stack>
    </Box>
  );
};

export default PickComponent;
