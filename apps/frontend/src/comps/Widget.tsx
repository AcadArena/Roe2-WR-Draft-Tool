import { Card } from "@mantine/core";
import { useWsState } from "store/redux.hooks";
import Info from "./Info";
const Widget = () => {
  const { timer } = useWsState();
  return (
    <Card
      withBorder
      sx={{
        alignSelf: "center",
        flexShrink: 0,
      }}
    >
      <Info />
    </Card>
  );
};

export default Widget;
