export const Icons = {
    // Placeholder Logo — replace with your own if needed
    Logo: () => (
      <svg width="100%" height="100%" viewBox="0 0 200 80">
        <text
          x="100"
          y="45"
          textAnchor="middle"
          fontSize="36"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Sand Studio
        </text>
      </svg>
    ),
  
    // ❤️ Love / Command-Key Heart
    Love: () => (
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        <rect width="200" height="200" rx="40" fill="#FF4F73" />
        <path
          d="M100 130c-18-14-30-26-30-42a25 25 0 0 1 50 0 25 25 0 0 1 50 0c0 16-12 28-30 42l-20 15z"
          fill="white"
        />
      </svg>
    ),
  
    // 🔥 Fire Icon
    Fire: () => (
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        <path
          d="M100 20c15 30 40 40 40 80s-30 70-40 70-40-30-40-70 25-50 40-80z"
          fill="#FF7A00"
        />
        <circle cx="100" cy="120" r="28" fill="#FFD27A" />
      </svg>
    ),
  
    // 🌍 Globe With Eyes
    WorldEye: () => (
      <svg width="100%" height="100%" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r="140" fill="#4DA6FF" />
        <circle cx="120" cy="150" r="40" fill="#fff" />
        <circle cx="180" cy="150" r="40" fill="#fff" />
        <circle cx="120" cy="150" r="18" fill="#000" />
        <circle cx="180" cy="150" r="18" fill="#000" />
        <path
          stroke="#003F7D"
          strokeWidth="10"
          fill="none"
          d="M40 150h220M150 40v220
             M70 90c60 40 100 40 160 0
             M70 210c60-40 100-40 160 0"
        />
      </svg>
    ),
  
    // 🐻 Bear (image from Framer)
    Bear: () => (
      <img
        decoding="auto"
        src="https://framerusercontent.com/images/1LceM4gqlLVOzx4KuBZ6gpBnGq4.png"
        alt=""
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    ),
  
    // 💬 Designer Speech Bubble
    Designer: () => (
      <svg width="100%" height="100%" viewBox="0 0 260 120">
        <rect
          x="20"
          y="20"
          width="200"
          height="70"
          rx="20"
          fill="white"
          stroke="#000"
          strokeWidth="6"
        />
        <text
          x="120"
          y="65"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="32"
        >
          Designer
        </text>
        <polygon
          points="60,90 40,120 80,95"
          fill="white"
          stroke="#000"
          strokeWidth="6"
        />
      </svg>
    ),
  
    // ✌️ Peace Sign Hand
    PeaceSign: () => (
      <svg width="100%" height="100%" viewBox="0 0 200 200">
        <path
          d="M80 40v70m40-70v70m-70 0c10 40 40 60 70 60"
          stroke="#A0FF3A"
          strokeWidth="25"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  
    // 🔵 Blue Banner
    Banner: () => (
      <svg width="100%" height="100%" viewBox="0 0 400 150">
        <rect width="400" height="150" rx="75" fill="#2D68FF" />
        <text
          x="200"
          y="70"
          textAnchor="middle"
          fill="white"
          fontWeight="600"
          fontSize="28"
          fontFamily="sans-serif"
        >
          anti-social but
        </text>
        <text
          x="200"
          y="110"
          textAnchor="middle"
          fill="white"
          fontSize="32"
          fontStyle="italic"
          fontFamily="sans-serif"
        >
          user-friendly
        </text>
      </svg>
    ),
  };
  