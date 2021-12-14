import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { List, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ExpandLess,
  ExpandMore,
  LocalLibrary,
  Workspaces,
} from "@mui/icons-material";
import { CollapsibleList, CollapsibleListItem } from "./collapse-list";
import Link from "next/link";

export const MainListItems = () => {
  const [teamOpen, setTeamOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);

  const [teams, setTeams] = useState<CollapsibleListItem[]>([]);
  const [projects, setProjects] = useState<CollapsibleListItem[]>([]);
  const [courses, setCourses] = useState<CollapsibleListItem[]>([]);
  // TODO: This should coming from store
  const userId: string = "101";
  
  const fetchTeams = () => {
    const data: CollapsibleListItem[] = [
      {
        title: "Team 1",
        url: "/teams/1",
      },
      {
        title: "Team 2",
        url: "/teams/2",
      },
      {
        title: "Team 3",
        url: "/teams/1",
      },
    ];
    setTeams(data);
  };
  const fetchProjects = () => {
    const data: CollapsibleListItem[] = [
      {
        title: "Project 1",
        url: "/projects/1",
      },
      {
        title: "Project 2",
        url: "/projects/2",
      },
      {
        title: "Project 3",
        url: "/projects/3",
      },
    ];
    setProjects(data);
  };
  const fetchCourses = () => {
    const data: CollapsibleListItem[] = [
      {
        title: "Course 1",
        url: "/courses/1",
      },
      {
        title: "Course 2",
        url: "/courses/2",
      },
      {
        title: "Course 3",
        url: "/courses/1",
      },
    ];
    setCourses(data);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <List>
      <Link href={{ pathname: `/users/${userId}` }} passHref>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={() => setCourseOpen(!courseOpen)}>
        <ListItemIcon>
          <LocalLibrary />
        </ListItemIcon>
        <ListItemText primary="Courses" />
        {courseOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapsibleList open={courseOpen} listItems={courses} />
      <ListItemButton onClick={() => setProjectOpen(!projectOpen)}>
        <ListItemIcon>
          <Workspaces />
        </ListItemIcon>
        <ListItemText primary="Projects" />
        {projectOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapsibleList open={projectOpen} listItems={projects} />
      <ListItemButton onClick={() => setTeamOpen(!teamOpen)}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Teams" />
        {teamOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapsibleList open={teamOpen} listItems={teams} />
    </List>
  );
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Additional Info</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Archieved Projects" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  </div>
);
