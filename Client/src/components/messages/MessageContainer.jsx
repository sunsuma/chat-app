import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConversation()

  useEffect(()=>{
    return () => setSelectedConversation(null)
  },[setSelectedConversation])

  return (
    <div className="md:min-w-[450px] flex flex-col h-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2">
            <span className="label-text text-white">
              To: <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
            </span>
          </div>
          
          {/* Messages container with flex-1 to take remaining space */}
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>
          
          {/* MessageInput will stay at bottom */}
          <div className="mt-auto">
            <MessageInput />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} 🌺</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};