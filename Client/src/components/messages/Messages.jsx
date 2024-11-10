import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages()
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"})
    },100)
  }, [messages]);

  return (
    <div className="px-4 overflow-auto">
      {/* <Message/> */}

      {!loading &&
        messages.length > 0 &&
        messages.map((message, idx) => (
          <div key={message._id}
          // ref={lastMessageRef}
          ref={idx === messages.length - 1 ? lastMessageRef : null}
          >
          <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-500">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
