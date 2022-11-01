const ListCourses = ({ courses }) => {
  const computeSum = (parts) => {
    return parts.reduce((sum, part) => sum + part.exercises, 0);
  };

  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            <div>
              {course.parts.map((part) => (
                <p key={part.id}>
                  {part.name} {part.exercises}
                </p>
              ))}
            </div>
            <div>
              <b>total of {computeSum(course.parts)} exercises</b>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <ListCourses courses={courses} />;
};

export default App;
