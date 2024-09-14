import { Mortgage } from "./components/mortgage/Mortgage";
import { Result } from "./components/result/Result";
import { AppProvider } from "./context/appContext";

const App = () => {
  return (
    <AppProvider>
      <main className="d-flex flex-column flex-md-row">
        <Mortgage />
        <Result />
      </main>
    </AppProvider>
  );
};

export default App;
