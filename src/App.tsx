import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import ListViewHardware from "./pages/HardwareList/hardware-list";
import {
  theme,
  BreakpointProvider,
  Draft,
  ThemeProvider,
  ToastProvider,
  BreakpointConsumer,
} from "@resi-media/resi-ui";

function App() {
  return (
    <BreakpointProvider queries={theme.mq}>
      <BreakpointConsumer>
        {() => {
          const isDesktopPage = !document.querySelector(
            "meta[content='width=device-width, initial-scale=1.0']"
          );
          return (
            <ThemeProvider
              theme={{
                ...theme,
                mq: {
                  xs: isDesktopPage ? "@media all" : theme.mq.xs,
                  sm: isDesktopPage ? "@media all" : theme.mq.sm,
                  md: isDesktopPage ? "@media all" : theme.mq.md,
                  lg: isDesktopPage ? "@media all" : theme.mq.lg,
                  xl: isDesktopPage ? "@media all" : theme.mq.xl,
                  xxl: isDesktopPage ? "@media all" : theme.mq.xxl,
                },
              }}
            >
              <div className="App">
                <ListViewHardware />
              </div>
            </ThemeProvider>
          );
        }}
      </BreakpointConsumer>
    </BreakpointProvider>
  );
}

export default App;
