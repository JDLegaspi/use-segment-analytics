import { Analytics, AnalyticsBrowser } from "@segment/analytics-next";
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import type { FC, PropsWithChildren } from "react";

export const analyticsContext = createContext<Analytics | null>(null);

export const useSegmentTracking = () => {
  const maybeContext = useContext(analyticsContext);

  if (maybeContext == null) {
    throw new Error("Did you forget to define an <SegmentProvider /> ?");
  }

  return maybeContext;
};

export const SegmentProvider: FC<PropsWithChildren<{ apiKey: string }>> = ({
  apiKey,
  children,
}) => {
  const [analytics, setAnalytics] = useState<Analytics>();

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [response] = await AnalyticsBrowser.load({
          writeKey: apiKey,
        });
        setAnalytics(response);
      } catch (e) {
        console.error("Error loading analytics client:", e);
      }
    };
    loadAnalytics();
  }, [apiKey]);

  const contextState = useMemo<Analytics | null>(() => analytics, [analytics]);

  return (
    <analyticsContext.Provider value={contextState}>
      {children}
    </analyticsContext.Provider>
  );
};
