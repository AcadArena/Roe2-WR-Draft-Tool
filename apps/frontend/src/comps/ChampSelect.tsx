import { Container, Group, Stack } from "@mantine/core";
import ChampList from "./ChampList";
import Team from "./Team";
const ChampSelect = () => {
  return (
    <Stack sx={{ flex: 1 }}>
      <Group noWrap sx={{ width: "100%" }}>
        <Team side="teamA" />
        <Container size="lg">
          <ChampList />
        </Container>
        <Team side="teamB" />
      </Group>
    </Stack>
  );
};

export default ChampSelect;
