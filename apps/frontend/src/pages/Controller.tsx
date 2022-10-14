import { Stack } from "@mantine/core";
import ChampSelect from "../comps/ChampSelect";

const Controller = () => {
  return (
    <Stack
      p="sm"
      sx={{ width: "100vw", height: "100vh", boxSizing: "border-box" }}
    >
      <ChampSelect />
    </Stack>
  );
};

export default Controller;
