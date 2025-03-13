import { LanguageContextProvider, ThemeContextProvider } from "./contexts";

import Router from "./router";

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
