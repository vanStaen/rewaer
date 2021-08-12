import React, { useState, useRef } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import {
  MailOutlined,
  LockOutlined,
  SyncOutlined,
  LinkOutlined,
} from "@ant-design/icons";

import { AlreadyMember } from "../SignUpForm/AlreadyMember";
import { PasswordRecover } from "../PasswordRecover/PasswordRecover";
import { authStore } from "../../stores/authStore/authStore";
import { postVerifyEmailLink } from "./postVerifyEmailLink";

import "./LoginForm.css";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const isEmail = useRef(undefined);

  const submitHandler = async (values) => {
    setIsLoading(true);
    const email = values.email;
    isEmail.current = email;
    const password = values.password;
    const remember = values.remember;
    try {
      const error = await authStore.login(email, null, password, remember);
      if (error) {
        if (error === "Error: Email is not verified!") {
          const errorMessage = (
            <>
              <b>Your email is not verified yet!</b> Please check your email
              postbox for the verification link.
              <div
                className="login__verifyEmailLink"
                onClick={() => {
                  postVerifyEmailLink(isEmail.current);
                }}
              >
                <LinkOutlined /> Click here to have us send you a brand new link
                to <span className="link"> verify your email</span>.
              </div>
            </>
          );
          notification.error({
            duration: 0,
            message: errorMessage,
            placement: "topLeft",
          });
        } else if (error === "Error: Password is incorrect!") {
          const errorMessage = (
            <>
              <b>Password is incorrect!</b> <br />
              Please check your password or use the
              <span className="link" onClick={() => setIsRecovery(!isRecovery)}>
                {" "}
                recover password{" "}
              </span>{" "}
              feature.
            </>
          );
          notification.error({
            message: errorMessage,
            placement: "topLeft",
          });
        } else {
          notification.error({
            message: error,
            placement: "topLeft",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return isRecovery ? (
    <PasswordRecover setIsRecovery={setIsRecovery} email={isEmail.current} />
  ) : (
    <div className="login__full">
      <div className="login__header">
        Log into <b>Merrier</b>
        .app
      </div>

      <Form
        name="form_login"
        className="login__form"
        initialValues={{
          email: isEmail.current,
        }}
        onFinish={submitHandler}
      >
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
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ display: "inline-block", width: "calc(50%)" }}
          defaultChecked={false}
        >
          <Checkbox className="login__remember">Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          name="passwordRecover"
          style={{
            display: "inline-block",
            width: "calc(50%)",
            textAlign: "right",
          }}
        >
          <span className="link" onClick={() => setIsRecovery(!isRecovery)}>
            Recover password
          </span>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login__formbutton"
          >
            {isLoading ? <SyncOutlined spin /> : "Log me in"}
          </Button>
          <div className="login__showAlreadyMember">
            <AlreadyMember />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
