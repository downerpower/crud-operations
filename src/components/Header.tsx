import { Link as RouterLink } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogOut } from "../store/slices/loginSlice";

interface Props {
  isLogin: boolean;
}

function Header({ isLogin }: Props) {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(setLogOut());
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ background: "#272727", padding: "0.5rem 1rem" }}
      >
        <Toolbar>
          <Link
            component={RouterLink}
            to={"/"}
            variant="body1"
            sx={{ textDecoration: "none", color: "white" }}
          >
            <Typography variant="h4">TEST TASK</Typography>
          </Link>
          {isLogin ? (
            <Button
              sx={{
                marginLeft: "auto",
                padding: "0.5rem, 1rem",
                fontSize: "1.2rem",
                backgroundColor: "#474747",
                "&:hover": {
                  color: "black",
                },
              }}
              color="inherit"
              variant="contained"
              onClick={handleLogoutClick}
            >
              Log out
            </Button>
          ) : (
            <Button
              component={RouterLink}
              to="/logIn"
              sx={{
                marginLeft: "auto",
                padding: "0.5rem, 1rem",
                fontSize: "1.2rem",
                backgroundColor: "#474747",
                "&:hover": {
                  color: "black",
                },
              }}
              color="inherit"
              variant="contained"
            >
              Log in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
