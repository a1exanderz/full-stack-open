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

export default ListCourses;
