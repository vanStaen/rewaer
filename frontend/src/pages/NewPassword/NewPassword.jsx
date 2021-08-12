import React, { useEffect, useState, useCallback } from "react";
import { Form, Input, Button, notification } from "antd";
import { LockOutlined, SyncOutlined } from "@ant-design/icons";

import { postTokenVerify } from "./postTokenVerify";
import { postChangePassword } from "./postChangePassword";

import "./NewPassword.css";

export const NewPassword = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const token = props.match.params.key;

  const submitHandler = async (value) => {
    setIsLoading(true);
    const password = value.password;
    try {
      const success = await postChangePassword(token, password);
      if (success === true) {
        notification.success({
          message:
            "Your password has been reset. You will be redirected to the login page.",
          placement: "topLeft",
        });
        setTimeout(() => {
          document.location.href = "/";
        }, 3000);
      } else {
        notification.warn({
          message: "Error! The password wasn't changed: Please try again.",
          placement: "topLeft",
        });
      }
    } catch (error) {
      notification.warn({
        message: error.message,
        placement: "topLeft",
      });
      console.log(error);
    }
    setIsLoading(false);
  };

  const verifyToken = useCallback(async () => {
    const tokenValid = await postTokenVerify(token);
    if (!tokenValid) {
      setIsValid(false);
      notification.error({
        message:
          "This link is not valid. Please restart the password recovery process.",
        placement: "topLeft",
        duration: 0,
      });
    }
  }, [token]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <div>
      <div className="newPassword__leftPanel"></div>
      <div className="newPassword__rightPanel">
        <div className="signup__full">
          <div className="signup__header">Set a new password</div>

          <Form
            name="form_signup"
            className="signup__form"
            initialValues={{
              remember: true,
            }}
            onFinish={submitHandler}
          >
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Choose a new password"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Confirm your new password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signup__formbutton"
                disabled={!isValid}
              >
                {isLoading ? (
                  <SyncOutlined spin />
                ) : isValid ? (
                  "Update password"
                ) : (
                  "Link not valid anymore."
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
