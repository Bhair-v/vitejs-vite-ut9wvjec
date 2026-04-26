import React, { useState, useEffect, useRef } from 'react';
import { Search, Send } from 'lucide-react';
// FIREBASE IMPORTS
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase'; 

// 1. Updated Team Members from your image
const TEAM_MEMBERS = {
  'Administrator': { id: 'admin', name: 'Rashid Ahmed', role: 'Admin', initials: 'RA' },
  'Researcher': { id: 'res', name: 'Farida Rahman', role: 'Researcher', initials: 'FR' },
  'Data Analyst': { id: 'da', name: 'Kamal Hossain', role: 'Data Analyst', initials: 'KH' },
  'Clinical Researcher': { id: 'cr', name: 'Nadia Islam', role: 'Clinical Researcher', initials: 'NI' },
};

export default function Messages({ currentRole }) {
  // Normalize 'Administrator' to 'Admin' if needed by the role switcher
  const roleKey = currentRole === 'Admin' ? 'Administrator' : currentRole;
  const currentUser = TEAM_MEMBERS[roleKey];
  
  const contacts = Object.values(TEAM_MEMBERS).filter(member => member.name !== currentUser.name);
  
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // 2. REAL-TIME DATABASE LISTENER
  useEffect(() => {
    // Create a query to get messages ordered by time
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    
    // onSnapshot listens to the cloud. When a message is added, this instantly updates!
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedContact]);

  // 3. SEND MESSAGE TO CLOUD
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Add a new document to the "messages" collection in Firestore
      await addDoc(collection(db, "messages"), {
        senderRole: currentUser.role,
        receiverRole: selectedContact.role,
        text: newMessage,
        timestamp: serverTimestamp() // Uses Google's server time
      });
      setNewMessage(''); // Clear input
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  // Filter messages for current conversation
  const currentConversation = messages.filter(msg => 
    (msg.senderRole === currentUser.role && msg.receiverRole === selectedContact.role) ||
    (msg.senderRole === selectedContact.role && msg.receiverRole === currentUser.role)
  );

  // Format time (handles Firebase serverTimestamp which can briefly be null)
  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    // Firebase timestamps have a toDate() method
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-300">
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-bold text-gray-900">Messages & Discussions</h2>
        <p className="text-sm text-gray-500 mt-1">Collaborate with your research team</p>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* LEFT PANEL: Contacts */}
        <div className="w-1/3 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Conversations</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search conversations..." className="w-full bg-gray-100 border-transparent rounded-lg pl-9 pr-4 py-2 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => {
              const isSelected = selectedContact.id === contact.id;
              const lastMsg = messages.filter(m => 
                (m.senderRole === currentUser.role && m.receiverRole === contact.role) ||
                (m.senderRole === contact.role && m.receiverRole === currentUser.role)
              ).pop();

              return (
                <div key={contact.id} onClick={() => setSelectedContact(contact)} className={`p-4 border-b border-gray-50 cursor-pointer transition-colors flex items-center gap-3 ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}>
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm shrink-0">{contact.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{contact.name}</h4>
                      {lastMsg && <span className="text-[10px] text-gray-400 shrink-0">{formatTime(lastMsg.timestamp)}</span>}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{lastMsg ? lastMsg.text : `Start a conversation with ${contact.name}`}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: Chat */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden relative">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">{selectedContact.initials}</div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{selectedContact.name}</h3>
              <p className="text-[11px] text-gray-500 font-medium">{selectedContact.role}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            {currentConversation.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
                <p className="text-sm">No messages yet. Say hello!</p>
              </div>
            ) : (
              currentConversation.map((msg) => {
                const isMe = msg.senderRole === currentUser.role;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold text-gray-700">{isMe ? 'You' : selectedContact.name}</span>
                      <span className="text-[9px] text-gray-400">{formatTime(msg.timestamp)}</span>
                    </div>
                    <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-sm shadow-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
              <button type="submit" disabled={!newMessage.trim()} className="absolute right-2 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}