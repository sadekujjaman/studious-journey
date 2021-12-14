import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import { ShortPageForm } from "../components/layout/dashboard-wrapper";
import { WrapperPage } from "../components/page-component/page-wrapper";
import { Project, Review, Team } from "../types/utils";
import * as formik from "formik";
import * as widgets from "../components/widgets";
import { Button } from "../components/common/button";
import * as Yup from "yup";
import { Typography } from "../components/widgets";
import {
  Avatar,
  Breadcrumbs,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import PeopleIcon from "@mui/icons-material/People";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import { ArrowRight, ArrowDropDown } from "@mui/icons-material";
import {
  CollapsibleList,
  CollapsibleListItem,
} from "../components/page-component/collapse-list";

import { Row } from "../components/layout/row";

const Accordion = styled((props: any) => (
  <MuiAccordion disableGutters elevation={0} square {...props}>
    {props.children}
  </MuiAccordion>
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ReviewPage = ({ review }: { review: Review }) => {
  const [userName, setUserName] = useState<string>("");
  // const [userName, setUserName] = useState<string>(review.userName);
  const userLink = `/users/${review.userId}`;
  useEffect(() => {
    const fetchUser = async () =>{
      const response = await axios.get(`/api/users/${review.userId}`)
      setUserName(`user Name - ${response.data.data.name}`)
    }
    fetchUser()
    // setUserName(`User Name - ${review.id}`);
  }, [review]);

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Link underline="hover" color="inherit" href={userLink}>
                {`${userName}`}
              </Link>
            </>
          }
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                // component="span"
                variant="body2"
                color="text.primary"
              >
                {`${review.message}`}
              </Typography>
              {/* {" — I'll be in your neighborhood doing errands this…"} */}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

const Reviews = ({ projectId }: { projectId: string }) => {
  const [id, setId] = useState<string>(projectId);
  const [reviewOpen, setReviewOpen] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [review, setReview] = useState<string>("");
  useEffect(() => {
    const fetchReview = async () => {
      const response = await axios.get(`/api/reviews/${projectId}`);
      const reviewData: Review[] = [];
      console.log("review,", response);

      for (const review of response.data.data) {
        reviewData.push({
          id: review.id,
          userId: review.userId,
          message: review.message,
          // id: "review_1",
          // userId: "User 1",
          // message: "Review 1 goes here",
        });
      }
      setReviews(reviewData);
    };
    fetchReview();
    // const reviewData: Review[] = [
    //   {
    //     id: "review_1",
    //     userId: "User 1",
    //     message: "Review 1 goes here",
    //   },
    //   {
    //     id: "review_2",
    //     userId: "User 2",
    //     message: "Review 2 goes here",
    //   },
    //   {
    //     id: "review_3",
    //     userId: "User 1",
    //     message: "Review 3 goes here",
    //   },
    // ];
    // setReviews(reviewData);
  }, [projectId]);

  const submitReview = () => {
    setReviews((prevReviews) => {
      const newReview: Review = {
        id: `${new Date().getMilliseconds()}`,
        userId: "User abc",
        message: review,
      };
      const newReviews = [...prevReviews, newReview];
      return newReviews;
    });
    setReview("");
  };

  return (
    <>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary aria-controls="panel1d-content">
          <Typography>Reviews ({`${reviews.length}`})</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {reviews &&
              reviews.map((review, idx) => (
                <ReviewPage key={`review-${review.id}`} review={review} />
              ))}
          </List>
          <Row>
            <TextField
              name="content"
              // label="Review"
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              fullWidth
              multiline
              minRows={3}
            />
            <Button
              label="Submit Review"
              variant="contained"
              type="submit"
              size="large"
              onClick={submitReview}
              style={{ margin: "10px" }}
            />
          </Row>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const TeamInfo = ({ teamId }: { teamId: string }) => {
  const [id, setId] = useState<string>(teamId);
  const [team, setTeam] = useState<Team>();
  const [teamOpen, setTeamOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await axios.get(`/api/teams/${teamId}`);
      console.log(response);
      const members = [];
      for (const student of response.data.data.Student) {
        members.push(`
        ${student.User.name}
        (${student.registrationNo})
        `);
      }
      const teamData: Team = {
        id: teamId,
        name: response.data.data.name,
        members: members,
      };
      setTeam(teamData);
    };
    fetchTeam();
  }, [teamId]);

  // useEffect(() => {
  //   const members = team?.members.map((member) => {
  //     return { title: member, url: member } as CollapsibleListItem;
  //   }) as CollapsibleListItem[];
  //   setMemberList(members);
  // }, [team]);

  const getMemberList = (): CollapsibleListItem[] => {
    const members = team?.members.map((member) => {
      return { title: member, url: "users/101" } as CollapsibleListItem;
    }) as CollapsibleListItem[];
    return members;
  };

  return (
    <>
      <ListItemButton onClick={() => setTeamOpen(!teamOpen)}>
        <ListItemIcon>
          {teamOpen ? <ArrowDropDown /> : <ArrowRight />}
        </ListItemIcon>
        <ListItemText primary={team?.name} />
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
      </ListItemButton>
      <CollapsibleList open={teamOpen} listItems={getMemberList()} />
    </>
  );
};

const ProjectInfoSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  summary: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

const ProjectInfoForm = ({ active }: { active: boolean }) => {
  const { isSubmitting, values, setFieldValue, isValid } =
    formik.useFormikContext() as any;
  return (
    <formik.Form>
      <widgets.TextField
        name="title"
        label="Title"
        fullWidth
        disabled={!active}
      />
      <widgets.TextField
        name="summary"
        label="Summary"
        fullWidth
        multiline
        disabled={!active}
      />
      <widgets.TextField
        name="content"
        label="Content"
        fullWidth
        multiline
        disabled={!active}
      />
      <br />
      {active && (
        <Button
          disabled={isSubmitting || !isValid}
          label="Save"
          variant="contained"
          type="submit"
          size="large"
          style={{ margin: "10px" }}
        />
      )}
    </formik.Form>
  );
};

const ProjectInfoPromt = ({ project }: { project: Project }) => {
  console.log("INFO:", project);
  const [initialValues, setInitialValues] = useState<Project>({ ...project });
  const [courseName, setCourseName] = useState<string>("");

  const { query } = useRouter();
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/courses">
      Courses
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/courses">
      {courseName}
    </Link>,
    <Link underline="none" key="3" color="inherit">
      {project.title}
    </Link>,
  ];
  const saveProjectInfo = async (
    projectData: Project,
    { setSubmitting }: any
  ) => {
    try {
      console.log(projectData);

      console.log("Project saved...");
    } catch (e) {
      console.log("Error occured during user info saved... ", e);
    }
    setSubmitting(false);
  };

  const fetchCourseName = async () => {
    const response = await axios.get(`/api/courses/${project.courseId}`);
    console.log(response);
    setCourseName(response.data.data.name);
  };

  useEffect(() => {
    fetchCourseName();
  }, []);

  function extraValidate() {
    const errors = {} as any;
    return errors;
  }

  const handleProjectStatusChange = () => {
    setInitialValues((prevProject) => ({
      ...prevProject,
      active: !prevProject.active,
    }));
  };

  useEffect(() => {
    console.log(initialValues);
  }, [initialValues]);

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      {!initialValues.active && (
        <>
          <Typography variant="h6" sx={{ color: "#970707", marginTop: "20px" }}>
            *** This project archived at {project.completionDate} ***
          </Typography>
        </>
      )}
      <Button
        label={
          initialValues.active ? "Mark as archived" : "Remove from archived"
        }
        variant="outlined"
        type="submit"
        size="large"
        onClick={handleProjectStatusChange}
        style={{ margin: "10px" }}
      />
      <Typography variant="h3" sx={{ marginTop: "20px" }}>
        Project Info
      </Typography>
      <Divider />
      <formik.Formik
        initialValues={initialValues}
        validationSchema={ProjectInfoSchema}
        validate={extraValidate}
        onSubmit={saveProjectInfo}
      >
        <ProjectInfoForm active={initialValues.active} />
      </formik.Formik>
      <TeamInfo teamId={project.team} />
      <Reviews projectId={project.id} />
    </>
  );
};

const ProjectDashboard = () => {
  const { query } = useRouter();
  console.log(">>", query.projectId);
  const [projectId, setProjectId] = useState<string>(query.projectId as string);
  console.log(projectId);

  const [project, setProject] = useState<Project>();

  useEffect(() => {
    setProjectId(() => {
      return query.projectId as string;
    });
  }, [query.projectId]);

  useEffect(() => {
    // let projectData: Project = {
    //   id: "Id_1",
    //   courseId: "Course_Id_1",
    //   title: "Project 1",
    //   summary:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    //   content: "Content 1",
    //   active: false,
    //   team: "Team_Id_1",
    //   completionDate: "10/10/2021",
    // };

    const fetchProject = async () => {
      const response = await axios.get(`/api/projects/${projectId}`);
      console.log(response);
      setProject(() => response.data.data);
    };

    fetchProject();
    // setProject(projectData);
  }, [projectId]);

  return (
    <>
      <ShortPageForm>
        {project && (
          <>
            <ProjectInfoPromt project={project as Project} />
          </>
        )}
      </ShortPageForm>
    </>
  );
};

const Home = () => {
  return (
    <>
      <WrapperPage title="Project Profile">
        {() => <ProjectDashboard />}
      </WrapperPage>
    </>
  );
};

export default Home;
