import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import { postEmailExist } from "./postEmailExist";
import { postSendRecoverLink } from "./postSendRecoverLink";

import "./PasswordRecover.css";

export const PasswordRecover = (props) => {
  const [emailDoNotExist, setEmailDoNotExist] = useState(undefined);

  const changeEmailHandler = async (e) => {
    setEmailDoNotExist(undefined);
  };

  const submitHandler = async (values) => {
    const email = values.email;
    const emailExist = await postEmailExist(email);
    if (emailExist === false) {
      setEmailDoNotExist("error");
    } else {
      setEmailDoNotExist("success");
      try {
        await postSendRecoverLink(email);
        notification.success({
          message: "We sent you an email with a link to recover your password!",
          placement: "topLeft",
        });
        props.setIsRecovery(false);
      } catch (error) {
        notification.warn({
          message: error.message,
          placement: "topLeft",
        });
      }
    }
  };

  return (
    <div className="recover__full">
      <div className="recover__header">Recover your password</div>

      <Form
        name="form_recover"
        className="recover__form"
        initialValues={{
          email: props.email,
        }}
        onFinish={submitHandler}
      >
        <Form.Item
          name="email"
          onChange={changeEmailHandler}
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="recover__formbutton"
            disabled={emailDoNotExist === "error" ? true : false}
          >
            {emailDoNotExist === "error"
              ? "This email doesn't exist in our database!"
              : "Send password reset email"}
          </Button>

          <div
            className="recover__iRemember"
            onClick={() => {
              props.setIsRecovery(false);
            }}
          >
            <ArrowLeftOutlined />{" "}
            <span className="link">It's okay, I remember now</span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
