export const chatsData = [
  {
    id: 1,
    username: "Sarah_Love",
    userAvatar: "/assets/default-profile.jpg",
    lastMessage: "Hey! That sunset photo was absolutely beautiful! 😍",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unreadCount: 3,
    isOnline: true,
    messages: [
      {
        id: 1,
        senderId: 2, // them
        receiverId: 1, // me
        content: "Hi there! I saw your post about sunsets, absolutely gorgeous! 🌅",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isRead: true,
        isSent: true
      },
      {
        id: 2,
        senderId: 1, // me
        receiverId: 2, // them
        content: "Thank you so much! I love capturing those peaceful moments. Do you enjoy photography too?",
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        isRead: true,
        isSent: true
      },
      {
        id: 3,
        senderId: 2, // them
        receiverId: 1, // me
        content: "I do! Though I'm more of a beginner. Would love to learn from someone with your eye for beauty ✨",
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
        isRead: true,
        isSent: true
      },
      {
        id: 4,
        senderId: 1, // me
        receiverId: 2, // them
        content: "I'd love to share some tips! Maybe we could go on a photo walk together sometime? 📸",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        isRead: true,
        isSent: true
      },
      {
        id: 5,
        senderId: 2, // them
        receiverId: 1, // me
        content: "That sounds amazing! I know this perfect spot by the lake 🏞️",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        isRead: false,
        isSent: true
      },
      {
        id: 6,
        senderId: 2, // them
        receiverId: 1, // me
        content: "Hey! That sunset photo was absolutely beautiful! 😍",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isRead: false,
        isSent: true
      },
      {
        id: 7,
        senderId: 2, // them
        receiverId: 1, // me
        content: "Are you free this weekend? 💕",
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
        isRead: false,
        isSent: true
      }
    ]
  },
  {
    id: 2,
    username: "Mike_Adventure",
    userAvatar: "/assets/default-profile.jpg",
    lastMessage: "That adventure looked incredible! Count me in next time 🎒",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    unreadCount: 1,
    isOnline: false,
    messages: [
      {
        id: 1,
        senderId: 3, // them
        receiverId: 1, // me
        content: "Your adventure posts always inspire me! Where was that amazing hiking spot?",
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        isRead: true,
        isSent: true
      },
      {
        id: 2,
        senderId: 1, // me
        receiverId: 3, // them
        content: "It's a hidden gem about 2 hours from the city! The view from the top is absolutely worth the climb 🏔️",
        timestamp: new Date(Date.now() - 1000 * 60 * 90),
        isRead: true,
        isSent: true
      },
      {
        id: 3,
        senderId: 3, // them
        receiverId: 1, // me
        content: "That adventure looked incredible! Count me in next time 🎒",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        isRead: false,
        isSent: true
      }
    ]
  },
  {
    id: 3,
    username: "Emma_Wanderlust",
    userAvatar: "/assets/default-profile.jpg",
    lastMessage: "Coffee tomorrow? I'd love to hear about your travels ☕",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 1,
        senderId: 4, // them
        receiverId: 1, // me
        content: "I loved your post about finding the perfect travel buddy! 🗺️",
        timestamp: new Date(Date.now() - 1000 * 60 * 180),
        isRead: true,
        isSent: true
      },
      {
        id: 2,
        senderId: 1, // me
        receiverId: 4, // them
        content: "Thank you! Are you into traveling too? I'm always looking for fellow wanderers 😊",
        timestamp: new Date(Date.now() - 1000 * 60 * 150),
        isRead: true,
        isSent: true
      },
      {
        id: 3,
        senderId: 4, // them
        receiverId: 1, // me
        content: "Absolutely! I've been to 15 countries so far. Maybe we could share some travel stories?",
        timestamp: new Date(Date.now() - 1000 * 60 * 140),
        isRead: true,
        isSent: true
      },
      {
        id: 4,
        senderId: 4, // them
        receiverId: 1, // me
        content: "Coffee tomorrow? I'd love to hear about your travels ☕",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isRead: true,
        isSent: true
      }
    ]
  },
  {
    id: 4,
    username: "Alex_Photographer",
    userAvatar: "/assets/default-profile.jpg",
    lastMessage: "Your composition skills are getting better! Keep it up 📸",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: 1,
        senderId: 5, // them
        receiverId: 1, // me
        content: "I saw your latest photography work. The lighting is incredible!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        isRead: true,
        isSent: true
      },
      {
        id: 2,
        senderId: 1, // me
        receiverId: 5, // them
        content: "Thanks Alex! I've been practicing the techniques you taught me. Really appreciate your guidance 🙏",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7),
        isRead: true,
        isSent: true
      },
      {
        id: 3,
        senderId: 5, // them
        receiverId: 1, // me
        content: "Your composition skills are getting better! Keep it up 📸",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        isRead: true,
        isSent: true
      }
    ]
  },
  {
    id: 5,
    username: "Luna_Dreamer",
    userAvatar: "/assets/default-profile.jpg",
    lastMessage: "Those quiet moments you shared really resonated with me 🌙",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: 1,
        senderId: 6, // them
        receiverId: 1, // me
        content: "I really connected with your post about appreciating quiet moments. It's rare to find someone who values peace like that 🌙",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
        isRead: true,
        isSent: true
      },
      {
        id: 2,
        senderId: 1, // me
        receiverId: 6, // them
        content: "I'm so glad it resonated with you! There's something magical about stillness in our busy world. Do you have a favorite quiet spot?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5),
        isRead: true,
        isSent: true
      },
      {
        id: 3,
        senderId: 6, // them
        receiverId: 1, // me
        content: "Those quiet moments you shared really resonated with me 🌙",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        isRead: false,
        isSent: true
      },
      {
        id: 4,
        senderId: 6, // them
        receiverId: 1, // me
        content: "I have this little garden where I like to read and reflect. Maybe you'd like to see it sometime? 🌸",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23.5),
        isRead: false,
        isSent: true
      }
    ]
  },
  {
    id: 6,
    username: "David_Explorer",
    userAvatar: "/assets/default-profile.jpg",
    lastMessage: "Good morning! Ready for another day of possibilities? ✨",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: 1,
        senderId: 7, // them
        receiverId: 1, // me
        content: "Your positive energy is contagious! I love how you approach each day with such optimism 🌟",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        isRead: true,
        isSent: true
      },
      {
        id: 2,
        senderId: 1, // me
        receiverId: 7, // them
        content: "Thank you! I believe every day is a gift and a chance to make meaningful connections. Your explorer spirit is equally inspiring!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.5),
        isRead: true,
        isSent: true
      },
      {
        id: 3,
        senderId: 7, // them
        receiverId: 1, // me
        content: "Good morning! Ready for another day of possibilities? ✨",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        isRead: true,
        isSent: true
      }
    ]
  }
];

export const currentUserId = 1; // For identifying our messages vs theirs
