import { Group, Stack } from "@mantine/core";
import { Side } from "interface/socket";
import { useWsState } from "store/redux.hooks";
import { defaultBan } from "utils/defaultValues";
import BanComponent from "./Ban.c";
import PickComponent from "./Pick.c";

interface Props {
  side: Side;
}

const TeamComponent = ({ side }: Props) => {
  const { teamA, teamB } = useWsState();
  const team = side === "teamA" ? teamA : teamB;
  console.log(teamA.picks.map((pick) => pick.champion.name));
  const bans =
    team.bans.length < 5
      ? [...team.bans, ...new Array(5 - team.bans.length).fill(defaultBan)]
      : team.bans;
  return (
    <Stack spacing={20} align={side === "teamA" ? "flex-end" : "flex-start"}>
      <Group
        spacing={7}
        noWrap
        sx={{ flexDirection: side === "teamA" ? "row" : "row-reverse" }}
      >
        {bans.map((ban, index) => (
          <BanComponent
            key={index}
            sx={{
              marginLeft: side === "teamA" && index === 3 ? 34 : 0,
              marginRight: side === "teamB" && index === 3 ? 34 : 0,
            }}
            ban={ban}
          />
        ))}
      </Group>
      <Group mb={37} spacing={7} noWrap>
        {team.picks.map((pick, index) => (
          <PickComponent key={index} pick={pick} />
        ))}
      </Group>
    </Stack>
  );
};

export default TeamComponent;
