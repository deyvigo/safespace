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
    <div className="min-w-[300px] max-w-[350px] flex flex-col bg-white border-r border-slate-200 overflow-hidden">
      <div className="px-4 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-lg font-bold text-slate-800">Conversaciones</h3>
        <p className="text-xs text-slate-500 mt-1">{conversations.length} {conversations.length === 1 ? 'conversación' : 'conversaciones'}</p>
      </div>
      <div className="flex-1 overflow-y-auto">
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
    </div>
  )
}