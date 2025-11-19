import { ConversationItem } from "./ConversationItem"

export const ConversationBox = ({ selectedConversationId, onSelectConversation, conversations }) => {
  return (
    <div className="min-w-[300px] flex flex-col bg-blue-300">
      {
        conversations.map(({ conversation_id, name, last_name, username, last_message }) => <ConversationItem
          name={`${name} ${last_name}`}
          key={conversation_id}
          active={conversation_id === selectedConversationId}
          last_message={last_message?.content}
          date={last_message?.created_at}
          onClick={() => {
            console.log("onClick", conversation_id)
            onSelectConversation({ id: conversation_id, name: `${name} ${last_name}`, username })
          }}
        />)
      }
    </div>
  )
}