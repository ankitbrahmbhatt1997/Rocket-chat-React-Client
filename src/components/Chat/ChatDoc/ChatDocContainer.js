import React from "react";
import ChatDoc from "./ChatDoc";

export default function ChatDocContainer(props) {
  const [fileModalOpen, setFileModalOpen] = React.useState(false);

  const handleFileModalOpen = () => {
    setFileModalOpen(true);
  };

  const handleFileModalClose = () => {
    setFileModalOpen(false);
  };

  const childProps = {
    ...props,
    handleFileModalOpen,
    fileModalOpen,
    handleFileModalClose,
  };

  return <ChatDoc {...childProps} />;
}
