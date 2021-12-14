import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { ShortPageForm } from "../components/layout/dashboard-wrapper";
import { WrapperPage } from "../components/page-component/page-wrapper";
import { Student, Teacher, User } from "../types/utils";
import * as formik from "formik";
import * as widgets from "../components/widgets";
import { Button } from "../components/common/button";
import * as Yup from "yup";
import { Typography } from "../components/widgets";
import { FormControlLabel, Switch } from "@mui/material";
const TeacherInfoSchema = Yup.object().shape({
  designation: Yup.string().required("Required"),
});

const TeacherInfoForm = () => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      <widgets.TextField
        name="designation"
        label="Designation"
        fullWidth={true}
      />

      <br />
      <Button
        disabled={isSubmitting || !isValid}
        label="Save"
        variant="contained"
        type="submit"
        size="large"
        style={{ margin: "10px" }}
      />
    </formik.Form>
  );
};

const TeacherInfoPromt = ({ teacher }: { teacher: Teacher }) => {
  const initialValues = teacher;

  const { query } = useRouter();

  const saveTeacherInfo = async (
    teacherData: Teacher,
    { setSubmitting }: any
  ) => {
    try {
      console.log(teacherData);

      console.log("Teacher saved...");
    } catch (e) {
      console.log("Error occured during user info saved... ", e);
    }
    setSubmitting(false);
  };

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }

  return (
    <>
      <Typography variant="h3" sx={{ marginTop: "20px" }}>
        Teacher Info
      </Typography>
      <formik.Formik
        initialValues={{
          ...teacher,
        }}
        validationSchema={TeacherInfoSchema}
        validate={extraValidate}
        onSubmit={saveTeacherInfo}
      >
        <TeacherInfoForm />
      </formik.Formik>
    </>
  );
};

const StudentInfoSchema = Yup.object().shape({
  // id: Yup.string().required("Required"),
  registrationNo: Yup.string().required("Required"),
  session: Yup.string().required("Required"),
});

const StudentInfoForm = () => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      {/* <widgets.TextField
        name="id"
        label="Id"
        fullWidth={true}
        disabled={true}
      /> */}
      <widgets.TextField
        name="registrationNo"
        label="Registration No"
        fullWidth={true}
      />
      <widgets.TextField name="session" label="Session" fullWidth={true} />

      <br />
      <Button
        disabled={isSubmitting || !isValid}
        label="Save"
        variant="contained"
        type="submit"
        size="large"
        style={{ margin: "10px" }}
      />
    </formik.Form>
  );
};

const StudentInfoPromt = ({ student }: { student: Student }) => {
  const initialValues = student;

  const { query } = useRouter();

  const saveStudentInfo = async (
    studentData: Student,
    { setSubmitting }: any
  ) => {
    try {
      console.log(studentData);

      console.log("Student saved...");
    } catch (e) {
      console.log("Error occured during user info saved... ", e);
    }
    setSubmitting(false);
  };

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }

  return (
    <>
      <Typography variant="h3" sx={{ marginTop: "20px" }}>
        Student Info
      </Typography>
      <formik.Formik
        initialValues={{
          ...student,
        }}
        validationSchema={StudentInfoSchema}
        validate={extraValidate}
        onSubmit={saveStudentInfo}
      >
        <StudentInfoForm />
      </formik.Formik>
    </>
  );
};

const UserInfoSchema = Yup.object().shape({
  id: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  contactNo: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  avatarURL: Yup.string(),
});

const UserInfoForm = () => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      <widgets.TextField
        name="id"
        label="Id"
        fullWidth={true}
        disabled={true}
      />
      <widgets.TextField name="name" label="Name" fullWidth={true} />
      <widgets.TextField name="email" label="Email" fullWidth={true} />
      <widgets.TextField name="contactNo" label="ContactNo" fullWidth={true} />
      <widgets.TextField
        name="department"
        label="Department"
        fullWidth={true}
      />
      <widgets.TextField name="avatarURL" label="AvatarURL" fullWidth={true} />

      <br />
      <Button
        disabled={isSubmitting || !isValid}
        label="Save"
        variant="contained"
        type="submit"
        size="large"
        style={{ margin: "10px" }}
      />
    </formik.Form>
  );
};

const UserInfoPromt = ({ user }: { user: User }) => {
  const initialValues = user;

  const { query } = useRouter();
  const projectId = query.projectId as string;

  const saveUserInfo = async (userData: User, { setSubmitting }: any) => {
    try {
      console.log(userData);
      const response = await axios.post(`/api/users/${user.id}`, {
        user: userData,
      });
      console.log(response);
      console.log("User saved...");
    } catch (e) {
      console.log("Error occured during user info saved... ", e);
    }
    setSubmitting(false);
  };

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }

  return (
    <>
      <Typography variant="h3" sx={{ marginTop: "20px" }}>
        User Info
      </Typography>
      <formik.Formik
        initialValues={{
          ...user,
        }}
        validationSchema={UserInfoSchema}
        validate={extraValidate}
        onSubmit={saveUserInfo}
      >
        <UserInfoForm />
      </formik.Formik>
    </>
  );
};

const UserProfile = () => {
  const { query } = useRouter();
  const userId = query.userId as string;

  const [user, setUser] = useState<User>();
  const [student, setStudent] = useState<Student>();
  const [teacher, setTeacher] = useState<Teacher>();
  const [type, setType] = useState(true);
  const fetchUser = async () => {
    const response = await axios.get(`/api/users/${userId}`);
    console.log("user", response.data.data);
    setUser(response.data.data);

    // const userData: User = {
    //   id: "101",
    //   name: "Hello World",
    //   email: "abc@gmail.com",
    //   contactNo: "01539333933",
    //   department: "CSE",
    //   avatarURL: "",
    // };
    // setUser(userData);
  };
  const fetchStudent = async () => {
    const response = await axios.get(`/api/students/${userId}`);
    console.log("student", response.data.data);
    setStudent(response.data.data);

    // const studentData: Student = {
    //   id: "201",
    //   userId: "101",
    //   registrationNo: "2016331020",
    //   session: "",
    // };
    // setStudent(studentData);
  };
  const fetchTeacher = async () => {
    const response = await axios.get(`/api/teachers/${userId}`);
    console.log("teacher", response.data.data);
    setTeacher(response.data.data);

    // const teacherData: Teacher = {
    //   id: "301",
    //   userId: "101",
    //   designation: "Professor",
    // };
    // setTeacher(teacherData);
  };
  useEffect(() => {
    fetchUser();
    fetchStudent();
    fetchTeacher();
  }, []);

  return (
    <>
      <ShortPageForm>
        {user && <UserInfoPromt user={user as User} />}
        {student && <StudentInfoPromt student={student as Student} />}
        {teacher && <TeacherInfoPromt teacher={teacher as Teacher} />}
        {!student && !teacher && type && (
          <>
            <StudentInfoPromt student={student as unknown as Student} />
          </>
        )}
        {!student && !teacher && (
          <>
            <FormControlLabel
              value="start"
              control={
                <Switch
                  checked={!type}
                  onChange={() => setType(!type)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Register as a teacher!"
              labelPlacement="start"
            />
            {/* <Switch
              checked={!type}
              onChange={() => setType(!type)}
              inputProps={{ "aria-label": "controlled" }}
            /> */}
          </>
        )}
        {!student && !teacher && !type && (
          <>
            <TeacherInfoPromt teacher={teacher as unknown as Teacher} />
          </>
        )}
      </ShortPageForm>
    </>
  );
};

const UserPage = () => {
  return (
    <>
      <WrapperPage title="User Profile">{() => <UserProfile />}</WrapperPage>
    </>
  );
};

export default UserPage;
function initialValues(
  initialValues: any,
  arg1: { name: string; email: string }
) {
  throw new Error("Function not implemented.");
}
