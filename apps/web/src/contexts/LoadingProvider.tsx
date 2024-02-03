"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { LoadingDialog } from "@/components";

interface LoadingContextProps {
  loading: boolean;
  message: string;
  startLoading: (message: string) => void;
  finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | null>(null);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const startLoading = useCallback((newMessage: string) => {
    setMessage(newMessage);
    setLoading(true);
  }, []);

  const finishLoading = useCallback(() => {
    setMessage("");
    setLoading(false);
  }, []);

  return (
    <LoadingContext.Provider
      value={{ loading, message, startLoading, finishLoading }}
    >
      {children}
      <LoadingDialog open={loading} onClose={finishLoading} message={message} />
    </LoadingContext.Provider>
  );
};

export const useLoading = ({
  message,
}: {
  message: string;
}): { startLoading: () => void; finishLoading: () => void } => {
  const { startLoading, finishLoading } = useContext(LoadingContext)!;
  return {
    startLoading: () => startLoading(message),
    finishLoading: () => finishLoading(),
  };
};
