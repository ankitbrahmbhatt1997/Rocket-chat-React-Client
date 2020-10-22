import DocTemplate from "components/Chat/Message/DocTemplate";
import RecievedMessage from "components/Chat/Message/RecievedMessage";
import SentMessage from "components/Chat/Message/SentMessage";
import { differenceInDays, format, isSameDay, subDays } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";

const getChatTime = (timestamp) => {
  let currentDate = new Date();
  if (isSameDay(currentDate, timestamp)) {
    return format(timestamp, "h:mm aaaa");
  } else if (isSameDay(subDays(currentDate, 1), timestamp)) {
    return "yesterday";
  } else {
    return `${differenceInDays(currentDate, timestamp)} days ago`;
    // return format(timestamp, "dd-MM-yyyy");
  }
};

export default function Message({
  message: {
    msg: content,
    u: { username: from },
    file,
    attachments,
    ts,
    groupable = true,
  },
  domId,
}) {
  const username = useSelector((state) => state.auth.user.username);

  const parsedTimestamp = getChatTime(ts.$date);

  // document sent
  if (username === from && !groupable && file)
    return <DocTemplate file={attachments[0]} domId={domId} />;
  // text message sent
  else if (username === from)
    return (
      <SentMessage
        content={content}
        domId={domId}
        parsedTimestamp={parsedTimestamp}
      />
    );
  // document recieved
  else if (username !== from && !groupable && file)
    return (
      <DocTemplate
        file={attachments[0]}
        position="flex-start"
        from={from}
        domId={domId}
      />
    );
  // text message recieved
  else
    return (
      <RecievedMessage
        content={content}
        from={from}
        domId={domId}
        parsedTimestamp={parsedTimestamp}
      />
    );
}
