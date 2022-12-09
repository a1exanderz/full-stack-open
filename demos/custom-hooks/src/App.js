import useCounter from "./useCounter";
import { useState } from "react";
import useField from "./useField";

// const App = (props) => {
//   const counter = useCounter();

//   return (
//     <div>
//       <div>{counter.value}</div>
//       <button onClick={counter.increase}>plus</button>
//       <button onClick={counter.decrease}>minus</button>
//       <button onClick={counter.zero}>zero</button>
//     </div>
//   );
// };

/* Right and left button version */
// const App = () => {
//   const left = useCounter();
//   const right = useCounter();

//   return (
//     <div>
//       {left.value}
//       <button onClick={left.increase}>left</button>
//       <button onClick={right.increase}>right</button>
//       {right.value}
//     </div>
//   );
// };

/* react form */
const App = () => {
  const name = useField("text");
  const born = useField("date");
  const height = useField("number");

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birth:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  );
};

export default App;
