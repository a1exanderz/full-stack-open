const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  );
};

const Footer = () => {
  return <div>Footer</div>;
};

const App = () => {
  const name = "Peter";
  const age = 16;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
      <Footer />
    </div>
  );
};

export default App;
