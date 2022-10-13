import { Side } from "interface/socket";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useWsState } from "store/redux.hooks";
import { defaultChampion } from "utils/defaultValues";
import { draftSequence } from "utils/draftSequence";

const sequenceSelectContext = createContext<{
  sequenceSelected: number | null;
  setSequenceSelected: (sequenceSelect: number | null) => void;
}>({
  sequenceSelected: null,
  setSequenceSelected: () => {},
});

export const useSequenceSelect = () => {
  const { sequenceSelected, setSequenceSelected } = useContext(
    sequenceSelectContext
  );
  const { currentSequence, teamA, teamB } = useWsState();
  const selectedSequence = draftSequence[sequenceSelected ?? 999] ?? [];

  const isSelected = (id: number, side: Side, action: "pick" | "ban") => {
    return (
      selectedSequence.at(2) === id &&
      selectedSequence.at(1) === action &&
      selectedSequence.at(0) === side
    );
  };

  const getSelectedChamp = () => {
    const side = selectedSequence[0];
    const action = selectedSequence[1];
    const id = selectedSequence[2];
    if (side === "teamA") {
      const actionName = action === "pick" ? "picks" : "bans";
      if (typeof id === "number")
        return teamA[actionName].at(id)?.champion || defaultChampion;
    } else {
      const actionName = action === "pick" ? "picks" : "bans";
      if (typeof id === "number")
        return teamB[actionName].at(id)?.champion || defaultChampion;
    }
    return defaultChampion;
  };

  const selectSequence = (
    actionId: number,
    side: Side,
    action: "pick" | "ban"
  ) => {
    const index = draftSequence.findIndex(
      ([s, a, id]) => s === side && a === action && id === actionId
    );

    if (index > currentSequence) return;
    setSequenceSelected(
      index < 0 || sequenceSelected === index || currentSequence === index
        ? null
        : index
    );
  };
  return {
    getSelectedChamp,
    setSequenceSelected,
    sequenceSelected,
    selectedSequence,
    isSelected,
    selectSequence,
  };
};

const SequenceSelectProvider = ({ children }: PropsWithChildren) => {
  const [sequenceSelected, setSequenceSelected] = useState<number | null>(null);
  return (
    <sequenceSelectContext.Provider
      value={{ sequenceSelected, setSequenceSelected }}
    >
      {children}
    </sequenceSelectContext.Provider>
  );
};

export default SequenceSelectProvider;
