import React, { useEffect, useState, useCallback, useRef } from "react";
import { Form, Input, Button, notification } from "antd";
import { useParams } from "react-router-dom";
import { LockOutlined, SyncOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { postTokenVerify } from "./postTokenVerify";
import { postChangePassword } from "./postChangePassword";

import "./NewPassword.less";

interface FormValues {
  password: string;
  confirm: string;
}

interface RouteParams {
  key: string;
}

// TODO : test this component

export const NewPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const { t } = useTranslation();
  const params = useParams();
  const isMountedRef = useRef<boolean>(true);

  const token = params.key;

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const submitHandler = async (value: FormValues): Promise<void> => {
    if (!isMountedRef.current) return;

    setIsLoading(true);
    const password = value.password;
    try {
      const success = await postChangePassword(token, password);
      if (!isMountedRef.current) return;

      if (success === true) {
        notification.success({
          message: t("login.passwordReseted"),
          placement: "topLeft",
        });
        setTimeout(() => {
          if (isMountedRef.current) {
            document.location.href = "/";
          }
        }, 3000);
      } else {
        notification.warning({
          message: t("login.passwordNotChanged"),
          placement: "topLeft",
        });
      }
    } catch (error: any) {
      if (!isMountedRef.current) return;

      notification.warning({
        message: error.message,
        placement: "topLeft",
      });
      console.log(error);
    }

    if (isMountedRef.current) {
      setIsLoading(false);
    }
  };

  const verifyToken = useCallback(async (): Promise<void> => {
    if (!isMountedRef.current) return;

    const tokenValid = await postTokenVerify(token);
    if (!isMountedRef.current) return;

    if (!tokenValid) {
      setIsValid(false);
      notification.error({
        message: t("login.linkNotValid"),
        placement: "topLeft",
        duration: 0,
      });
    }
  }, [token, t]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <div>
      <div className="newPassword__leftPanel"></div>
      <div className="newPassword__rightPanel">
        <div className="signup__full">
          <div className="signup__header">{t("login.setNewPassword")}</div>

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
                  message: t("login.pleaseInputNewPassword"),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={t("login.chooseNewPassword")}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t("login.pleaseInputNewPassword"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("login.passwordDoNotMatch")),
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={t("login.pleaseConfirmNewPassword")}
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
                  <SyncOutlined spin data-testid="loading-icon" />
                ) : isValid ? (
                  t("login.updatePassword")
                ) : (
                  t("login.linkNotValidAnymore")
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
