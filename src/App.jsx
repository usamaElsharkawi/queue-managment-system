import AddCutomerForm from "./components/AddCutomerForm.jsx";
import Header from "./components/Header.jsx";
import CustomersList from "./components/CustomersList.jsx";
import { QueueProvider } from "./context/QueueContext.jsx";

function App() {
  return (
    <QueueProvider>
      <Header />
      <main className="flex gap-12 mx-auto container px-4">
        <AddCutomerForm />
        <CustomersList />
      </main>
    </QueueProvider>
  )
}

export default App
