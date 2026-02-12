import { create } from "zustand";

interface State {
  isPaused: boolean;
  isPauseLocked: boolean;
}

interface Actions {
  setState(update: Partial<State>): void;
}

interface Store {
  values: State;
  actions: Actions;
}

const initialState: State = { isPaused: false, isPauseLocked: false };

export const usePause = create<Store>((set) => ({
  values: { ...initialState },
  actions: {
    setState: (update) =>
      set((state) => ({ ...state, values: { ...state.values, ...update } })),
  },
}));
