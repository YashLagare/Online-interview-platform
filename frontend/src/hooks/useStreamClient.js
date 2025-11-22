// import { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { StreamChat } from "stream-chat";
// import { sessionApi } from "../api/Session.js";
// import { disconnectStreamClient, initializeStreamClient } from "../utils/Stream.js";

// function useStreamClient(session, loadingSession, isHost, isParticipant) {
//   const [streamClient, setStreamClient] = useState(null);
//   const [call, setCall] = useState(null);
//   const [chatClient, setChatClient] = useState(null);
//   const [channel, setChannel] = useState(null);
//   const [isInitializingCall, setIsInitializingCall] = useState(true);
//   const [isDisconnected, setIsDisconnected] = useState(false);
//   const videoCallRef = useRef(null);
//   const chatClientRef = useRef(null);

//   useEffect(() => {
//     let videoCall = null;
//     let chatClientInstance = null;

//     const initCall = async () => {
//       if (!session?.callId) return;
//       if (!isHost && !isParticipant) return;
//       if (session.status === "completed") return;

//       try {
//         const { token, userId, userName, userImage } = await sessionApi.getStreamToken();

//         const client = await initializeStreamClient(
//           {
//             id: userId,
//             name: userName,
//             image: userImage,
//           },
//           token
//         );

//         setStreamClient(client);

//         videoCall = client.call("default", session.callId);
//         await videoCall.join({ create: true });
//         setCall(videoCall);

//         const apiKey = import.meta.env.VITE_STREAM_API_KEY;
//         chatClientInstance = StreamChat.getInstance(apiKey);

//         await chatClientInstance.connectUser(
//           {
//             id: userId,
//             name: userName,
//             image: userImage,
//           },
//           token
//         );
//         setChatClient(chatClientInstance);

//         const chatChannel = chatClientInstance.channel("messaging", session.callId);
//         await chatChannel.watch();
//         setChannel(chatChannel);
//       } catch (error) {
//         toast.error("Failed to join video call");
//         console.error("Error init call", error);
//       } finally {
//         setIsInitializingCall(false);
//       }
//     };

//     if (session && !loadingSession) initCall();

//     // cleanup - performance reasons
//     return () => {
//       // iife --> Immediately Invoked Function Expression --run only once...
//       (async () => {
//         try {
//           setIsDisconnected(true);
//           if (videoCallRef.current) {
//             try {
//               await videoCallRef.current.leave();
//             } catch (e) {
//               // Ignore if already left
//             }
//           }
//           if (chatClientRef.current) {
//             await chatClientRef.current.disconnectUser();
//           }
//           await disconnectStreamClient();
//           setChatClient(null);
//           setChannel(null);
//           setCall(null);
//         } catch (error) {
//           console.error("Cleanup error:", error);
//         }
//       })();
//     };
//   }, [session, loadingSession, isHost, isParticipant]);

//   return {
//     streamClient,
//     call,
//     chatClient,
//     channel,
//     isInitializingCall,
//     isDisconnected,
//   };
// }

// export default useStreamClient;



// import { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { StreamChat } from "stream-chat";
// import { sessionApi } from "../api/Session.js";
// import { disconnectStreamClient, initializeStreamClient } from "../utils/Stream.js";

// function useStreamClient(session, loadingSession, isHost, isParticipant) {
//   const [streamClient, setStreamClient] = useState(null);
//   const [call, setCall] = useState(null);
//   const [chatClient, setChatClient] = useState(null);
//   const [channel, setChannel] = useState(null);
//   const [isInitializingCall, setIsInitializingCall] = useState(true);
//   const [isDisconnected, setIsDisconnected] = useState(false);
  
//   // Use refs to track instances
//   const videoCallRef = useRef(null);
//   const chatClientRef = useRef(null);
//   const isInitializedRef = useRef(false);
//   const callIdRef = useRef(null);

//   useEffect(() => {
//     const initCall = async () => {
//       // Prevent re-initialization if already initialized with same callId
//       if (isInitializedRef.current && callIdRef.current === session?.callId) {
//         return;
//       }

//       if (!session?.callId) return;
//       if (!isHost && !isParticipant) return;
//       if (session.status === "completed") return;
//       if (loadingSession) return;

//       try {
//         setIsInitializingCall(true);
        
//         const { token, userId, userName, userImage } = await sessionApi.getStreamToken();

//         const client = await initializeStreamClient(
//           {
//             id: userId,
//             name: userName,
//             image: userImage,
//           },
//           token
//         );

//         setStreamClient(client);

//         const videoCall = client.call("default", session.callId);
//         await videoCall.join({ create: true });
//         videoCallRef.current = videoCall;
//         setCall(videoCall);

//         const apiKey = import.meta.env.VITE_STREAM_API_KEY;
//         const chatClientInstance = StreamChat.getInstance(apiKey);

//         await chatClientInstance.connectUser(
//           {
//             id: userId,
//             name: userName,
//             image: userImage,
//           },
//           token
//         );
//         chatClientRef.current = chatClientInstance;
//         setChatClient(chatClientInstance);

//         const chatChannel = chatClientInstance.channel("messaging", session.callId);
//         await chatChannel.watch();
//         setChannel(chatChannel);

//         // Mark as initialized
//         isInitializedRef.current = true;
//         callIdRef.current = session.callId;
//       } catch (error) {
//         toast.error("Failed to join video call");
//         console.error("Error init call", error);
//       } finally {
//         setIsInitializingCall(false);
//       }
//     };

//     initCall();

//     // Cleanup only when component unmounts or callId changes
//     return () => {
//       // Only cleanup if callId actually changed or component unmounting
//       if (!session?.callId || callIdRef.current !== session?.callId) {
//         (async () => {
//           try {
//             setIsDisconnected(true);
            
//             if (videoCallRef.current) {
//               try {
//                 await videoCallRef.current.leave();
//               } catch (e) {
//                 console.log("Already left call");
//               }
//               videoCallRef.current = null;
//             }
            
//             if (chatClientRef.current) {
//               try {
//                 await chatClientRef.current.disconnectUser();
//               } catch (e) {
//                 console.log("Chat already disconnected");
//               }
//               chatClientRef.current = null;
//             }
            
//             await disconnectStreamClient();
//             setChatClient(null);
//             setChannel(null);
//             setCall(null);
//             isInitializedRef.current = false;
//             callIdRef.current = null;
//           } catch (error) {
//             console.error("Cleanup error:", error);
//           }
//         })();
//       }
//     };
//   }, [session?.callId, isHost, isParticipant]); // Only depend on callId, not entire session object

//   // Separate effect to handle session completion
//   useEffect(() => {
//     if (session?.status === "completed" && isInitializedRef.current) {
//       (async () => {
//         try {
//           if (videoCallRef.current) {
//             await videoCallRef.current.leave();
//             videoCallRef.current = null;
//           }
//           if (chatClientRef.current) {
//             await chatClientRef.current.disconnectUser();
//             chatClientRef.current = null;
//           }
//           await disconnectStreamClient();
//           setChatClient(null);
//           setChannel(null);
//           setCall(null);
//           isInitializedRef.current = false;
//         } catch (error) {
//           console.error("Cleanup error:", error);
//         }
//       })();
//     }
//   }, [session?.status]);

//   return {
//     streamClient,
//     call,
//     chatClient,
//     channel,
//     isInitializingCall,
//     isDisconnected,
//   };
// }

// export default useStreamClient;



// import { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { StreamChat } from "stream-chat";
// import { sessionApi } from "../api/Session.js";
// import { disconnectStreamClient, initializeStreamClient } from "../utils/Stream.js";

// function useStreamClient(session, loadingSession, isHost, isParticipant) {
//   const [streamClient, setStreamClient] = useState(null);
//   const [call, setCall] = useState(null);
//   const [chatClient, setChatClient] = useState(null);
//   const [channel, setChannel] = useState(null);
//   const [isInitializingCall, setIsInitializingCall] = useState(true);
//   const [isDisconnected, setIsDisconnected] = useState(false);
  
//   // Use refs to track instances and prevent re-initialization
//   const videoCallRef = useRef(null);
//   const chatClientRef = useRef(null);
//   const isInitializedRef = useRef(false);
//   const callIdRef = useRef(null);
//   const isCleaningUpRef = useRef(false);
//   const isMountedRef = useRef(true);

//   // Extract stable values to prevent unnecessary re-runs
//   const callId = session?.callId;
//   const sessionStatus = session?.status;

//   useEffect(() => {
//     isMountedRef.current = true;

//     const initCall = async () => {
//       // Prevent re-initialization if already initialized with same callId
//       if (isInitializedRef.current && callIdRef.current === callId) {
//         console.log("✅ Stream already initialized for callId:", callId);
//         setIsInitializingCall(false);
//         return;
//       }

//       // Don't initialize if basic conditions aren't met
//       if (!callId) {
//         console.log("❌ No callId available");
//         setIsInitializingCall(false);
//         return;
//       }
      
//       if (!isHost && !isParticipant) {
//         console.log("❌ User is neither host nor participant");
//         setIsInitializingCall(false);
//         return;
//       }
      
//       if (sessionStatus === "completed") {
//         console.log("❌ Session is completed");
//         setIsInitializingCall(false);
//         return;
//       }
      
//       if (loadingSession) {
//         console.log("⏳ Session is still loading");
//         return;
//       }

//       // Prevent initialization during cleanup
//       if (isCleaningUpRef.current) {
//         console.log("⏳ Cleanup in progress, skipping initialization");
//         return;
//       }

//       try {
//         console.log("🚀 Starting Stream initialization for callId:", callId);
//         setIsInitializingCall(true);
        
//         const { token, userId, userName, userImage } = await sessionApi.getStreamToken();

//         if (!isMountedRef.current) {
//           console.log("⚠️ Component unmounted, aborting initialization");
//           return;
//         }

//         // Initialize video client
//         const client = await initializeStreamClient(
//           {
//             id: userId,
//             name: userName,
//             image: userImage,
//           },
//           token
//         );

//         if (!isMountedRef.current) return;

//         setStreamClient(client);

//         // Join video call
//         const videoCall = client.call("default", callId);
        
//         console.log("📞 Joining video call...");
//         await videoCall.join({ create: true });
        
//         if (!isMountedRef.current) return;

//         videoCallRef.current = videoCall;
//         setCall(videoCall);
//         console.log("✅ Video call joined successfully");

//         // Initialize chat client
//         const apiKey = import.meta.env.VITE_STREAM_API_KEY;
//         const chatClientInstance = StreamChat.getInstance(apiKey);

//         console.log("💬 Connecting chat user...");
//         await chatClientInstance.connectUser(
//           {
//             id: userId,
//             name: userName,
//             image: userImage,
//           },
//           token
//         );

//         if (!isMountedRef.current) return;

//         chatClientRef.current = chatClientInstance;
//         setChatClient(chatClientInstance);

//         // Watch chat channel
//         const chatChannel = chatClientInstance.channel("messaging", callId);
//         console.log("👀 Watching chat channel...");
//         await chatChannel.watch();

//         if (!isMountedRef.current) return;

//         setChannel(chatChannel);

//         // Mark as initialized
//         isInitializedRef.current = true;
//         callIdRef.current = callId;
//         setIsDisconnected(false);
        
//         console.log("✅ Stream initialization completed successfully");
//       } catch (error) {
//         if (!isMountedRef.current) return;
        
//         console.error("❌ Error initializing Stream:", error);
//         toast.error("Failed to join video call");
        
//         // Reset initialization state on error
//         isInitializedRef.current = false;
//         callIdRef.current = null;
//       } finally {
//         if (isMountedRef.current) {
//           setIsInitializingCall(false);
//         }
//       }
//     };

//     initCall();

//     // Cleanup function
//     return () => {
//       isMountedRef.current = false;
      
//       // Only cleanup if callId actually changed or component is unmounting
//       const shouldCleanup = !callId || callIdRef.current !== callId;
      
//       if (shouldCleanup && isInitializedRef.current) {
//         console.log("🧹 Starting cleanup for callId:", callIdRef.current);
//         isCleaningUpRef.current = true;
        
//         (async () => {
//           try {
//             setIsDisconnected(true);
            
//             // Leave video call
//             if (videoCallRef.current) {
//               try {
//                 console.log("📴 Leaving video call...");
//                 await videoCallRef.current.leave();
//                 console.log("✅ Left video call");
//               } catch (e) {
//                 console.log("⚠️ Video call already left or error:", e.message);
//               }
//               videoCallRef.current = null;
//             }
            
//             // Disconnect chat
//             if (chatClientRef.current) {
//               try {
//                 console.log("💬 Disconnecting chat client...");
//                 await chatClientRef.current.disconnectUser();
//                 console.log("✅ Chat disconnected");
//               } catch (e) {
//                 console.log("⚠️ Chat already disconnected or error:", e.message);
//               }
//               chatClientRef.current = null;
//             }
            
//             // Disconnect stream client
//             await disconnectStreamClient();
            
//             // Reset state
//             setChatClient(null);
//             setChannel(null);
//             setCall(null);
//             setStreamClient(null);
//             isInitializedRef.current = false;
//             callIdRef.current = null;
            
//             console.log("✅ Stream cleanup completed");
//           } catch (error) {
//             console.error("❌ Cleanup error:", error);
//           } finally {
//             isCleaningUpRef.current = false;
//           }
//         })();
//       } else if (!shouldCleanup) {
//         console.log("⏭️ Skipping cleanup - callId unchanged:", callId);
//       }
//     };
//   }, [callId, sessionStatus, isHost, isParticipant, loadingSession]);

//   return {
//     streamClient,
//     call,
//     chatClient,
//     channel,
//     isInitializingCall,
//     isDisconnected,
//   };
// }

// export default useStreamClient;





import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { StreamChat } from "stream-chat";
import { sessionApi } from "../api/Session.js";
import { disconnectStreamClient, initializeStreamClient } from "../utils/Stream.js";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);
  const [isDisconnected, setIsDisconnected] = useState(false);
  
  // Use refs to track instances and prevent re-initialization
  const videoCallRef = useRef(null);
  const chatClientRef = useRef(null);
  const isInitializedRef = useRef(false);
  const callIdRef = useRef(null);
  const isCleaningUpRef = useRef(false);
  const isMountedRef = useRef(true);

  // CRITICAL: Memoize callId so it never becomes undefined once set
  // This prevents cleanup from running when React Query refetches
  const stableCallId = useMemo(() => {
    const newCallId = session?.callId;
    
    // If we have a callId stored and the new one is undefined, keep the old one
    if (callIdRef.current && !newCallId) {
      console.log("🔒 Keeping stable callId:", callIdRef.current, "(new value is undefined)");
      return callIdRef.current;
    }
    
    // If we have a new valid callId, use it
    if (newCallId) {
      console.log("📝 New callId:", newCallId);
      return newCallId;
    }
    
    // No callId at all
    return null;
  }, [session?.callId]);

  const sessionStatus = session?.status;

  useEffect(() => {
    isMountedRef.current = true;

    const initCall = async () => {
      // Prevent re-initialization if already initialized with same callId
      if (isInitializedRef.current && callIdRef.current === stableCallId) {
        console.log("✅ Stream already initialized for callId:", stableCallId);
        setIsInitializingCall(false);
        return;
      }

      // Don't initialize if basic conditions aren't met
      if (!stableCallId) {
        if (!isInitializedRef.current) {
          console.log("❌ No callId available");
        }
        setIsInitializingCall(false);
        return;
      }
      
      if (!isHost && !isParticipant) {
        console.log("❌ User is neither host nor participant");
        setIsInitializingCall(false);
        return;
      }
      
      if (sessionStatus === "completed") {
        console.log("❌ Session is completed");
        setIsInitializingCall(false);
        return;
      }
      
      if (loadingSession) {
        console.log("⏳ Session is still loading");
        return;
      }

      // Prevent initialization during cleanup
      if (isCleaningUpRef.current) {
        console.log("⏳ Cleanup in progress, skipping initialization");
        return;
      }

      try {
        console.log("🚀 Starting Stream initialization for callId:", stableCallId);
        setIsInitializingCall(true);
        
        const { token, userId, userName, userImage } = await sessionApi.getStreamToken();

        if (!isMountedRef.current) {
          console.log("⚠️ Component unmounted, aborting initialization");
          return;
        }

        // Initialize video client
        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        );

        if (!isMountedRef.current) return;

        setStreamClient(client);

        // Join video call
        const videoCall = client.call("default", stableCallId);
        
        console.log("📞 Joining video call...");
        await videoCall.join({ create: true });
        
        if (!isMountedRef.current) return;

        videoCallRef.current = videoCall;
        setCall(videoCall);
        console.log("✅ Video call joined successfully");

        // Initialize chat client
        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        const chatClientInstance = StreamChat.getInstance(apiKey);

        console.log("💬 Connecting chat user...");
        await chatClientInstance.connectUser(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        );

        if (!isMountedRef.current) return;

        chatClientRef.current = chatClientInstance;
        setChatClient(chatClientInstance);

        // Watch chat channel
        const chatChannel = chatClientInstance.channel("messaging", stableCallId);
        console.log("👀 Watching chat channel...");
        await chatChannel.watch();

        if (!isMountedRef.current) return;

        setChannel(chatChannel);

        // Mark as initialized and store the callId
        isInitializedRef.current = true;
        callIdRef.current = stableCallId;
        setIsDisconnected(false);
        
        console.log("✅ Stream initialization completed successfully");
      } catch (error) {
        if (!isMountedRef.current) return;
        
        console.error("❌ Error initializing Stream:", error);
        toast.error("Failed to join video call");
        
        // Reset initialization state on error
        isInitializedRef.current = false;
        callIdRef.current = null;
      } finally {
        if (isMountedRef.current) {
          setIsInitializingCall(false);
        }
      }
    };

    initCall();

    // Cleanup function - only runs on unmount or actual callId change
    return () => {
      const previousCallId = callIdRef.current;
      isMountedRef.current = false;
      
      // Only cleanup if:
      // 1. We're initialized AND
      // 2. Either the component is unmounting OR the callId changed to a different value
      const shouldCleanup = isInitializedRef.current && (
        // Component is unmounting (no new callId at all)
        !stableCallId ||
        // CallId changed to a different actual value
        (stableCallId && previousCallId && stableCallId !== previousCallId)
      );
      
      if (shouldCleanup) {
        console.log("🧹 Cleanup triggered - Previous:", previousCallId, "New:", stableCallId);
        isCleaningUpRef.current = true;
        
        (async () => {
          try {
            setIsDisconnected(true);
            
            // Leave video call
            if (videoCallRef.current) {
              try {
                console.log("📴 Leaving video call...");
                await videoCallRef.current.leave();
                console.log("✅ Left video call");
              } catch (e) {
                console.log("⚠️ Video call already left or error:", e.message);
              }
              videoCallRef.current = null;
            }
            
            // Disconnect chat
            if (chatClientRef.current) {
              try {
                console.log("💬 Disconnecting chat client...");
                await chatClientRef.current.disconnectUser();
                console.log("✅ Chat disconnected");
              } catch (e) {
                console.log("⚠️ Chat already disconnected or error:", e.message);
              }
              chatClientRef.current = null;
            }
            
            // Disconnect stream client
            await disconnectStreamClient();
            
            // Reset state
            setChatClient(null);
            setChannel(null);
            setCall(null);
            setStreamClient(null);
            isInitializedRef.current = false;
            callIdRef.current = null;
            
            console.log("✅ Stream cleanup completed");
          } catch (error) {
            console.error("❌ Cleanup error:", error);
          } finally {
            isCleaningUpRef.current = false;
          }
        })();
      } else {
        console.log("⏭️ Skipping cleanup - connection should remain active");
      }
    };
  }, [stableCallId, sessionStatus, isHost, isParticipant, loadingSession]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
    isDisconnected,
  };
}

export default useStreamClient;