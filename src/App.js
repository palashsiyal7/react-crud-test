import { useState } from 'react';
import './App.css';
import MyForm from './components/MyForm';
import ViewTable from './components/ViewTable';

function App() {
  const [isSubmited, setIsSubmited] = useState(false);
  const handleSubmited = (flag) => {
    setIsSubmited(flag);
  }
  return (
    <div className="App">
      <section>
        {isSubmited ? <ViewTable /> : <MyForm handleSubmited={handleSubmited} />}
      </section>
    </div>
  );
}

export default App;
