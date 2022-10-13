import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { useChamps, useWsState } from "store/redux.hooks";
import { draftSequence } from "utils/draftSequence";
import { getImagePath } from "utils/getImagePath";
import { sequenceAction } from "ws-client/socket.emits";
import { useSequenceSelect } from "../contexts/sequenceSelect.provider";
import Widget from "./Widget";

interface Props {
  isAlreadyTaken: (name: string) => boolean;
  selected: string;
}
const Preview = ({ isAlreadyTaken, selected }: Props) => {
  const { getChamp } = useChamps();
  const { currentSequence, status } = useWsState();
  const { getSelectedChamp, sequenceSelected, setSequenceSelected } =
    useSequenceSelect();

  const sequenceId = sequenceSelected ?? currentSequence;
  const sequence = draftSequence[sequenceId];

  const sequenceChamp = getSelectedChamp();
  const selectedChamp = getChamp(selected);

  const submitAction = () => {
    if (!selected) return;
    if (sequenceSelected !== null) setSequenceSelected(null);
    sequenceAction({
      champion: selected,
      sequenceIndex: sequenceId,
      type: "finalize",
    });
  };

  return (
    <Group position="center" noWrap>
      <Widget />
      <Stack>
        {sequenceSelected !== null && (
          <Group noWrap>
            <Box
              sx={(theme) => ({
                height: 50,
                width: 50,
                border: `1px solid ${theme.colors.gray[5]}`,
                borderRadius: 10,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url("${getImagePath(
                  sequenceChamp.squareImage
                )}")`,
              })}
            />
            <Stack spacing={0}>
              <Title order={5} sx={{ lineHeight: 1 }}>
                {sequenceChamp.name}
              </Title>
              <Text size="sm" sx={{ lineHeight: 1 }}>
                Selected
              </Text>
            </Stack>
          </Group>
        )}
        <Group noWrap>
          <Box
            sx={(theme) => ({
              height: 100,
              width: 100,
              border: `1px solid ${theme.colors.gray[5]}`,
              borderRadius: 10,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url("${getImagePath(
                selectedChamp.squareImage
              )}")`,
            })}
          />
          <Stack spacing={0}>
            <Title>{selectedChamp.name}</Title>
            {!!sequence && !!selected && (
              <Button
                onClick={submitAction}
                disabled={
                  !selected || isAlreadyTaken(selected) || status === "paused"
                }
                size="sm"
                color={sequence[1] === "ban" ? "red" : "blue"}
              >
                {status === "paused"
                  ? "PAUSED"
                  : `${
                      sequenceSelected !== null
                        ? `Replace ${sequenceChamp?.name} with`
                        : sequence?.[1].toUpperCase()
                    } ${selectedChamp.name}`}
              </Button>
            )}
          </Stack>
        </Group>
      </Stack>
    </Group>
  );
};

export default Preview;
