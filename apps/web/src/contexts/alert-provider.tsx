"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { AlertDialog } from "@/components/alert-dialog";

export type AlertParams = {
  variant: "success" | "error";
  message: ReactNode;
};

type AlertContextProps = (data: AlertParams) => void;

const AlertContext = createContext<AlertContextProps | null>(null);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [open, setOpen] = useState(false);
  const [alertParams, setAlertParams] = useState<AlertParams | null>(null);

  const alert = useCallback((params: AlertParams) => {
    setOpen(true);
    setAlertParams(params);
  }, []);

  return (
    <AlertContext.Provider value={alert}>
      {children}
      {alertParams && (
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          variant={alertParams.variant}
        >
          {alertParams.message}
        </AlertDialog>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within a AlertContextProvider");
  }

  return context;
};
