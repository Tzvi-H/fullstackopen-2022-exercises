import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      {/* <Total exercises={course.parts.map((p) => p.exercises)} /> */}
    </div>
  );
};

export default Course;
