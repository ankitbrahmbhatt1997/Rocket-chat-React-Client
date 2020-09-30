import React, { Fragment, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { containerContext } from "components/Chat/ChatContainer";

import VideoConferencing from "./VideoConferencing";

export default function VideoConferencingContainer() {
  const dispatch = useDispatch();

  const activeGroup = useSelector((state) => state.groups.activeGroup);

  const { setShowVC } = useContext(containerContext);

  const user = useSelector((state) => state.auth.user, shallowEqual);

  let childProps = {
    user,
    roomName: activeGroup,
    setShowVC: setShowVC,
  };
  return <VideoConferencing {...childProps} />;
}
