import { useMainViewContext } from "@/context/MainViewContext/Context";
import { MainViews } from "@/components/pages/Main/MainViews";
import { Suspense } from "react";

const Main = () => {
  const { mainView } = useMainViewContext();

  const ActiveView = MainViews[mainView];

  return (
    <main className="px-10 h-full max-w-350 mx-auto">
      <Suspense fallback="Loading...">
        <ActiveView />
      </Suspense>
    </main>
  );
};

export default Main;
