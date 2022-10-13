import {
  ActionIcon,
  Avatar,
  Group,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { Ban, Pick } from "interface/state";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useState,
  useTransition,
} from "react";
import { useChamps, useWsState } from "store/redux.hooks";
import { getImagePath } from "utils/getImagePath";
import { useWsDispatch } from "ws-client/socket.hook";
import { useSequenceSelect } from "../contexts/sequenceSelect.provider";
import Preview from "./Preview";

const ChampList = () => {
  const [selected, setSelected] = useState("");
  const { champs } = useChamps();
  const [_, startTransition] = useTransition();
  const [filter, setFilter] = useInputState("");
  const { sequenceAction } = useWsDispatch();
  const { teamA, teamB, currentSequence, status } = useWsState();
  const { getSelectedChamp, sequenceSelected, setSequenceSelected } =
    useSequenceSelect();

  const sequenceChamp = getSelectedChamp();

  const getChampStatus = (list: Ban[] | Pick[]) => {
    return list
      .map((item) => (item.status === "complete" ? item.champion.name : ""))
      .filter(Boolean);
  };
  const isAlreadyTaken = (name: string) => {
    const blockList = Array.from(
      new Set([
        ...getChampStatus(teamA.picks),
        ...getChampStatus(teamA.bans),
        ...getChampStatus(teamB.picks),
        ...getChampStatus(teamB.bans),
      ])
    );

    return blockList.includes(name);
  };

  const toggleSelect = (name: string) => () => {
    setSelected(name);
    sequenceAction({
      champion: name,
      sequenceIndex: sequenceId,
      type: "hover",
    });
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    startTransition(() => {
      setFilter(e);
    });
  };

  const sequenceId = sequenceSelected ?? currentSequence;

  const onRightClick =
    (champId: string): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.preventDefault();
      if (e.type !== "contextmenu") return;
      if (isAlreadyTaken(champId)) return;
      if (sequenceSelected !== null) setSequenceSelected(null);
      sequenceAction({
        champion: champId,
        sequenceIndex: sequenceId,
        type: "finalize",
      });
    };

  return (
    <Stack>
      <Preview isAlreadyTaken={isAlreadyTaken} selected={selected} />
      <TextInput label="Search" onChange={onChange} />
      <Group position="center">
        {Object.entries(champs).map(([id, champ]) => (
          <Tooltip key={id} label={champ.name} withArrow>
            <ActionIcon
              size="xl"
              key={champ.name}
              disabled={
                isAlreadyTaken(id) ||
                (!!filter &&
                  !champ.name
                    .toLocaleLowerCase()
                    .includes(filter.toLowerCase()))
              }
              onContextMenu={onRightClick(id)}
              onClick={toggleSelect(champ.name)}
              sx={{
                opacity:
                  isAlreadyTaken(id) ||
                  (!!filter &&
                    !champ.name
                      .toLocaleLowerCase()
                      .includes(filter.toLowerCase()))
                    ? 0.5
                    : 1,
              }}
            >
              <Avatar size="lg" src={getImagePath(champ.squareImage)} />
            </ActionIcon>
          </Tooltip>
        ))}
      </Group>
    </Stack>
  );
};

export default ChampList;
