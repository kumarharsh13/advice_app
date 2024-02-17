import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  async function getAdvice() {
    try {
      setIsLoading(true);
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setIsLoading(false);
      setAdvice(data.slip.advice);
      setCount((c) => c + 1);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(function () {
    getAdvice();
  }, []);

  function AdviceContainer() {
    return (
      <div className="advice-container">
        <h1 className="advice">
          <i class="fa fa-quote-left"></i>
          {advice}
        </h1>
      </div>
    );
  }
  function Message(props) {
    return (
      <p>
        You have read <strong>{count}</strong> pieces of advice
      </p>
    );
  }

  function Loader() {
    return (
      <div className="loader-conatiner">
        <div class="loader" id="loader"></div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="title-container">
        <h1>Hi, Advice for You</h1>
      </div>
      {isLoading ? <Loader /> : <AdviceContainer />}
      <div className="button-container">
        <button
          onClick={getAdvice}
          disabled={isLoading}
          className="newadvice-button"
          id="newadvice"
        >
          Click Me
        </button>
        <Message count={count} />
      </div>
    </div>
  );
}

export default App;
