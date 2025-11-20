import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react"
import { MessageItem } from "./MessageItem"
import { getMessagesByConversation } from "../../services/chatService"

export const MessagesBox = forwardRef(({ messages, username, updateMessages, conversation_id }, ref) => {
  const containerRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)

  const prevScrollHeight = useRef(0)
  const isPagination = useRef(false)

  useImperativeHandle(ref , () => ({
    scrollToBottom: () => {
      console.log("Scrolling to bottom")
      console.log(containerRef.current)
      isPagination.current = false
      if (!containerRef.current) return
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }))

  useEffect(() => {
    setCurrentPage(0)
    isPagination.current = false
  }, [conversation_id])

  const scrollToBottomInternal = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  }

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollTop == 0 && scrollHeight > clientHeight) {
      prevScrollHeight.current = scrollHeight
      isPagination.current = true
      setCurrentPage((prev) => prev + 1)
    } else if (scrollTop == 0 ) {
    }
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesByConversation(conversation_id, currentPage, 30)
        const batchAsc = data.content.slice().reverse()
        if (batchAsc.length > 0) {
          if (currentPage === 0) {

          } else {
            updateMessages(prev => [...batchAsc, ...prev])
          }
        }
      } catch (error) {
        console.error("Error cargando mensajes:", error)
      }
    }
    fetchMessages()
  }, [currentPage, conversation_id])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (isPagination.current) {
      const newScrollHeight = container.scrollHeight
      const diff = newScrollHeight - prevScrollHeight.current

      container.scrollTop = diff

      isPagination.current = false
    } else {
      scrollToBottomInternal()
    }
  }, [messages])

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-2 space-y-3"
      onScroll={handleScroll}
    >
      {
        messages.map(({ id, content, created_at, sender_username }) => <MessageItem key={id} sender={username === sender_username ? "other" : "me"} message={content} date={created_at} />)
      }
      <div ref={messagesEndRef} />
    </div>
  )
})

MessagesBox.displayName = "MessagesBox"