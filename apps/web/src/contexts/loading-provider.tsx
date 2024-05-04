"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { LoadingDialog } from "@/components";

interface LoadingParams {
  title: string;
  body?: ReactNode;
}

interface LoadingContextProps {
  loading: boolean;
  params: LoadingParams
  startLoading: (params: LoadingParams) => void;
  finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | null>(null);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<LoadingParams>({
    title: "",
  });

  const startLoading = useCallback((params: LoadingParams) => {
    setParams(params);
    setLoading(true);
  }, []);

  const finishLoading = useCallback(() => {
    setParams({
      title: "",
    });
    setLoading(false);
  }, []);

  return (
    <LoadingContext.Provider
      value={{ loading, params, startLoading, finishLoading }}
    >
      {children}
      <LoadingDialog
        open={loading}
        onOpenChange={finishLoading}
        title={params.title}
        body={params.body}
      />
    </LoadingContext.Provider>
  );
};

export const useLoading = (
  params: LoadingParams
): { startLoading: () => void; finishLoading: () => void } => {
  const { startLoading, finishLoading } = useContext(LoadingContext)!;
  return {
    startLoading: () => startLoading(params),
    finishLoading: () => finishLoading(),
  };
};
