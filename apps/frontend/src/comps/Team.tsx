import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import { Group, Stack, Title } from "@mantine/core";
import { Side } from "interface/socket";
import { useWsState } from "store/redux.hooks";
import { swap } from "ws-client/socket.emits";
import BanComponent from "./Ban";
import PickComponent from "./Pick";
interface Props {
  side: Side;
}
const Team = ({ side }: Props) => {
  const { [side]: team, status } = useWsState();

  const onDragPick = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id) return;
    if (status !== "completed" || !over) return;

    swap({
      active: active.id as number,
      over: over.id as number,
      side,
    });
  };
  return (
    <Stack spacing="xs">
      <Title order={2} align={side === "teamA" ? "left" : "right"}>
        {side === "teamA" ? "BLUE" : "RED"}
      </Title>
      <Group noWrap position={side === "teamA" ? "right" : "left"}>
        {team.bans.map((ban, index) => (
          <BanComponent side={side} key={index} ban={ban} />
        ))}
      </Group>
      <Stack spacing="xs">
        <DndContext onDragEnd={onDragPick}>
          <SortableContext items={(team.picks ?? []).map(({ id }) => id)}>
            {team.picks.map((pick) => (
              <PickComponent pick={pick} side={side} key={pick.id} />
            ))}
          </SortableContext>
        </DndContext>
      </Stack>
    </Stack>
  );
};

export default Team;
