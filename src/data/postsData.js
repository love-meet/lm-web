export const postsData = [
  {
    id: 1,
    username: "Sarah_Love",
    badge: "Nirvana",
    userAvatar: "/assets/default-profile.jpg",
    images: ["/gallery/DSC_7975.jpeg"],
    content: "Beautiful sunset today! Feeling grateful for these peaceful moments. There's something magical about watching the sun set over the horizon, and I can't help but think how much better it would be to share these moments with someone special. 🌅✨",
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    likes: 24,
    comments: [
      {
        id: 1,
        username: "Mike_Adventure",
        userAvatar: "/assets/default-profile.jpg",
        content: "Absolutely stunning! The colors are incredible 😍",
        timestamp: new Date(Date.now() - 1000 * 60 * 1),
        likes: 3,
        replies: [
          {
            id: 1,
            username: "Sarah_Love",
            userAvatar: "/assets/default-profile.jpg",
            content: "Thank you! It was even more beautiful in person ❤️",
            timestamp: new Date(Date.now() - 1000 * 30),
            likes: 1
          }
        ]
      },
      {
        id: 2,
        username: "Emma_Wanderlust", 
        userAvatar: "/assets/default-profile.jpg",
        content: "This is why I love photography - capturing these perfect moments!",
        timestamp: new Date(Date.now() - 1000 * 60 * 1),
        likes: 2,
        replies: []
      }
    ]
  },
  {
    id: 2,
    username: "Mike_Adventure",
    badge: "Utopia", 
    userAvatar: "/assets/default-profile.jpg",
    images: ["/gallery/DSC_9900.jpeg", "/gallery/IMG-20230504-WA0025.jpg", "/gallery/FB_IMG_1702736841815_1.jpg"],
    content: "Weekend adventure with amazing friends! Life is so much better when shared with someone special. These are the moments that make life worth living - exploring new places, trying new things, and creating memories that will last forever. 💕",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    likes: 156,
    comments: [
      {
        id: 1,
        username: "Luna_Dreamer",
        userAvatar: "/assets/default-profile.jpg",
        content: "Your adventures always look so amazing! Wish I could join you sometime 🌟",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        likes: 8,
        replies: [
          {
            id: 1,
            username: "Mike_Adventure",
            userAvatar: "/assets/default-profile.jpg",
            content: "You're always welcome to join! Let's plan something soon 🎒",
            timestamp: new Date(Date.now() - 1000 * 60 * 8),
            likes: 5
          },
          {
            id: 2,
            username: "Alex_Photographer",
            userAvatar: "/assets/default-profile.jpg",
            content: "Count me in too! I can document the whole adventure 📸",
            timestamp: new Date(Date.now() - 1000 * 60 * 7),
            likes: 3
          }
        ]
      },
      {
        id: 2,
        username: "David_Explorer",
        userAvatar: "/assets/default-profile.jpg",
        content: "This looks like the perfect weekend! Where is this place?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        likes: 4,
        replies: []
      }
    ]
  },
  {
    id: 3,
    username: "Emma_Wanderlust",
    badge: "Paradise",
    userAvatar: "/assets/default-profile.jpg", 
    images: ["/gallery/FB_IMG_1702736841815_1.jpg"],
    content: "Exploring new places and making memories. Who wants to join me on my next adventure? There's a whole world out there waiting to be discovered, and I believe the best adventures are the ones shared with someone you care about. 🗺️",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 89,
    comments: [
      {
        id: 1,
        username: "Sarah_Love",
        userAvatar: "/assets/default-profile.jpg",
        content: "I'm always up for an adventure! Where are you thinking of going next?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        likes: 6,
        replies: [
          {
            id: 1,
            username: "Emma_Wanderlust",
            userAvatar: "/assets/default-profile.jpg",
            content: "I was thinking about that mountain trail we talked about! 🏔️",
            timestamp: new Date(Date.now() - 1000 * 60 * 45),
            likes: 2
          }
        ]
      }
    ]
  },
  {
    id: 4,
    username: "Alex_Photographer",
    badge: "Oasis",
    userAvatar: "/assets/default-profile.jpg",
    images: ["/gallery/IMG-20241027-WA0044.jpg", "/gallery/photo_2024-12-05_00-48-44.jpg"],
    content: "Captured this perfect moment today. Photography helps me see the beauty in everything around us. Sometimes the most beautiful shots come from the most unexpected moments - just like how love can find us when we least expect it. 📸",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    likes: 67,
    comments: [
      {
        id: 1,
        username: "Luna_Dreamer",
        userAvatar: "/assets/default-profile.jpg",
        content: "Your photography skills are incredible! This composition is perfect 🎨",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        likes: 12,
        replies: []
      },
      {
        id: 2,
        username: "Mike_Adventure",
        userAvatar: "/assets/default-profile.jpg",
        content: "You have such a great eye for detail! Keep sharing these amazing shots",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        likes: 7,
        replies: [
          {
            id: 1,
            username: "Alex_Photographer",
            userAvatar: "/assets/default-profile.jpg",
            content: "Thanks Mike! Your adventures always give me great photo opportunities 📷",
            timestamp: new Date(Date.now() - 1000 * 60 * 60),
            likes: 4
          }
        ]
      }
    ]
  },
  {
    id: 5,
    username: "Luna_Dreamer",
    badge: "Orchard",
    userAvatar: "/assets/default-profile.jpg",
    images: ["/gallery/IMG_20240117_150001_111_optimized_100.webp"],
    content: "Sometimes the best moments are the quiet ones. Looking for someone to share these peaceful times with. I find that in our busy world, we often forget to appreciate the simple things - a quiet evening, a good book, or just watching the stars. 🌙",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    likes: 143,
    comments: [
      {
        id: 1,
        username: "David_Explorer",
        userAvatar: "/assets/default-profile.jpg",
        content: "Such a peaceful vibe! Sometimes quiet moments are the most meaningful ones ✨",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20),
        likes: 15,
        replies: [
          {
            id: 1,
            username: "Luna_Dreamer",
            userAvatar: "/assets/default-profile.jpg",
            content: "Exactly! The quiet moments help us appreciate the loud ones even more 💫",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18),
            likes: 8
          }
        ]
      },
      {
        id: 2,
        username: "Sarah_Love",
        userAvatar: "/assets/default-profile.jpg",
        content: "I completely understand this feeling. There's beauty in stillness 🕊️",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15),
        likes: 11,
        replies: []
      }
    ]
  },
  {
    id: 6,
    username: "David_Explorer",
    badge: "Blossom",
    userAvatar: "/assets/default-profile.jpg",
    images: ["/gallery/photo_2024-12-05_00-48-44.jpg"],
    content: "New day, new possibilities! Ready to make some amazing connections today. Every sunrise brings a fresh start and new opportunities to meet incredible people. Life is an adventure best shared with others who understand your dreams. 🌟",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago 
    likes: 91,
    comments: [
      {
        id: 1,
        username: "Emma_Wanderlust",
        userAvatar: "/assets/default-profile.jpg",
        content: "Love this positive energy! You always know how to start the day right 🌅",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        likes: 9,
        replies: [
          {
            id: 1,
            username: "David_Explorer",
            userAvatar: "/assets/default-profile.jpg",
            content: "Thanks Emma! Positivity is contagious, let's spread it around 😊",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30),
            likes: 6
          }
        ]
      }
    ]
  }
];
