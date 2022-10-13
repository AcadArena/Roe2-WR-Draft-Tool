import {
  MantineProvider as Provider,
  MantineProviderProps,
} from "@mantine/core";
import { PropsWithChildren } from "react";

const MantineProvider = ({
  children,
  ...props
}: PropsWithChildren<MantineProviderProps>) => {
  return (
    <Provider withNormalizeCSS withGlobalStyles {...props}>
      {children}
    </Provider>
  );
};

export default MantineProvider;
