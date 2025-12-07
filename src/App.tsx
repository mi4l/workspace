import { useEffect, useMemo } from "react";
import "./App.css";
import { createAppController } from "./core/AppController";
import AppLayout from "./ui/AppLayout";
import { LocalizationProvider } from "./ui/localization/LocalizationContext";

const App = () => {
  const controller = useMemo(() => createAppController(), []);

  useEffect(() => {
    controller.bootstrap();
  }, [controller]);

  return (
    <LocalizationProvider>
      <AppLayout controller={controller} />
    </LocalizationProvider>
  );
};

export default App;
