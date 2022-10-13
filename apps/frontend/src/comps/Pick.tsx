import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ActionIcon, Box, Card, Stack, TextInput, Title } from "@mantine/core";
import { Side } from "interface/socket";
import { Pick } from "interface/state";
import { useEffect, useState } from "react";
import { useWsState } from "store/redux.hooks";
import { ArrowsUpDown } from "tabler-icons-react";
import { getImagePath } from "utils/getImagePath";
import { useWsDispatch } from "ws-client/socket.hook";
import { useSequenceSelect } from "../contexts/sequenceSelect.provider";

interface Props {
  side: Side;
  pick: Pick;
}
const PickComponent = ({ pick, side }: Props) => {
  const { setPlayer } = useWsDispatch();
  const [name, set] = useState(pick.displayName);
  const { sequenceSelected, isSelected, selectSequence } = useSequenceSelect();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: pick.id });

  const { status } = useWsState();

  useEffect(() => {
    set(pick.displayName);
  }, [pick.displayName]);

  const onBlur = () => {
    setPlayer({ displayName: name, id: pick.id, team: side });
  };

  const isActive = pick.status === "active";

  const selected = isSelected(pick.id, side, "pick");

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onClick = () => {
    selectSequence(pick.id, side, "pick");
  };
  return (
    <Card
      withBorder
      p={0}
      sx={(theme) => ({
        position: "relative",
        cursor: "pointer",
        width: "100%",
        border:
          selected || (isActive && sequenceSelected === null)
            ? `4px solid ${theme.colors.blue[9]}`
            : "",
        ...styles,
      })}
      {...attributes}
      ref={setNodeRef}
      onClick={onClick}
    >
      <Box
        sx={{
          width: "100%",
          height: 130,
          backgroundImage: `url("${getImagePath(pick.champion.image)}")`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          opacity: pick.status === "active" && pick.champion ? 0.5 : 1,
          boxShadow: isActive ? "inset 0 0 30px blue" : "none",
        }}
      />
      {status === "completed" && (
        <ActionIcon
          variant="filled"
          sx={{ position: "absolute", top: 5, right: 5 }}
          {...listeners}
        >
          <ArrowsUpDown size={16} />
        </ActionIcon>
      )}

      <Stack
        spacing={0}
        sx={{
          position: "absolute",
          bottom: 0,
          flexDirection: "column-reverse",
        }}
      >
        <TextInput
          m="xs"
          size="xs"
          value={name}
          onChange={({ target: { value } }) => set(value)}
          onBlur={onBlur}
          placeholder={`Player ${pick.id + 1}`}
        />

        <Title
          order={4}
          color="white"
          px="sm"
          sx={{ textShadow: "0px 4px 8px #000" }}
        >
          {pick.champion.name}
        </Title>
      </Stack>
    </Card>
  );
};

export default PickComponent;
