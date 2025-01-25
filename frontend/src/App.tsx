import "./App.css";
import FormReg from "./Components/FormReg/FomReg";
// import CardBlock from "./pages/CardBlock/CardBlock";
// import FormAddCard from "./Components/FormCard/FormAddCard";

function App() {
  return (
    <div className="App">
      {/* <CardBlock /> */}
      <FormReg onSubmit={() => {}} onCancel={() => {}} />
    </div>
  );
}

export default App;
