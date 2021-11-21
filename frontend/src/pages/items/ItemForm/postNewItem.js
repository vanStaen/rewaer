import axios from "axios";
import { notification } from "antd";

export async function postNewItem(
  mediaUrl,
  mediaUrlThumb,
  mediaUrlMedium,
  title
) {
  const requestBody = {
    query: `
        mutation ($mediaUrl: String, $mediaUrlThumb: String, $mediaUrlMedium: String, $title: String) {
          addItem(
            itemInput: { mediaUrl: $mediaUrl, 
                         mediaUrlThumb: $mediaUrlThumb,
                         mediaUrlMedium: $mediaUrlMedium,
                         title: $title }
            ) {
              _id
            }
          }
          `,
          variables: {
            mediaUrl: mediaUrl,
            mediaUrlThumb: mediaUrlThumb,
            mediaUrlMedium: mediaUrlMedium,
            title: title,
          },
  };
  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });
  if ((response.status !== 200) & (response.status !== 201)) {
    notification.error({
      message: `Unauthenticated!`,
      placement: "bottomRight",
    });
    throw new Error("Unauthenticated!");
  }
  const newLook = await response.data;
  return newLook;
}
