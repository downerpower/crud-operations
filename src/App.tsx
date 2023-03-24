import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { CssBaseline, Container } from "@mui/material";
import AuthForm from "./components/AuthForm";
import Main from "./components/Main";
import { useAppSelector } from "./store/hooks";

function App() {
  const isLogin = useAppSelector((state) => state.login.isLogin);

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{ background: "#0A0A0A", height: "100vh", overflow: "hidden" }}
        disableGutters
      >
        <Header isLogin={isLogin} />
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to={isLogin ? "/main" : "/logIn"} />}
          />
          <Route
            path="/main"
            element={
              isLogin ? (
                <Main isLogin={isLogin} />
              ) : (
                <Navigate replace to="/logIn" />
              )
            }
          />
          <Route
            path="/logIn"
            element={
              !isLogin ? (
                <AuthForm />
              ) : (
                <Navigate replace to="/main" />
              )
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
