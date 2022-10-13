import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { defaultChampion } from "utils/defaultValues";
import { AppDispatch, RootState } from "./redux.store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useWsState = () => useAppSelector((s) => s.state);
export const useChamps = () => {
  const champs = useAppSelector((s) => s.champs);
  const getChamp = (name: string = "") => {
    const champ = champs[name];
    return champ ?? defaultChampion;
  };
  return { champs, getChamp };
};
