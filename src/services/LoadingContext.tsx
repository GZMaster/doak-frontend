import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  ComponentType,
} from "react";

interface LoadingContextProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  LoadingComponent: ComponentType<{}>;
}

const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsLoading: () => {},
  LoadingComponent: () => <div>Loading...</div>,
});

interface LoadingProviderProps {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/ban-types
  LoadingComponent?: ComponentType<{}>;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  LoadingComponent = () => <div>Loading...</div>,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading, LoadingComponent }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const { isLoading, setIsLoading, LoadingComponent } =
    useContext(LoadingContext);

  return { isLoading, setIsLoading, LoadingComponent };
};
