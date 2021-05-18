import { notification } from "antd";

export const openNotification = (msg, desc, showtime, type) => {
    notification.open({
        message: msg,
        description: desc,
        duration: showtime,
        type: type,
        placement: "bottomRight",
    });
};