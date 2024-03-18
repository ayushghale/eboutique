import React from "react";

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    errors: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const validateForm = () => {
    const { name, email, password } = state;
    const errors = {
      name: name === "" ? "Name cannot be empty" : "",
      email: email === "" ? "Email cannot be empty" : "",
      password: password === "" ? "Password cannot be empty" : "",
    };
    setState({
      ...state,
      errors,
    });

    return !(errors.name || errors.email || errors.password);
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    if (validateForm()) {
      const { name, email, password } = state;
      alert(
        `You are signing up with name: ${name}, email: ${email}, and password: ${password}`
      );

      setState({
        name: "",
        email: "",
        password: "",
        errors: {
          name: "",
          email: "",
          password: "",
        },
      });
    }
  };

  const { name, email, password, errors } = state;

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1 className=" py-5">Create Account</h1>
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
        <span className="my-2 text-base">
          or use your email for registration
        </span>

        <div className=" w-full">
          <h2 className=" text-sm text-gray-500 inset-y-0 left-0 text-left">
            Name
          </h2>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="rounded-md focus:outline-none  h-[45px] "
            placeholder="Name"
            style={{
              border: errors.name ? "2px solid red" : " 2px solid transparent",
            }}
          />
          <h2 className=" text-sm text-gray-500 inset-y-0 left-0 text-left">
            Email
          </h2>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="rounded-md focus:outline-none  h-[45px] "
            placeholder="Email"
            style={{
              border: errors.name ? "2px solid red" : " 2px solid transparent",
            }}
          />

          <h2 className=" text-sm text-gray-500 inset-y-0 left-0 text-left">
            Password
          </h2>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="rounded-md focus:outline-none  h-[45px] "
            placeholder="Password"
            style={{
              border: errors.name ? "2px solid red" : " 2px solid transparent",
            }}
          />
        </div>

        <button className="mt-4">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
    