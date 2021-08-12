import React, { useEffect, useState, useCallback } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import { postEmailVerified } from "./postEmailVerified";

import "./EmailVerified.css";

export const EmailVerified = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const emailIsVerified = useCallback(async () => {
    const success = await postEmailVerified(props.match.params.verifyCode);
    if (success) {
      setIsVerified(true);
      setTimeout(() => {
        document.location.href = "/";
      }, 10000);
    }
    setIsLoading(false);
  }, [props.match.params.verifyCode]);

  useEffect(() => {
    emailIsVerified();
  }, [emailIsVerified]);

  return (
    <div>
      <div className="emailVerified__leftPanel"></div>
      <div className="emailVerified__rightPanel">
        <div className="emailVerified__container">
          {isLoading ? (
            <LoadingOutlined className="emailVerified__loader" />
          ) : isVerified ? (
            <>
              <b>Your email have been verified</b> <br />
              Thank you and welcome in our community! <br />
              You can now go ahead and log yourself in. <br />
              <br />
              <div className="emailVerified__link">
                You will be redirected to the{" "}
                <span
                  className="link"
                  onClick={() => {
                    document.location.href = "/";
                  }}
                >
                  {" "}
                  login page
                </span>
                .
              </div>
            </>
          ) : (
            <>
              <strong>Your email could not be verified!</strong>
              <br />
              Something went wrong in the verification of the email linked to
              your account.
              <br />
              <div className="emailVerified__link">
                What can you do? Go back to the
                <span
                  className="link"
                  onClick={() => {
                    document.location.href = "/";
                  }}
                >
                  {" "}
                  login page
                </span>
                , sign in, and follow the infos on how to request a new
                verification link.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
