import React, { useEffect, useState } from "react";
import axios from "axios";
import { Project } from "../types/utils";
import { WrapperPage } from "../components/page-component/page-wrapper";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Link as MuiLink, Typography } from "../components/widgets";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Row } from "../components/layout/row";
import { Col } from "../components/layout/col";
import { ImageCard } from "../components/common/card/image-card";

interface SingleProjectProps {
  id: string;
  title: string;
  summary: string;
  team: string;
  active: boolean;
}
interface Author {
  id: string;
  name: string;
}
export const authorsNormalized = (authors: Array<string>): string =>
  authors.length > 2
    ? `by ${authors.slice(0, 2).join(", ")} et al.`
    : `by ${authors.join(", ")}`;
const SingleProject = ({
  id,
  title,
  summary,
  team,
  active,
}: SingleProjectProps): JSX.Element => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await axios.get(`/api/teams/${team}`);
      const addAuthors = [];
      for (const author of response.data.data.Student) {
        addAuthors.push({ name: author.User.name, id: author.id });
      }
      setAuthors(addAuthors);
    };
    fetchTeam();
  }, []);

  return (
    <Col md={4} sm={6} sx={{ maxHeight: 500 }} xs={12}>
      <Link passHref href={{ pathname: `/projects/${id}` }}>
        <MuiLink underline="hover">
          <ImageCard
            active={active}
            image={"/demo-thumbnail.jpg"}
            subtitle={authorsNormalized(authors.map((author) => author.name))}
            title={title}
          >
            {summary}
          </ImageCard>
        </MuiLink>
      </Link>
    </Col>
  );
};

const ProjectListPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [alignment, setAlignment] = useState<string>("all_projects");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const handleChange = (
    event: any,
    newAlignment: React.SetStateAction<string>
  ) => {
    setAlignment(newAlignment);
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) => {
        return (
          (alignment === "running_projects" && project.active) ||
          (alignment === "archived_projects" && !project.active) ||
          alignment === "all_projects"
        );
      })
    );
  }, [alignment, projects]);

  const fetchProjects = async () => {
    const response = await axios.get("/api/projects");
    console.log(response.data);
    let data: Project[] = [
      {
        id: "Id_1",
        courseId: "Course_Id_1",
        title: "Project 1",
        summary:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        content: "Content 1",
        active: false,
        team: "Team_Id_1",
      },
      {
        id: "Id_2",
        courseId: "Course_Id_2",
        title: "Project 2",
        summary:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        content: "Content 2",
        active: false,
        team: "Team_Id_2",
      },
      {
        id: "Id_3",
        courseId: "Course_Id_3",
        title: "Project 3",
        summary:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        content: "Content 3",
        active: true,
        team: "Team_Id_3",
      },
      {
        id: "Id_4",
        courseId: "Course_Id_4",
        title: "Project 4",
        summary:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        content: "Content 3",
        active: true,
        team: "Team_Id_4",
      },
    ];

    // const teamIds = response.data.map((project: Project) => {
    //   return project.team;
    // });
    // const teams = [];
    // for (const teamId of teamIds) {
    //   const response = await axios.get(`/api/teams/${teamId}`);
    //   teams.push(response.data);
    // }
    // console.log("teams", teams);
    setProjects(response.data);
  };

  return (
    <Container sx={{ maxWidth: "800px", margin: "auto" }}>
      <Box className="project-heading" sx={{ mb: 4, mt: 5 }}>
        {/* <Typography variant="h2">Projects</Typography> */}
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <ToggleButton value="all_projects">All Projects</ToggleButton>
          <ToggleButton value="running_projects">Running Projects</ToggleButton>
          <ToggleButton value="archived_projects">
            Archived Projects
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Row spacing={3}>
        {filteredProjects.map((props) => (
          <SingleProject key={props.id} {...props} />
        ))}
      </Row>
    </Container>
  );
};

const ProjectsPage = () => {
  return (
    <>
      <WrapperPage title="Projects">{() => <ProjectListPage />}</WrapperPage>
    </>
  );
};

export default ProjectsPage;
