import "./App.css";

type User = {
  name: string;
  surname: string;
};

function App() {
  const users: User[] = [
    { name: "Jose", surname: "Verdura" },
    { name: 99, surname: "Flama" },
  ];
  return (
    <main>
      <h1>Typescript lesson</h1>
    </main>
  );
}

export default App;
