import type { AppController } from "../core/AppController";

type AppLayoutProps = {
  controller: AppController;
};

const AppLayout = ({ controller }: AppLayoutProps) => (
  <div className="app">
    <header className="app__header">
      <p className="app__title">Hello world</p>
      <p className="app__subtitle">Tauri + React + TypeScript starter</p>
    </header>

    <section className="app__section">
      <p className="app__note">
        UI depends on the core controller; replace the default storage adapter from infra as the
        implementation evolves.
      </p>
      <p className="app__note">
        Active storage adapter: {controller.storage() ? "in-memory placeholder" : "not configured"}
      </p>
    </section>
  </div>
);

export default AppLayout;
