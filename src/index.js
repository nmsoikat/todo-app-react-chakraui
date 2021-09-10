import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

// const config = {
//   initialColorMode: "light",
//   useSystemColorMode: false,
// };

// const theme = extendTheme({
//   config,
// });

// <ChakraProvider theme={theme}>
// <ColorModeScript initialColorMode={theme.config.initialColorMode} />

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode="light" />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);