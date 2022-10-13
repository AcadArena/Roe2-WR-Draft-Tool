import { Box, Card, Center } from "@mantine/core";
import { Side } from "interface/socket";
import { Ban } from "interface/state";
import { getImagePath } from "utils/getImagePath";
import { useSequenceSelect } from "../contexts/sequenceSelect.provider";

interface Props {
  ban: Ban;
  side: Side;
}
const BanComponent = ({ ban, side }: Props) => {
  const { status, champion } = ban;
  const { sequenceSelected, selectSequence, isSelected } = useSequenceSelect();
  const selected = isSelected(ban.id, side, "ban");

  const active = status === "active";
  const onClick = () => {
    selectSequence(ban.id, side, "ban");
  };

  return (
    <Card
      withBorder
      p={0}
      onClick={onClick}
      sx={{
        cursor: "pointer",
        border:
          selected || (active && !sequenceSelected) ? "4px solid blue" : "",
      }}
    >
      <Box
        sx={{
          backgroundColor: status === "active" ? "blue" : "transparent",
          backgroundImage: `url("${getImagePath(ban.champion.squareImage)}")`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: 50,
          width: 50,
          opacity: status === "active" && champion ? 0.5 : 1,
        }}
      >
        <Center sx={{ height: "100%" }}>
          {!ban.champion.image && status !== "complete" && "BAN"}
        </Center>
      </Box>
    </Card>
  );
};

export default BanComponent;
