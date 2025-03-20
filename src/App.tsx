import ReactGA from "react-ga4";
import { HelmetProvider } from "react-helmet-async";
import { LanguageContextProvider, ThemeContextProvider } from "./contexts";
import AppRoutes from "./router";
ReactGA.initialize(import.meta.env.VITE_GA_MI, {
  gaOptions: {
    send_page_view: false,
  },
});
const App = () => {
  return (
    <HelmetProvider>
      <ThemeContextProvider>
        <LanguageContextProvider>
          <AppRoutes />
        </LanguageContextProvider>
      </ThemeContextProvider>
    </HelmetProvider>
  );
};

export default App;
