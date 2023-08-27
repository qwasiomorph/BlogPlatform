import { Modal } from "antd";

import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;

const showConfirm = (confirmAction) => {
  confirm({
    title: "Are you sure to delete this article?",
    icon: <ExclamationCircleFilled />,
    onOk() {
      confirmAction();
    },
  });
};

export default showConfirm;
