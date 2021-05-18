import React from "react";
import { observer } from "mobx-react";
import { authStore } from '../../stores/authStore';
import { userStore } from '../../stores/userStore';
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const ProfilPage = observer(() => {

  return (
    <div>
      <Title level={3}>Hello, {userStore.user ? userStore.user.name : 'there'}
      </Title>
      <Paragraph copyable>
        <b>User ID:</b> {userStore.userId}
      </Paragraph>
      { process.env.NODE_ENV === "development" && (
        <div>

          <Paragraph
            copyable={{
              text: authStore.token,
              tooltips: ["Copy token", "Token copied!"],
            }}
          >
            <b>Access Token : </b>{authStore.token}
          </Paragraph>
          <Paragraph
            copyable={{
              text: authStore.refreshToken,
              tooltips: ["Copy refresh token", "Refresh Token copied!"],
            }}
          >
            <b>Refresh Token : </b>{authStore.refreshToken}
          </Paragraph>
        </div>
      )}

    </div>
  );
});

export default ProfilPage;
