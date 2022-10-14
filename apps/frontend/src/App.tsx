import SequenceSelectProvider from "./contexts/sequenceSelect.provider";
import Router from "./Router";

function App() {
  return (
    <SequenceSelectProvider>
      <Router />
    </SequenceSelectProvider>
  );
}

export default App;
