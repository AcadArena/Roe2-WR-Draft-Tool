import { Card, Group } from "@mantine/core";
import Team from "./Team";

const Teams = () => {
  return (
    <Card>
      <Group spacing={100} position="center" noWrap>
        <Team side="teamA" />
        <Team side="teamB" />
      </Group>
    </Card>
  );
};

export default Teams;
