import React from "react";

export const AlreadyMember = (props) => {
  return (
    <div style={{ paddingTop: "15px" }}>
      {props.showLogin ? (
        <>
          New here?{" "}
          <span className="link" onClick={() => props.setShowLogin(!props.showLogin)}>
            Sign up
          </span>
        </>
      ) : (
          <>
            Already a member?{" "}
            <span className="link" onClick={() => props.setShowLogin(!props.showLogin)}>
              Login
          </span>
          </>
        )}
    </div>
  );
};
