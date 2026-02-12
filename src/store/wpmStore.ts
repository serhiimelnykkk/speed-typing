import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  wpm: number;
  accuracy: number;
}

interface Handlers {
  update: () => void;
  reset: () => void;
}

interface Actions {
  setState(update: Partial<State> | ((state: State) => Partial<State>)): void;
  setHandlers(
    update: Partial<Handlers> | ((state: Handlers) => Partial<Handlers>),
  ): void;
}

interface Store {
  values: State;
  actions: Actions;
  handlers: Handlers;
}

const initialState: State = {
  wpm: 0,
  accuracy: 0,
};

const initialHandlers: Handlers = {
  update: () => {},
  reset: () => {},
};

export const useWpm = create<Store>()(
  persist(
    (set) => ({
      values: { ...initialState },
      handlers: { ...initialHandlers },
      actions: {
        setState: (updater) =>
          set((state) => {
            const nextState =
              typeof updater === "function" ? updater(state.values) : updater;

            return { ...state, values: { ...state.values, ...nextState } };
          }),
        setHandlers: (updater) =>
          set((state) => {
            const nextState =
              typeof updater === "function" ? updater(state.handlers) : updater;

            return { ...state, handlers: { ...state.handlers, ...nextState } };
          }),
      },
    }),
    {
      name: "wpm",
      partialize: (state) => state.values,
      merge: (persistedState, currentState) => ({
        ...currentState,
        values: {
          ...currentState.values,
          ...(persistedState as State),
        },
      }),
    },
  ),
);
