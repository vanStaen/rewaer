import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification, Tooltip } from "antd";
import {
  SmileOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import { postUsernameTaken } from "./postUsernameTaken";
import { postAddUser } from "./postAddUser";
import { AlreadyMember } from "./AlreadyMember";

import "./SignUpForm.css";

export const SignUpForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(undefined); // validateStatus: validate status of form components which could be 'success', 'warning', 'error', 'validating'.
  const [errorMsgUsername, setErrorMsgUsername] = useState(undefined); // validateStatus: validate status of form components which could be 'success', 'warning', 'error', 'validating'.

  const changeUserNameHandler = async (e) => {
    const username = e.target.value;
    if (username === "") {
      setIsValidUsername("error");
      setErrorMsgUsername(null);
    } else {
      setIsValidUsername("validating");
      setErrorMsgUsername(null);
      const isUsernameTaken = await postUsernameTaken(username);
      if (isUsernameTaken === true) {
        setIsValidUsername("error");
        setErrorMsgUsername("This username is already taken!");
      } else if (isUsernameTaken === false) {
        if (username.includes(" ")) {
          setIsValidUsername("error");
          setErrorMsgUsername("You can't have spaces in your username.");
        } else {
          setIsValidUsername("success");
          setErrorMsgUsername(null);
        }
      }
    }
  };

  const submitHandler = async (values) => {
    setIsLoading(true);
    const firstname = values.firstname;
    const lastname = values.lastname;
    const username = values.username;
    const email = values.email;
    const password = values.password;
    try {
      const response = await postAddUser(
        firstname,
        lastname,
        username,
        email,
        password
      );
      if (!response.errors) {
        notification.success({
          message:
            "We still need you to confirm your email: Please check your email box, there you be an email from us.",
          placement: "topLeft",
          duration: 0,
        });
        props.setShowLogin(true);
      } else {
        notification.error({
          message: response.errors[0].message,
          placement: "topLeft",
        });
      }
    } catch (error) {
      notification.error({
        message: error.message,
        placement: "topLeft",
      });
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="signup__full">
      <div className="signup__header">
        Sign up to <b>rewær</b>
        .com
      </div>

      <Form
        name="form_signup"
        className="signup__form"
        onFinish={submitHandler}
      >
        <Form.Item
          name="firstname"
          style={{ display: "inline-block", width: "calc(50% - 12px)" }}
          rules={[
            {
              required: true,
              message: "First name missing",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First name"
          />
        </Form.Item>
        <span
          style={{
            display: "inline-block",
            width: "24px",
            lineHeight: "32px",
            textAlign: "center",
          }}
        ></span>
        <Form.Item
          name="lastname"
          style={{ display: "inline-block", width: "calc(50% - 12px)" }}
          rules={[
            {
              required: true,
              message: "Last name missing",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last name"
          />
        </Form.Item>

        <Tooltip
          trigger={["hover"]}
          title={
            errorMsgUsername
              ? errorMsgUsername === "This username is already taken!"
                ? "Already taken!"
                : "Do not use spaces"
              : null
          }
          placement="left"
        >
          <Form.Item
            name="username"
            validateStatus={isValidUsername}
            onChange={changeUserNameHandler}
            hasFeedback
            rules={[
              {
                required: false,
                message: "How should we call you?",
              },
              {
                validator(_, value) {
                  if (value && isValidUsername === "error") {
                    return Promise.reject(new Error(errorMsgUsername));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              prefix={<SmileOutlined className="site-form-item-icon" />}
              placeholder="Username (optional)"
            />
          </Form.Item>
        </Tooltip>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email",
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
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Choose a password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm your password"
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Please accept our terms & policies!",
            },
          ]}
        >
          <Checkbox className="signup__terms">
            Creating an account means you’re okay with our{" "}
            <a href="/service">Terms of Service</a>,{" "}
            <a href="/privacy">Privacy Policy</a>, and our default{" "}
            <a href="/settings">Notification Settings</a>.
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signup__formbutton"
          >
            {isLoading ? <SyncOutlined spin /> : "Create account"}
          </Button>
          <div className="signup__showAlreadyMember">
            <AlreadyMember />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
