import { markConversationAsRead } from "../../services/chatService"
import { ConversationItem } from "./ConversationItem"

export const ConversationBox = ({ selectedConversationId, onSelectConversation, conversations, updateConversations }) => {
  const handleClick = (conversation_id, username, name, last_name, seen) => {
    const isAlreadySelected = selectedConversationId === conversation_id

    onSelectConversation({ id: conversation_id, name: `${name} ${last_name}`, username })

    // Mark as readed is click on conversation item
    if (!seen && !isAlreadySelected) {
      markConversationAsRead(conversation_id)
      updateConversations((prev) => {
        return prev.map((conv) => {
          if (conv.conversation_id === conversation_id) {
            return {
              ...conv,
              last_message: {
                ...conv.last_message,
                seen: true
              }
            }
          }
          return conv
        })
      })
    }
  }

  return (
    <div className="min-w-[300px] flex flex-col bg-blue-300">
      {
        conversations.map(({ conversation_id, name, last_name, username, last_message }) => <ConversationItem
          name={`${name} ${last_name}`}
          key={conversation_id}
          active={conversation_id === selectedConversationId}
          last_message={last_message?.content}
          date={last_message?.created_at}
          seen={last_message?.seen}
          last_message_sender_username={last_message?.sender_username}
          onClick={() => handleClick(conversation_id, username, name, last_name, last_message?.seen)}
        />)
      }
    </div>
  )
}