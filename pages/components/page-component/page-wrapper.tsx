import  Box  from "@mui/material/Box";
import { useSession } from "next-auth/client";
import { ReactNode, useState } from "react";
import { PageWrapper } from "./commons";
import Footer from "./footer";
import { Intro } from "./home";
import { Nav } from "./navbar";
import Head from "next/head";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainListItems, secondaryListItems } from "./listitems";

interface PageProps {
  children: () => ReactNode;
  title?: string;
}
const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    overflow: "auto",
    height: "100%",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const mdTheme = createTheme({
  palette: {
    background: {
      default: "#b5b5b5",
    },
  },
});

export const WrapperPage = ({ children, title }: PageProps): JSX.Element => {
  const [session, loading] = useSession();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box className="page" sx={{ display: "flex" }}>
          <CssBaseline />
          <PageWrapper>
            <AppBar position="fixed" sx={{ backgroundColor: "dimgrey" }}>
              <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                  name="viewport"
                  content="initial-scale=1.0, width=device-width"
                />
              </Head>
              <Toolbar
                sx={{
                  pr: "24px", // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Nav />
                <IconButton color="inherit" sx={{ float: "right" }}>
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>

            <Drawer
              anchor="left"
              variant="temporary"
              open={open}
              onClose={toggleDrawer}
              onBackdropClick={toggleDrawer}
            >
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider />
              <MainListItems />
              <Divider />
              <List>{secondaryListItems}</List>
            </Drawer>
            <div style={{ marginTop: "100px" }}>
              {!session && !loading && <Intro />}
              {session && !loading && <div>{children()}</div>}
            </div>
            <Footer />
          </PageWrapper>
        </Box>
      </ThemeProvider>
    </>
  );
};
