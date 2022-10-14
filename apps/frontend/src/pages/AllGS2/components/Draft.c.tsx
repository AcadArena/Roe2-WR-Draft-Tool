import { Group } from "@mantine/core";
import commonCss from "../commonCss";
import TeamComponent from "./Team.c";

const DraftComponent = () => {
  return (
    <Group
      noWrap
      spacing={127}
      align="end"
      position="center"
      sx={{
        ...commonCss,
        zIndex: 2,
      }}
    >
      <TeamComponent side="teamA" />
      <TeamComponent side="teamB" />
    </Group>
  );
};

export default DraftComponent;
