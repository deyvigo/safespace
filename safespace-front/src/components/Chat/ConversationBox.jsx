import { markConversationAsRead } from "../../services/chatService"
import { ConversationItem } from "./ConversationItem"

export const ConversationBox = ({ selectedConversationId, onSelectConversation, conversations }) => {
  const handleClick = (conversation_id, username, name, last_name, seen) => {
    const isAlreadySelected = selectedConversationId === conversation_id

    onSelectConversation({ id: conversation_id, name: `${name} ${last_name}`, username })

    if (!seen && !isAlreadySelected) {
      markConversationAsRead(conversation_id)
    }
  }

  return (
    <div className="min-w-[300px] flex flex-col bg-blue-300">
      {
        conversations.map(({ conversation_id, name, last_name, username, last_message, seen }) => <ConversationItem
          name={`${name} ${last_name}`}
          key={conversation_id}
          active={conversation_id === selectedConversationId}
          last_message={last_message?.content}
          date={last_message?.created_at}
          seen={seen}
          onClick={() => handleClick(conversation_id, username, name, last_name, seen)}
        />)
      }
    </div>
  )
}