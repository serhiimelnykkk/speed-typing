import { useMainViewContext } from "@/context/MainViewContext/Context";
import { MainViews } from "@/components/pages/Main/MainViews";

const Main = () => {
  const { mainView } = useMainViewContext();

  const ActiveView = MainViews[mainView];

  return (
    <main className="px-10 h-full max-w-350 mx-auto">
      <ActiveView />
    </main>
  );
};

export default Main;
