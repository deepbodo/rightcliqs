import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Auth, Hub } from "aws-amplify";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import LogoImage from "../Images/rightcli2logo.png";
import Home from "./Home";
const Container = styled.div`
  height: 100vh;
  display: flex;
`;
const Left = styled.div`
  width: 60%;
  padding: 3rem;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Left2 = styled.div`
  width: 60%;
  padding: 3rem;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
  text-align: center;
`;
const Logo = styled.img`
  width: 20%;
  margin-right: 4px;
`;
const Right = styled.div`
  width: 40%;
  background-color: #8cdacd;
`;
const P = styled.h1`
  font-weight: 50;
  font-size: 2rem;
  font-weight: 400;
  margin-left: 8px;
  letter-spacing: 1px;
`;
const Title = styled.h1`
  margin: -4px;
  font-weight: 600;
  font-size: 2.8rem;
  letter-spacing: 1px;
`;
const Div = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  text-align: center;
`;
const Input = styled.input`
  border-top-left-radius: 10px;
  height: 55px;
  margin: 14px;
  width: 280px;
  padding: 1rem;
  text-align: left;
  border-bottom-left-radius: 10px;
  font-size: 1.3rem;
  background-color: #e8e8e8;
  border: none;
`;
const Input2 = styled.input`
  border-top-right-radius: 10px;
  height: 55px;
  margin: 14px;
  width: 280px;
  padding: 1rem;
  font-size: 1.3rem;
  text-align: left;
  border-bottom-right-radius: 10px;
  background-color: #e8e8e8;
  border: none;
`;
const Input3 = styled.input`
  border-radius: 10px;
  height: 55px;
  margin: 14px;
  width: 594px;
  padding: 1rem;
  font-size: 1.3rem;
  text-align: left;
  background-color: #e8e8e8;
  border: none;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  color: #fff;
  width: 594px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 8px;
  background-color: #2a2a2a;
  padding-left: 8px;
  font-size: 1.4rem;
  margin: 20px;
  border: none;
  font-weight: 500;
  border-radius: 25px;
  &:hover {
    background-color: #2a2a2a;
    color: #fff;
  }
`;
const Log = styled.p`
  margin: -5px;
  font-weight: bold;
  color: #090167;
`;
const Button2 = styled.button`
  background-color: #fff;
  border: none;
  margin: -15px;
  color: #000;
  font-weight: bold;
  pointer: cursor;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const initialFormState = {
    username: "",
    email: "",
    password: "",
    authCode: "",
    formType: "signUp",
  };
  const [formState, updateFormState] = useState(initialFormState);
  const [user, updateUser] = useState(null);
  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      updateUser(user);
      console.log(user);
      updateFormState(() => ({ ...formState, formType: "confirmedUser" }));
    } catch (err) {
      console.log(err);
      updateFormState(() => ({ ...formState, formType: "signIn" }));
    }
  };
  const setAuthListener = async () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          console.log(data);

          updateFormState(() => ({
            ...formState,
            formType: "signIn",
          }));

          break;
        case "signIn":
          console.log(data);

          break;
      }
    });
  };
  useEffect(() => {
    checkUser();
    setAuthListener();
  }, []);
  function onChange(e) {
    e.persist();
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }
  const navigateToContacts = () => {
    navigate("/home");
  };
  const { formType } = formState;
  async function signUp() {
    const { username, email, password } = formState;
    await Auth.signUp({ username, email, password, attributes: { email } });
    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
  }
  async function confirmSignUp() {
    const { username, authCode } = formState;
    await Auth.confirmSignUp(username, authCode);
    updateFormState(() => ({ ...formState, formType: "signIn" }));
  }
  async function signIn() {
    const { username, password } = formState;
    await Auth.signIn(username, password);
    updateFormState(() => ({ ...formState, formType: "confirmedUser" }));
  }
  return (
    <>
      {formType === "signUp" && (
        <Container>
          <Left>
            {" "}
            <Title>Get Started</Title>
            <Header>
              <Logo src={LogoImage} />
            </Header>
            {/* <Div>
              {" "}
              <Input
                type="text"
                name="firstname"
                onChange={onChange}
                placeholder="First Name"
              />
              <Input2
                type="text"
                name="lastname"
                onChange={onChange}
                placeholder="Last Name"
              />
            </Div> */}
            <Input3
              type="email"
              name="email"
              onChange={onChange}
              placeholder="Email"
            />
            <Input3
              type="text"
              name="username"
              onChange={onChange}
              placeholder="Name"
            />
            <Input3
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
            <Input3
              type="confirmpassword"
              name="confirmpassword"
              onChange={onChange}
              placeholder="Confirm Password"
            />
            <Button onClick={signUp}>SignUP</Button>
            <p>Already have an account?</p>
            <Button2
              to="/signin"
              onClick={() =>
                updateFormState(() => ({ ...formState, formType: "signIn" }))
              }
            >
              LOG IN
            </Button2>
          </Left>
          <Right></Right>
        </Container>
      )}
      {formType === "signIn" && (
        <Container>
          <Left2>
            {" "}
            <Title>Log Into Your Account</Title>
            <Header>
              <Logo src={LogoImage} />
            </Header>
            <Input3
              type="text"
              name="username"
              onChange={onChange}
              placeholder="Email"
            />
            <Input3
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
            <Button onClick={signIn}>LOG IN</Button>
            <Bar>
              <NavLink4
                to="/"
                onClick={() =>
                  updateFormState(() => ({ ...formState, formType: "signUp" }))
                }
              >
                Don't have an account?
              </NavLink4>
              <NavLink3 to="/f g t p as s word/">Forgot Password</NavLink3>
            </Bar>
            {/* <Button2
              to="/"
              onClick={() =>
                updateFormState(() => ({ ...formState, formType: "signUp" }))
              }
            >
              SIGN UP{" "}
            </Button2> */}
          </Left2>

          <Right></Right>
        </Container>
      )}
      {formType === "confirmSignUp" && (
        <Container>
          <Left2>
            <P>Check email for confirmation code!</P>
            <Input3
              name="authCode"
              onChange={onChange}
              placeholder="Confirmation Code"
            />
            <Button onClick={confirmSignUp}>Confirm</Button>
          </Left2>
          <Right></Right>
        </Container>
      )}
      {formType === "confirmedUser" && <Home />}
    </>
    // <Container>
    //   <Left>
    //     <Header>
    //       <Logo src={LogoImage} />
    //       <P> for business</P>
    //     </Header>
    //     <Title>Get Started</Title>
    //     <Form>
    //       {/* <Div>
    //     <Input type="text" id="firstname" placeholder="First Name" />
    //     <Input2 type="text" id="lastname" placeholder="Last Name" />
    //   </Div> */}
    //       {/* <Input3 type="text" id="cname" placeholder="Company Name" /> */}
    //       {/* <Input3
    //     type="number"
    //     id="numemployee"
    //     placeholder="Number Of Employees"
    //   /> */}

    //       <Input3 type="password" id="password" placeholder="Password" />
    //       <Input3 type="number" id="phone" placeholder="00000000000" />
    //       <Button onClick={navigateToContacts}>CONTINUE</Button>
    //     </Form>
    //
    //   </Left>
    //   <Right></Right>
    // </Container>
  );
};

export default SignUp;

const NavLink3 = styled(Link)`
  text-decoration: none;
  color: #2a2a2a;
  pointer: cursor;
`;
const NavLink4 = styled.button`
  text-decoration: none;
  border: none;
  pointer: cursor;
  background-color: transparent;
`;
const Bar = styled.div`
  width: 594px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
