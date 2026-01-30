"use client"

import type React from "react"

import { useChat } from "ai/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot, User, MessageCircle, Users, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

// Mock data for user conversations
const mockConversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Teacher",
    subject: "Mathematics",
    lastMessage: "Great! Let's schedule our next session for Tuesday.",
    timestamp: "2 min ago",
    unread: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Student",
    subject: "Physics",
    lastMessage: "Thanks for the explanation about quantum mechanics!",
    timestamp: "1 hour ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Teacher",
    subject: "Chemistry",
    lastMessage: "I can help you with organic chemistry concepts.",
    timestamp: "3 hours ago",
    unread: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ChatPage() {
  const { user } = useUser()
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("ai-assistant")

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">LinkCode Chat</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Welcome, {user?.firstName}!</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          {/* Sidebar - Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-220px)]">
                  <div className="space-y-2 p-4">
                    {mockConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedConversation === conversation.id
                            ? "bg-blue-50 border border-blue-200"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {conversation.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                              {conversation.unread > 0 && (
                                <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {conversation.role}
                              </Badge>
                              <span className="text-xs text-gray-500">{conversation.subject}</span>
                            </div>
                            <p className="text-xs text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                            <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      AI Assistant
                    </TabsTrigger>
                    <TabsTrigger value="user-chat" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      User Chat
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent className="flex-1 p-0">
                <Tabs value={activeTab} className="h-full">
                  {/* AI Assistant Tab */}
                  <TabsContent value="ai-assistant" className="h-full m-0">
                    <div className="flex flex-col h-[calc(100vh-280px)]">
                      {/* AI Chat Header */}
                      <div className="px-6 py-3 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">LinkCode AI Assistant</h3>
                            <p className="text-sm text-gray-600">
                              Get help with scheduling, matching, and platform questions
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* AI Messages */}
                      <ScrollArea className="flex-1 px-6 py-4">
                        <div className="space-y-4">
                          {messages.length === 0 && (
                            <div className="text-center py-8">
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bot className="h-8 w-8 text-blue-600" />
                              </div>
                              <h3 className="font-semibold text-gray-900 mb-2">Welcome to LinkCode AI!</h3>
                              <p className="text-gray-600 text-sm max-w-md mx-auto">
                                I'm here to help you with scheduling classes, finding matches, and answering questions
                                about the platform. What can I help you with today?
                              </p>
                              <div className="flex flex-wrap gap-2 justify-center mt-4">
                                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
                                  Find me a math tutor
                                </Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
                                  Schedule a class
                                </Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
                                  How does matching work?
                                </Badge>
                              </div>
                            </div>
                          )}

                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              {message.role === "assistant" && (
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Bot className="h-4 w-4 text-white" />
                                </div>
                              )}

                              <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                  message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                                }`}
                              >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              </div>

                              {message.role === "user" && (
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                  <AvatarImage src={user?.imageUrl || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    <User className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          ))}

                          {isLoading && (
                            <div className="flex gap-3 justify-start">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                <Bot className="h-4 w-4 text-white" />
                              </div>
                              <div className="bg-gray-100 rounded-lg px-4 py-2">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>

                  {/* User Chat Tab */}
                  <TabsContent value="user-chat" className="h-full m-0">
                    <div className="flex flex-col h-[calc(100vh-280px)]">
                      {selectedConversation ? (
                        <>
                          {/* Selected User Chat Header */}
                          <div className="px-6 py-3 border-b">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                <AvatarFallback>SJ</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    Teacher
                                  </Badge>
                                  <span className="text-sm text-gray-600">Mathematics</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* User Messages */}
                          <ScrollArea className="flex-1 px-6 py-4">
                            <div className="space-y-4">
                              <div className="flex gap-3 justify-start">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback>SJ</AvatarFallback>
                                </Avatar>
                                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                                  <p className="text-sm">
                                    Hi! I saw your profile and I think I can help you with calculus. When would be a
                                    good time for our first session?
                                  </p>
                                  <span className="text-xs text-gray-500 mt-1 block">10:30 AM</span>
                                </div>
                              </div>

                              <div className="flex gap-3 justify-end">
                                <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-[80%]">
                                  <p className="text-sm">
                                    That sounds great! I'm available Tuesday and Thursday evenings. What works best for
                                    you?
                                  </p>
                                  <span className="text-xs text-blue-100 mt-1 block">10:32 AM</span>
                                </div>
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={user?.imageUrl || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    <User className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                              </div>

                              <div className="flex gap-3 justify-start">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback>SJ</AvatarFallback>
                                </Avatar>
                                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                                  <p className="text-sm">
                                    Tuesday evening works perfectly! How about 7 PM? We can meet at the library or I can
                                    come to your preferred location.
                                  </p>
                                  <span className="text-xs text-gray-500 mt-1 block">10:35 AM</span>
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                        </>
                      ) : (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="font-semibold text-gray-900 mb-2">Select a conversation</h3>
                            <p className="text-gray-600 text-sm">
                              Choose a conversation from the sidebar to start chatting
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>

              {/* Chat Input */}
              <CardFooter className="border-t">
                {activeTab === "ai-assistant" ? (
                  <form onSubmit={onSubmit} className="flex w-full space-x-2">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask me about scheduling, matching, or anything else..."
                      className="flex-grow"
                      disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                ) : (
                  <form className="flex w-full space-x-2">
                    <Input
                      placeholder={
                        selectedConversation ? "Type your message..." : "Select a conversation to start chatting"
                      }
                      className="flex-grow"
                      disabled={!selectedConversation}
                    />
                    <Button type="submit" disabled={!selectedConversation}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
