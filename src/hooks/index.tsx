import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootDispatch, RootState } from "../redux/store";

export const useAppDispatch = () => useDispatch<RootDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
