import { Chat } from "@/components/screens/Chat/Chat";

const ChatPage = ({ params: { id } }: { params: { id: string } }) => {
  return <Chat id={id} />;
};

export default ChatPage;
