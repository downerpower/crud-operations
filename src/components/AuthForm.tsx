import Spinner from "react-spinner";
import { Formik, Form, Field } from "formik";
import ErrorIcon from "@mui/icons-material/Error";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLoading } from "../store/slices/loginSlice";
import { ERRORS } from "../shared/constants";

interface FormValues {
  username: string;
  password: string;
}

const AuthForm = () => {
  const initialValues: FormValues = { username: "", password: "" };

  const errorMessage = useAppSelector((state) => state.login.errorCode);

  const isLoading = useAppSelector((state) => state.login.isLoading);

  const dispatch = useAppDispatch();

  const validateUsername = (value: string) => {
    let error;
    if (!value) {
      error = "поле обязательно!";
    } else if (!/[a-z]+([1-9]|[12][0-9]|3[0-3])$/i.test(value)) {
      error = "неверный юзернейм";
    }
    return error;
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = "поле обязательно!";
    } else if (value.length < 5) {
      error = "пароль слишком короткий!";
    } else if (!/[a-zA-Z]$/i.test(value)) {
      error = "только латинские буквы!";
    }
    return error;
  };

  return (
    <div>
      {isLoading && <Spinner />}
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          dispatch(setLoading(values));
        }}
      >
        {({ errors, touched }) => (
          <Form className="form__container">
            <p className="form__text">LOG IN</p>
            {errorMessage !== 0 && (
              <div className="error-message">
                <ErrorIcon />{" "}
                {errorMessage === 2004 ? ERRORS[2004] : ERRORS[404]}
              </div>
            )}
            <Field
              id="username"
              name="username"
              placeholder="username"
              autoComplete="off"
              className={`form__input ${
                errors.username && touched.username ? "error" : ""
              }`}
              validate={validateUsername}
            />
            {errors.username && touched.username && (
              <small className="error error-text">{errors.username}</small>
            )}
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="password"
              autoComplete="off"
              className={`form__input ${
                errors.password && touched.password ? "error" : ""
              }`}
              validate={validatePassword}
            />
            {errors.password && touched.password && (
              <small className="error error-text">{errors.password}</small>
            )}
            <button className="form__button" type="submit">
              войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
