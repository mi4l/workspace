import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export type LocalizationText = {
  APP_TITLE: string;
  APP_SUBTITLE: string;
  STORAGE_NOTE: string;
  STORAGE_ADAPTER_LABEL: string;
  STORAGE_ADAPTER_ACTIVE: string;
};

const defaultLocalization: LocalizationText = {
  APP_TITLE: "Hello world",
  APP_SUBTITLE: "Tauri + React + TypeScript starter",
  STORAGE_NOTE:
    "UI depends on the core controller; replace the default storage adapter from infra as the implementation evolves.",
  STORAGE_ADAPTER_LABEL: "Active storage adapter:",
  STORAGE_ADAPTER_ACTIVE: "in-memory placeholder",
};

const LocalizationContext = createContext<LocalizationText>(defaultLocalization);

const LocalizationProvider = ({
  children,
  messages = defaultLocalization,
}: {
  children: ReactNode;
  messages?: LocalizationText;
}) => <LocalizationContext.Provider value={messages}>{children}</LocalizationContext.Provider>;

const useLocalization = () => useContext(LocalizationContext);

export { LocalizationProvider, useLocalization };
