import { Button, Stack, Text, Title } from "@mantine/core";
import { MouseEventHandler } from "react";
import { useWsState } from "store/redux.hooks";
import { useWsDispatch } from "ws-client/socket.hook";
import { useSequenceSelect } from "../contexts/sequenceSelect.provider";

const Info = () => {
  const { status, timer } = useWsState();
  const { start, pause, resetAll } = useWsDispatch();
  const { setSequenceSelected } = useSequenceSelect();
  const onRightClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setSequenceSelected(null);
    resetAll();
  };
  return (
    <Stack spacing={5} align="center">
      <Title order={3}>{timer.toString()}</Title>
      <Text size="xs">{status.toUpperCase()}</Text>
      {status !== "completed" && (
        <>
          <Button size="xs" hidden={status === "running"} onClick={start}>
            Start timer
          </Button>
          <Button
            size="xs"
            color="red"
            hidden={status === "paused"}
            onClick={pause}
          >
            Pause timer
          </Button>
        </>
      )}
      <Button size="xs" color="red" onContextMenu={onRightClick}>
        Right click to reset
      </Button>
    </Stack>
  );
};

export default Info;
