import React, { Component } from "react";
import { authStore } from "../../stores/authStore";
import { Form, Input, Button, Checkbox } from "antd";
import { openNotification } from "../openNotification/openNotification";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import "./LoginForm.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
    };
  }

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  };

  render() {
    const submitHandler = (values) => {
      const email = values.email;
      const password = values.password;
      const remember = values.remember;

      let requestBody = { email: email, password: password };

      async function createUser() {
        const response = await fetch(process.env.REACT_APP_API_URL, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if ((response.status !== 200) & (response.status !== 201)) {
          const error = await response.json();
          openNotification(error.errors[0].message, "", 3, "warning");
          const message = `An error has occured: ${response.status} - ${error.errors[0].message}`;
          throw new Error(message);
        }
        const login = await response.json();
        return login;
      }

      async function fetchLogin() {
        const response = await fetch(
          process.env.REACT_APP_AUTH_URL + "/login",
          {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if ((response.status !== 200) & (response.status !== 201)) {
          const error = await response.json();
          openNotification(error.error, "", 3, "warning");
          const message = `An error has occured: ${response.status} - ${error.error}`;
          throw new Error(message);
        }
        const login = await response.json();
        return login;
      }

      async function fetchUser(token) {
        const requestBody = {
          query: `
                query {
                  user {
                    name
                    email
                    dateCreated
                    avatar
                    active
                  }
                }
                  `,
        };
        const response = await fetch(process.env.REACT_APP_API_URL, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        if ((response.status !== 200) & (response.status !== 201)) {
          const error = await response.json();
          openNotification("Error " + response.status, error.error, 0, "error");
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const user = await response.json();
        return user;
      }

      // Register
      if (!this.state.isLogin) {
        const username = values.username;
        requestBody = {
          query: `
              mutation {
                  createUser(
                    userInput: { name: "${username}", email: "${email}", password: "${password}" }
                  ) {
                    name
                  }
                }
                `,
        };
        createUser()
          .then((resData) => {
            const newUser = resData.data.createUser.name;
            openNotification(
              "Account successully created.",
              "Kudos to you " +
                newUser +
                "! You can now log into your account.",
              5,
              "success"
            );
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        // login
        fetchLogin()
          .then((resData) => {
            authStore.login(resData.token, resData.refreshToken);
            if (remember === true) {
              // Store RefreshToken and ID, only if "remember" set to true.
              localStorage.setItem("refreshToken", resData.refreshToken);
              localStorage.setItem("userId", resData.userId);
            }
            openNotification("You have successully log in.", "", 3, "success");
            // Get user infos
            fetchUser(resData.token)
              .then((resData) => {
                const user = resData.data.user[0];
                localStorage.setItem("user", JSON.stringify(user));
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    };

    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={submitHandler}
      >
        <Form.Item
          name="username"
          hidden={this.state.isLogin}
          rules={[
            {
              required: !this.state.isLogin,
              message: "How should we call you?",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="input Password"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item hidden={!this.state.isLogin}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/#">
            Recover password
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {this.state.isLogin ? "Log in" : "Create account"}
          </Button>
          Or{" "}
          <span
            style={{ color: "#6C917D", cursor: "pointer" }}
            onClick={this.switchModeHandler}
          >
            {this.state.isLogin ? "register now!" : "log into your account!"}
          </span>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;
