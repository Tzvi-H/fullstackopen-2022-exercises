const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <p>
      <strong>total of {totalExercises} exercises</strong>
    </p>
  );
};

export default Total;
