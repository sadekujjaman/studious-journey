import { signIn, signOut, useSession } from "next-auth/client";
import styled from "styled-components";
import { Avatar, Logo } from "./commons";
import Link from "next/link";
const Navbar = styled.div`
  width: 100%;
  .navbar {
    display: flex;
    align-items: center;

    background: #b5b5b5;
    color: white;
    font-family: Helvetica;
    font-weight: 300;
    min-height: 80px;
  }

  .navbar__title {
    margin-right: auto;
    font-size: 150%;
    padding: 12px 16px;
  }

  .navbar__item {
    padding: 8px 16px;
    cursor: pointer;
    vertical-align: middle;
  }
  .navbar__link {
    cursor: pointer;
    color: #2d1d0d;
    font-size: 18px;
    font-family: cursive;
    border: none;
    background: none;
    &:hover {
      color: #eedece;
      transition: 200ms ease-in;
    }
  }
  .admin-profile {
    display: flex;
  }

  .navbar__profile {
    display: grid;
    text-align: center;
  }
  .rounded__image {
    border-radius: 50% !important;
  }
`;

export const Nav = () => {
  const [session, loading] = useSession();
  console.log(process.env.NEXTAUTH_URL);
  return (
    <Navbar>
      <div className="navbar">
        <div className="navbar__title navbar__item">
          <Link
            href={{
              pathname: "/",
              query: {},
            }}
            passHref
          >
            <button className="navbar__link" style={{ fontSize: "22px" }}>
              Project Distribution
            </button>
          </Link>
        </div>
        {!session && !loading && (
          <div className="navbar__item">
            <button
              className="navbar__link"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/",
                })
              }
            >
              Login
            </button>
          </div>
        )}
        {session && !loading && (
          <div className="navbar__item">
            <button className="navbar__link" onClick={() => signOut()}>
              Logout
            </button>
          </div>
        )}
        {session && !loading && (
          <div className="navbar__item">
            <Link
              href={{
                pathname: "/projects",
                query: {},
              }}
              passHref
            >
              <div className="navbar__link">Projects</div>
            </Link>
          </div>
        )}

        <div className="navbar__item">
          <a className="navbar__link">Contact Us</a>
        </div>
        <div className="navbar__item">
          <a className="navbar__link">Help</a>
        </div>
        {session && !loading && (
          <div className="navbar__item admin-profile">
            <div
              style={{
                marginRight: "10px",
              }}
            >
              <Link
                href={{
                  pathname: "dashboard",
                  query: {},
                }}
                passHref
              >
                <div className="navbar__link navbar__profile">
                  <Avatar>
                    <Logo src={session.user.image} alt={"Avatar"}></Logo>
                    {/* <Image className="rounded__image" src={session.user.image}alt={"Avatar"} width="30px" height="30px" /> */}
                  </Avatar>
                  <div>{session.user.name}</div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Navbar>
  );
};
