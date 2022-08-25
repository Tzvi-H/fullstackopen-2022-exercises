const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((p) => p.exercises)} />
    </div>
  );
};

const Header = ({ name }) => <h1>{name}</h1>;
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Total = ({ exercises }) => (
  <p>
    Number of exercises {exercises.reduce((acc, exercise) => acc + exercise, 0)}
  </p>
);
const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
};
export default App;
