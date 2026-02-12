import { create } from "zustand";

interface State {
  isActive: boolean;
}

interface Actions {
  setState(update: Partial<State> | ((state: State) => Partial<State>)): void;
}

interface Store {
  values: State;
  actions: Actions;
}

const initialState: State = { isActive: false };

export const useTimer = create<Store>((set) => ({
  values: { ...initialState },
  actions: {
    setState: (updater) =>
      set((state) => {
        const nextState =
          typeof updater === "function" ? updater(state.values) : updater;

        return { ...state, values: { ...state.values, ...nextState } };
      }),
  },
}));
