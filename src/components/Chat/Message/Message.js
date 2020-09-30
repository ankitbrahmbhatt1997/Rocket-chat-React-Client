import React from "react";
import SentMessage from "components/Chat/SentMessage";
import RecievedMessage from "components/Chat/RecievedMessage";
import DocTemplate from "components/Chat/DocTemplate";
import { useSelector } from "react-redux";

export default function Message({
  message: {
    msg: content,
    u: { username: from },
    file,
    attachments,
    ts,
  },
  domId,
}) {
  const username = useSelector((state) => state.auth.user.username);

  return (
    <React.Fragment>
      {username === from ? (
        file ? (
          <DocTemplate file={attachments[0]} domId={domId} />
        ) : (
          <SentMessage content={content} domId={domId} />
        )
      ) : file ? (
        <DocTemplate
          file={attachments[0]}
          position="flex-start"
          from={from}
          domId={domId}
        />
      ) : (
        <RecievedMessage content={content} from={from} domId={domId} />
      )}
    </React.Fragment>
  );
}

// domId={domId}
// domId={domId}
