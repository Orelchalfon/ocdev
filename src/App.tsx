import { LanguageContextProvider, ThemeContextProvider } from "./contexts";

import ReactGA from "react-ga4";
import Router from "./router";
ReactGA.initialize(import.meta.env.VITE_GA_MI, {
  gaOptions: {
    send_page_view: false,
  },
});
const App = () => {
  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <Router />
      </LanguageContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
