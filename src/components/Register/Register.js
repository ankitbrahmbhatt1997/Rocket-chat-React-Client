import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "slices/authSlice";
import { useDispatch } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.webnyay.in/">
        Webnyay.in
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("username is required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  pass: Yup.string()
    .min(6, "Password Too Short!")
    .max(20, "Password Too Long!")
    .required("Password Required"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "white",
    padding: "1rem 2rem",
    borderRadius: "1rem",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      let { email, pass, username, name } = values;
      await dispatch(registerUser({ email, pass, username, name }));
      history.push("/login");
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            value={formik.name}
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <Alert severity="error">{formik.errors.name}</Alert>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            value={formik.username}
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.touched.username && (
            <Alert severity="error">{formik.errors.username}</Alert>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            value={formik.email}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <Alert severity="error">{formik.errors.email}</Alert>
          )}
          {/* {hasErrors && apiErrors.email && (
            <Alert severity="error">{apiErrors.email[0]}</Alert>
          )} */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pass"
            label="pass"
            type="password"
            id="pass"
            value={formik.pass}
            autoComplete="current-pass"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {/* {hasErrors && apiErrors.pass && (
            <Alert severity="error">{apiErrors.pass[0]}</Alert>
          )} */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {/* {hasErrors && apiErrors.non_field_errors && (
            <Alert severity="error">{apiErrors.non_field_errors[0]}</Alert>
          )} */}
          <Grid container>
            <Grid item xs>
              <Link>Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/">{"Already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
