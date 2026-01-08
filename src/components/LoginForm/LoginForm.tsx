import React, { useState, useRef } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  SyncOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { PasswordRecover } from "../PasswordRecover/PasswordRecover";
import { authStore } from "@stores/authStore/authStore.js";
import { postVerifyEmailLink } from "./postVerifyEmailLink";
import { validateEmail } from "@helpers/validateEmail";

import "./LoginForm.less";

interface LoginFormValues {
  emailOrUsername: string;
  password: string;
  remember?: boolean;
}

export const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecovery, setIsRecovery] = useState<boolean>(false);
  const isEmail = useRef<string | undefined>(undefined);
  const { t } = useTranslation();

  const submitHandler = async (values: LoginFormValues) => {
    setIsLoading(true);
    const emailOrUsername = values.emailOrUsername;
    const isValidEmail = validateEmail(emailOrUsername);
    if (isValidEmail) {
      isEmail.current = values.emailOrUsername.toLowerCase();
    }
    const password = values.password;
    const remember = values.remember;
    try {
      let error: string | null = null;
      if (isValidEmail) {
        error = await authStore.login(
          emailOrUsername,
          null,
          password,
          remember,
        );
      } else {
        error = await authStore.login(
          null,
          emailOrUsername,
          password,
          remember,
        );
      }
      if (error) {
        if (error === "Error: Email is not verified!") {
          const errorMessage = (
            <>
              <strong>{t("login.emailNotVerifyYet")}!</strong>{" "}
              {t("login.checkPostBoxForVerificationLink")}.
              <div
                className="login__verifyEmailLink"
                onClick={() => {
                  postVerifyEmailLink(isEmail.current);
                  notification.success({
                    duration: 0,
                    message: t("login.checkPostBoxForVerificationLink"),
                    placement: "topLeft",
                  });
                }}
              >
                <LinkOutlined /> {t("login.clickToGetNewVerificationLink")}
                <span className="link"> {t("login.verifyYourEmail")}</span>.
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
              <strong>{t("login.passwordIsIncorrect")}!</strong> <br />
              {t("login.pleaseCheckPasswordOrUse")}
              <span className="link" onClick={() => setIsRecovery(!isRecovery)}>
                {" "}
                {t("login.recoverPassword")}{" "}
              </span>{" "}
              {t("login.feature")}.
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
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setIsLoading(false);
  };

  return isRecovery ? (
    <PasswordRecover setIsRecovery={setIsRecovery} email={isEmail.current} />
  ) : (
    <div className="login__full">
      <div className="login__header">
        {t("login.loginto")} <b>rewaer</b>
        .com {t("login.logintoAfter")}
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
          name="emailOrUsername"
          rules={[
            {
              required: true,
              message: t("login.pleaseInputEmailOrUsername"),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t("login.emailOrUsername")}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t("login.pleaseInputPassword"),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t("login.password")}
          />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ display: "inline-block", width: "calc(50%)" }}
          // @ts-expect-error - defaultChecked is not in the type definition but is valid
          defaultChecked={false}
          className="login__checkBoxRemember"
        >
          <Checkbox className="login__remember">
            {t("login.rememberMe")}
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="passwordRecover"
          className="login__passwordRecover"
          style={{
            display: "inline-block",
            width: "calc(50%)",
            textAlign: "right",
          }}
        >
          <span className="link" onClick={() => setIsRecovery(!isRecovery)}>
            {t("login.recoverPassword").replace(/^\w/, (c: string) =>
              c.toUpperCase(),
            )}
          </span>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login__formbutton"
          >
            {isLoading ? <SyncOutlined spin /> : t("login.logMeIn")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
