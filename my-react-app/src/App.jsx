import { Mortgage } from "./components/mortgage/Mortgage";
import { Result } from "./components/result/Result";
import { FormProvider } from "./context/appContext";

const App = () => {
  return (
    <FormProvider>
      <main className="d-flex flex-column flex-md-row">
        <Mortgage />
        <Result />
      </main>
    </FormProvider>
  );
};

export default App;
