"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { Dialog, DialogContent } from "@unidocs/ui";

export type AlertParams = {
  body: ReactNode;
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="py-20 max-w-sm">
            {alertParams.body}
          </DialogContent>
        </Dialog>
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
