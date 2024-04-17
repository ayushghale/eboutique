
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function SignInForm() {
  const navigate = useNavigate();
  const[serverErrors, setServerErrors] = React.useState("")

  const [state, setState] = React.useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const validateForm = () => {
    const { email, password } = state;
    const errors = {
      email: email === "" ? "Email cannot be empty" : "",
      password: password === "" ? "Password cannot be empty" : "",
    };
    setState({
      ...state,
      errors,
    });

    return !(errors.email || errors.password);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const { email, password } = state;

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      console.log("Form submitted: ", email, password);

      try {
        // Send a POST request to the API using the FormData object
        const response = await api.register("login", formData);
        // Check if the request was successful (status code 2xx)
        if (response) {
          // If successful, redirect the user to the dashboard page
          console.log("response", response);
          localStorage.setItem("x", response.data.accessToken);
          sessionStorage.setItem("accessToken", response.data.accessToken);
          sessionStorage.setItem("refreshToken", response.data.refreshToken);
          sessionStorage.setItem("userData", JSON.stringify(response.data.userData));
          navigate("/");
        } else {
          console.log("response", response.data.message);
        }
      } catch (error) {
        setServerErrors(error.response.data.message);
      }

    }
  };

  const clearForm = () => {
    setState({
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    });
  };
  const { errors, otherError } = state;

  

  return (
    <div className="form-container sign-in-container bg-slate-400 text-center">
      <form onSubmit={handleOnSubmit}>
        <h1 className="my-6 text-2xl">Sign in</h1>
        <div className="social-container">
          <a href="##" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="##" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="##" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>

        <span className="my-2 text-base ">or use your account</span>

        <span className="text-red-600 "> {otherError}</span>
        <h2 className=" text-sm text-gray-500 inset-y-0 left-0 text-left">
          Email
        </h2>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className=" focus:outline-none rounded-md"
          value={state.email}
          onChange={handleChange}
          style={{
            border: errors.email ? "2px solid red" : " 2px solid transparent",
          }}
        />
        <h2 className=" text-sm text-gray-500 inset-y-0 left-0 text-left">
          Password
        </h2>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          className=" focus:outline-none rounded-md"
          onChange={handleChange}
          style={{
            border: errors.password
              ? "2px solid red"
              : " 2px solid transparent",
          }}
        />

        <button className="mt-5">Sign In</button>
        <a href="/EmailVerification" className=" hover:text-red-600">
          Forgot your password?
        </a>
      </form>
    </div>
  );
}

export default SignInForm;
