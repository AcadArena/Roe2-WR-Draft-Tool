import { Stack } from "@mantine/core";
import ChampSelect from "../comps/ChampSelect";
import SequenceSelectProvider from "../contexts/sequenceSelect.provider";

const Controller = () => {
  return (
    <SequenceSelectProvider>
      <Stack
        p="sm"
        sx={{ width: "100vw", height: "100vh", boxSizing: "border-box" }}
      >
        <ChampSelect />
      </Stack>
    </SequenceSelectProvider>
  );
};

export default Controller;
