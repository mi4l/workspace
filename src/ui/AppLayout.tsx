import type { AppController } from "../core/AppController";
import { useLocalization } from "./localization/LocalizationContext";

type AppLayoutProps = {
  controller: AppController;
};

const AppLayout = ({ controller: _controller }: AppLayoutProps) => {
  const { APP_TITLE, APP_SUBTITLE, STORAGE_NOTE, STORAGE_ADAPTER_LABEL, STORAGE_ADAPTER_ACTIVE } =
    useLocalization();

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__title">{APP_TITLE}</p>
        <p className="app__subtitle">{APP_SUBTITLE}</p>
      </header>

      <section className="app__section">
        <p className="app__note">{STORAGE_NOTE}</p>
        <p className="app__note">
          {STORAGE_ADAPTER_LABEL} {STORAGE_ADAPTER_ACTIVE}
        </p>
      </section>
    </div>
  );
};

export default AppLayout;
