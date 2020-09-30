import React, { useState, useEffect } from "react";
import { CircularProgress, Box } from "@material-ui/core";
import { vchost } from "config/axios";
import { useHistory } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

const VideoConferencing = ({ roomName, user, setShowVC }) => {
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState(null);
  const history = useHistory();

  const containerStyle = {
    width: "55rem",
    height: "100vh",
  };

  const jitsiContainerStyle = {
    display: loading ? "none" : "block",
    width: "100%",
    height: "100%",
  };

  function startConference() {
    try {
      const domain = vchost;
      const options = {
        roomName: roomName,
        height: "100%",
        parentNode: document.getElementById("jitsi-container"),
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_POWERED_BY: false,
          DISPLAY_WELCOME_PAGE_CONTENT: false,
          APP_NAME: "Webnyay VC",
          NATIVE_APP_NAME: "Webnyay VC",
          PROVIDER_NAME: "Webnyay",
          INVITATION_POWERED_BY: false,
          AUTHENTICATION_ENABLE: false,
          LIVE_STREAMING_HELP_LINK: "https://www.webnyay.in",
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "closedcaptions",
            "desktop",
            "fullscreen",
            "fodeviceselection",
            "hangup",
            "profile",
            "chat",
            "recording",
            "settings",
            "raisehand",
            "videoquality",
            "filmstrip",
            "invite",
            "feedback",
            "stats",
            "shortcuts",
            "tileview",
            "videobackgroundblur",
            "download",
            "help",
            "mute-everyone",
            "e2ee",
            "security",
          ],
          MOBILE_APP_PROMO: false,
          SUPPORT_URL: "https://www.webnyay.in/",
          VIDEO_QUALITY_LABEL_DISABLED: true,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        },
        configOverwrite: {
          disableSimulcast: false,
          enableWelcomePage: false,
          p2p: { enabled: false },
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      setApi(api);

      api.addEventListener("videoConferenceJoined", () => {
        console.log(`Local ${user.name} Joined`);
        setLoading(false);
        api.executeCommand("displayName", user.name);
      });

      api.addEventListener("readyToClose", () => {
        setLoading(true);
      });

      api.addEventListener("videoConferenceLeft", () => {
        setLoading(true);
        api.dispose();
        setShowVC(false);
        setApi(null);
      });
    } catch (error) {
      console.error("Failed to load Jitsi API", error);
    }
  }

  useEffect(() => {
    // verify the JitsiMeetExternalAPI constructor is added to the global..
    if (!isEmpty(api)) api.executeCommand("hangup");
    else {
      if (window.JitsiMeetExternalAPI) startConference();
      else alert("Jitsi Meet API script not loaded");
    }
  }, [roomName]);

  return (
    <Box display="flex" justifyContent="center">
      <div style={containerStyle}>
        {loading && (
          <Box display="flex" justifyContent="center" pt="3rem">
            <CircularProgress />
          </Box>
        )}
        <div id="jitsi-container" style={jitsiContainerStyle} />
      </div>
    </Box>
  );
};
export default VideoConferencing;
