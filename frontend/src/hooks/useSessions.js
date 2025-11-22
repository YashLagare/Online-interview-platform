// import { useMutation, useQuery } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { sessionApi } from "../api/Session.js";

// export const useCreateSession = () => {
//   const result = useMutation({
//     mutationKey: ["createSession"],
//     mutationFn: sessionApi.createSession,
//     onSuccess: () => toast.success("Session created successfully!🤗"),
//     onError: (error) =>
//       toast.error(error.response?.data?.message || "Failed to create room"),
//   });

//   return result;
// };

// export const useActiveSessions = () => {
//   const result = useQuery({
//     queryKey: ["activeSessions"],
//     queryFn: sessionApi.getActiveSessions,
//     retry: false,
//   });

//   return result;
// };

// export const useMyRecentSessions = () => {
//   const result = useQuery({
//     queryKey: ["myRecentSessions"],
//     queryFn: sessionApi.getMyRecentSessions,
//     retry: false,
//   });

//   return result;
// };

// // export const useSessionById = (id) => {
// //   const result = useQuery({
// //     queryKey: ["session", id],
// //     queryFn: () => sessionApi.getSessionById(id),
// //     enabled: !!id,
// //     refetchInterval: 5000, // refetch every 5 seconds to detect session status changes
// //   });

// //   return result;
// // };

// export const useSessionById = (id) => {
//   const result = useQuery({
//     queryKey: ["session", id],
//     queryFn: () => sessionApi.getSessionById(id),
//     enabled: !!id,
//     refetchInterval: 10000, // Increase from 5000 to 10000
//     staleTime: 5000, // Add staleTime to prevent unnecessary refetches
//     refetchOnWindowFocus: false, // Prevent refetch when switching tabs
//   });

//   return result;
// };

// export const useJoinSession = () => {
//   const result = useMutation({
//     mutationKey: ["joinSession"],
//     mutationFn: sessionApi.joinSession,
//     onSuccess: () => toast.success("Joined session successfully!😎"),
//     onError: (error) =>
//       toast.error(error.response?.data?.message || "Failed to join session"),
//   });

//   return result;
// };

// export const useEndSession = () => {
//   const result = useMutation({
//     mutationKey: ["endSession"],
//     mutationFn: sessionApi.endSession,
//     onSuccess: () => toast.success("Session ended successfully!🙃"),
//     onError: (error) =>
//       toast.error(error.response?.data?.message || "Failed to end session"),
//   });

//   return result;
// };




// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { sessionApi } from "../api/Session.js";

// export const useCreateSession = () => {
//   const queryClient = useQueryClient();
  
//   const result = useMutation({
//     mutationKey: ["createSession"],
//     mutationFn: sessionApi.createSession,
//     onSuccess: () => {
//       toast.success("Session created successfully!🤗");
//       queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
//     },
//     onError: (error) => toast.error(error.response?.data?.message || "Failed to create room"),
//   });

//   return result;
// };

// export const useActiveSessions = () => {
//   const result = useQuery({
//     queryKey: ["activeSessions"],
//     queryFn: sessionApi.getActiveSessions,
//     retry: false,
//     refetchInterval: 30000, // Refetch every 30 seconds instead of constantly
//     staleTime: 15000,
//   });

//   return result;
// };

// export const useMyRecentSessions = () => {
//   const result = useQuery({
//     queryKey: ["myRecentSessions"],
//     queryFn: sessionApi.getMyRecentSessions,
//     retry: false,
//     refetchInterval: 30000, // Refetch every 30 seconds
//     staleTime: 15000,
//   });

//   return result;
// };

// export const useSessionById = (id) => {
//   const result = useQuery({
//     queryKey: ["session", id],
//     queryFn: () => sessionApi.getSessionById(id),
//     enabled: !!id,
//     refetchInterval: (query) => {
//       // Stop refetching if session is completed
//       const session = query.state.data?.session;
//       if (session?.status === "completed") {
//         return false;
//       }
//       // Refetch every 15 seconds for active sessions
//       return 15000;
//     },
//     staleTime: 10000, // Consider data fresh for 10 seconds
//     refetchOnWindowFocus: false, // Don't refetch when user switches back to tab
//     refetchOnReconnect: true, // Only refetch when internet reconnects
//     // CRITICAL: Use structural sharing to prevent unnecessary re-renders
//     // This ensures that if the data hasn't changed, the same object reference is returned
//     structuralSharing: (oldData, newData) => {
//       // Deep comparison for session object
//       if (!oldData || !newData) return newData;
      
//       const oldSession = oldData.session;
//       const newSession = newData.session;
      
//       // If the important fields haven't changed, return old data to maintain reference
//       if (
//         oldSession?.id === newSession?.id &&
//         oldSession?.callId === newSession?.callId &&
//         oldSession?.status === newSession?.status &&
//         oldSession?.host?.clerkId === newSession?.host?.clerkId &&
//         oldSession?.participant?.clerkId === newSession?.participant?.clerkId
//       ) {
//         return oldData; // Return old reference if nothing important changed
//       }
      
//       return newData; // Return new data if something changed
//     },
//   });

//   return result;
// };

// export const useJoinSession = () => {
//   const queryClient = useQueryClient();
  
//   const result = useMutation({
//     mutationKey: ["joinSession"],
//     mutationFn: sessionApi.joinSession,
//     onSuccess: (data, sessionId) => {
//       toast.success("Joined session successfully!😎");
//       // Update the specific session cache
//       queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
//     },
//     onError: (error) => toast.error(error.response?.data?.message || "Failed to join session"),
//   });

//   return result;
// };

// export const useEndSession = () => {
//   const queryClient = useQueryClient();
  
//   const result = useMutation({
//     mutationKey: ["endSession"],
//     mutationFn: sessionApi.endSession,
//     onSuccess: (data, sessionId) => {
//       toast.success("Session ended successfully!🙃");
//       // Invalidate all session-related queries
//       queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
//       queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
//       queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
//     },
//     onError: (error) => toast.error(error.response?.data?.message || "Failed to end session"),
//   });

//   return result;
// };





// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { sessionApi } from "../api/Session.js";

// export const useCreateSession = () => {
//   const queryClient = useQueryClient();
  
//   const result = useMutation({
//     mutationKey: ["createSession"],
//     mutationFn: sessionApi.createSession,
//     onSuccess: () => {
//       toast.success("Session created successfully!🤗");
//       queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
//     },
//     onError: (error) => toast.error(error.response?.data?.message || "Failed to create room"),
//   });

//   return result;
// };

// export const useActiveSessions = () => {
//   const result = useQuery({
//     queryKey: ["activeSessions"],
//     queryFn: sessionApi.getActiveSessions,
//     retry: false,
//     refetchInterval: 30000, // Refetch every 30 seconds instead of constantly
//     staleTime: 15000,
//   });

//   return result;
// };

// export const useMyRecentSessions = () => {
//   const result = useQuery({
//     queryKey: ["myRecentSessions"],
//     queryFn: sessionApi.getMyRecentSessions,
//     retry: false,
//     refetchInterval: 30000, // Refetch every 30 seconds
//     staleTime: 15000,
//   });

//   return result;
// };

// export const useSessionById = (id) => {
//   const result = useQuery({
//     queryKey: ["session", id],
//     queryFn: () => sessionApi.getSessionById(id),
//     enabled: !!id,
//     refetchInterval: (query) => {
//       // Stop refetching if session is completed
//       const session = query.state.data?.session;
//       if (session?.status === "completed") {
//         return false;
//       }
//       // Refetch every 15 seconds for active sessions
//       return 15000;
//     },
//     staleTime: 10000, // Consider data fresh for 10 seconds
//     refetchOnWindowFocus: false, // Don't refetch when user switches back to tab
//     refetchOnReconnect: true, // Only refetch when internet reconnects
//     // CRITICAL: Keep previous data while refetching to prevent UI flicker
//     placeholderData: (previousData) => previousData,
//     // CRITICAL: Use structural sharing to prevent unnecessary re-renders
//     // This ensures that if the data hasn't changed, the same object reference is returned
//     structuralSharing: (oldData, newData) => {
//       // Deep comparison for session object
//       if (!oldData || !newData) return newData;
      
//       const oldSession = oldData.session;
//       const newSession = newData.session;
      
//       // If the important fields haven't changed, return old data to maintain reference
//       if (
//         oldSession?.id === newSession?.id &&
//         oldSession?.callId === newSession?.callId &&
//         oldSession?.status === newSession?.status &&
//         oldSession?.host?.clerkId === newSession?.host?.clerkId &&
//         oldSession?.participant?.clerkId === newSession?.participant?.clerkId
//       ) {
//         return oldData; // Return old reference if nothing important changed
//       }
      
//       return newData; // Return new data if something changed
//     },
//   });

//   return result;
// };

// export const useJoinSession = () => {
//   const queryClient = useQueryClient();
  
//   const result = useMutation({
//     mutationKey: ["joinSession"],
//     mutationFn: sessionApi.joinSession,
//     onSuccess: (data, sessionId) => {
//       toast.success("Joined session successfully!😎");
//       // Update the specific session cache
//       queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
//     },
//     onError: (error) => toast.error(error.response?.data?.message || "Failed to join session"),
//   });

//   return result;
// };

// export const useEndSession = () => {
//   const queryClient = useQueryClient();
  
//   const result = useMutation({
//     mutationKey: ["endSession"],
//     mutationFn: sessionApi.endSession,
//     onSuccess: (data, sessionId) => {
//       toast.success("Session ended successfully!🙃");
//       // Invalidate all session-related queries
//       queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
//       queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
//       queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
//     },
//     onError: (error) => toast.error(error.response?.data?.message || "Failed to end session"),
//   });

//   return result;
// };



import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/Session.js";

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  
  const result = useMutation({
    mutationKey: ["createSession"],
    mutationFn: sessionApi.createSession,
    onSuccess: () => {
      toast.success("Session created successfully!🤗");
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to create room"),
  });

  return result;
};

export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: sessionApi.getActiveSessions,
    retry: false,
    refetchInterval: 30000, // Refetch every 30 seconds instead of constantly
    staleTime: 15000,
  });

  return result;
};

export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: sessionApi.getMyRecentSessions,
    retry: false,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 15000,
  });

  return result;
};

export const useSessionById = (id) => {
  const result = useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: (query) => {
      // Stop refetching if session is completed
      const session = query.state.data?.session;
      if (session?.status === "completed") {
        return false;
      }
      // Refetch every 15 seconds for active sessions
      return 15000;
    },
    staleTime: 10000, // Consider data fresh for 10 seconds
    refetchOnWindowFocus: false, // Don't refetch when user switches back to tab
    refetchOnReconnect: true, // Only refetch when internet reconnects
    // CRITICAL: Keep previous data while refetching to prevent UI flicker
    placeholderData: (previousData) => previousData,
    // CRITICAL: Use structural sharing to prevent unnecessary re-renders
    // This ensures that if the data hasn't changed, the same object reference is returned
    structuralSharing: (oldData, newData) => {
      // Deep comparison for session object
      if (!oldData || !newData) return newData;
      
      const oldSession = oldData.session;
      const newSession = newData.session;
      
      // If the important fields haven't changed, return old data to maintain reference
      if (
        oldSession?.id === newSession?.id &&
        oldSession?.callId === newSession?.callId &&
        oldSession?.status === newSession?.status &&
        oldSession?.host?.clerkId === newSession?.host?.clerkId &&
        oldSession?.participant?.clerkId === newSession?.participant?.clerkId
      ) {
        return oldData; // Return old reference if nothing important changed
      }
      
      return newData; // Return new data if something changed
    },
  });

  return result;
};

export const useJoinSession = () => {
  const queryClient = useQueryClient();
  
  const result = useMutation({
    mutationKey: ["joinSession"],
    mutationFn: sessionApi.joinSession,
    onSuccess: (data, sessionId) => {
      toast.success("Joined session successfully!😎");
      // Update the specific session cache
      queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to join session"),
  });

  return result;
};

export const useEndSession = () => {
  const queryClient = useQueryClient();
  
  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: sessionApi.endSession,
    onSuccess: (data, sessionId) => {
      toast.success("Session ended successfully!🙃");
      
      // IMPORTANT: Refetch immediately to remove from active sessions
      queryClient.refetchQueries({ queryKey: ["activeSessions"] });
      queryClient.refetchQueries({ queryKey: ["myRecentSessions"] });
      
      // Also update the specific session
      queryClient.setQueryData(["session", sessionId], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          session: {
            ...oldData.session,
            status: "completed"
          }
        };
      });
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to end session"),
  });

  return result;
};