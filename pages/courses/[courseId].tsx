import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { WrapperPage } from "../components/page-component/page-wrapper";
import { Course } from "../types/utils";

const CourseInfo = ({ course }: { course: Course | undefined }) => {
  return <></>;
};

const CourseProfile = () => {
  const { query } = useRouter();
  const courseId = query.courseId as string;

  const [course, setCourse] = useState<Course>();

  const fetchCourse = async () => {
    const response = await axios.get(`/api/courses/${courseId}`);
    console.log('course', response.data.data);
    
    setCourse(response.data.data);
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <>
      {course && <CourseInfo course={course} />}
      <h1>Hello courseId {courseId}</h1>
    </>
  );
};

const CoursePage = () => {
  return (
    <>
      <WrapperPage title="Course Profile">
        {() => <CourseProfile />}
      </WrapperPage>
    </>
  );
};

export default CoursePage;
