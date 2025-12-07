import { useEffect, useMemo } from "react";
import "./App.css";
import { createAppController } from "./core/AppController";
import AppLayout from "./ui/AppLayout";

const App = () => {
  const controller = useMemo(() => createAppController(), []);

  useEffect(() => {
    controller.bootstrap();
  }, [controller]);

  return <AppLayout controller={controller} />;
};

export default App;
