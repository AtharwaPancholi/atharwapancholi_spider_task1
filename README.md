1. # Hammer Strength Game 🎯

A fun two-player reflex-based hammer strength game built with **HTML**, **CSS**, and **vanilla JavaScript** — no canvas or external libraries required!

## 🔧 How to Play

1. The needle swings continuously between -90° and +90°.
2. Press **"HIT!"** to stop the needle. The closer the needle is to 0°, the higher your score!
3. Each player gets one turn. After both have played, the winner is announced.
4. Click **"Start Again"** to reset and try again.

## 🧠 Scoring Logic

- Score is calculated as:  
  `Score = 100 - (|angle| * 100 / 90)`
- Maximum score: 100 (perfect center hit).

## 📂 Project Structure

├── index.html # Main HTML structure
├── style.css # Styling and layout
├── script.js # Game logic and animations
└── images/
├── Hammer.png # Hammer graphic
└── Machine.png # Strength testing machine graphic

## 💻 Setup & Usage

1. Clone or download the project files.
2. Make sure your directory looks like this:

/project-folder
│
├── index.html
├── style.css
├── script.js
└── images/
├── Hammer.png
└── Machine.png


3. Open `index.html` in any modern browser and start playing!

## 📱 Responsive

This game is responsive and playable on mobile, tablet, and desktop devices.

## ✨ Features

- Two-player turn-based gameplay
- Animated swinging needle and hammer
- Simple, clean UI
- Winner/tie announcement
- Smooth transitions

## 📸 Preview

> Add a screenshot here if needed!

---

**Enjoy smashing high scores! 💪**

2. # 🧠 Computer Networking - Packet Capture Analysis

This document analyzes network traffic captured from a pcap (packet capture) file. The analysis includes identification of traffic types, DNS behavior, file access patterns, and indications of data obfuscation.

## 📋 Overview

The capture includes a mix of protocols and file requests that are analyzed to uncover hidden or suspicious activities, such as:

- Encoded content in `.txt` files
- Use of decoy files
- Non-standard ports

## 🔍 Key Findings

### 1. **Types of Traffic Present**
- **DNS**: Multiple domain lookups
- **HTTP/HTTPS**: File requests and web communication
- **TCP**: Handshakes and transfers
- **mDNS**: Local network service discovery

### 2. **DNS Activity**
- **Total DNS Queries**: 764
- **Query Types**: A, AAAA, HTTPS, PTR, CNAME, SOA

### 3. **File Requests**
- **Requested `.txt` Files**:
  - `/decoy2.txt` (Packet 180)
  - `/encoded.txt` (Packet 207)
  - `/decoy1.txt` (Packet 752)

- `/encoded.txt` contains **Base64-encoded** content.

### 4. **Loopback Interface**
- Traffic largely occurred over `127.0.0.1` ↔ `127.0.0.53`, indicating internal (local host) communication.

### 5. **Obfuscation and Decoys**
- Decoy files were likely used to mislead analysis.
- Real content was hidden in `/encoded.txt`.

### 6. **Uncommon Ports**
- **Port 8000**: Non-standard HTTP service (unusual compared to port 80/443).
- **Port 53**: DNS (standard).

### 7. **HTTP GET Requests**
- Three main requests observed:
  - `GET /decoy2.txt`
  - `GET /encoded.txt`
  - `GET /decoy1.txt`

## 📁 File Details

- **Document**: `Computer Networking.pdf`
- **Content**: Questions and answers related to pcap analysis

## 🛠️ Tools You Might Use

- Wireshark or tshark for packet inspection
- Base64 decoder for content extraction

---

> ⚠️ This analysis assumes access to the full pcap file for validation and deeper inspection.

3. # ☕ Coffee House Website – UI/UX Design

This project is a conceptual **UI/UX design** for a modern Coffee House website, featuring visually rich sections for products, testimonials, ordering, and promotions. It is designed to provide a seamless user experience across desktops and mobile devices.

## 🎯 Project Purpose

To create an elegant and engaging online presence for a coffee house that showcases its offerings, attracts customers, and facilitates orders.

## 🖼️ Key Pages & Sections

### 🔹 **Homepage**
- Hero message: "We serve the richest Coffee in the city!"
- Navigation: Home, Coffee, Bakery, Shop, Login
- Call-to-Action: **Order Now**

### 🔹 **Menu Highlights**
- **Hot & Cold Coffees**: Cappuccino, Dark Frappe, Iced Latte, Cold Coffee (₹200–₹400)
- **Desserts**: Cupcake, Cheesecake, Ice-cream, Falooda (₹200 each)
- Clear **"Order Now"** buttons under each item

### 🔹 **Product Showcase**
- Encourages users to explore premium **coffee beans**

### 🔹 **Customer Testimonials**
- Testimonials from diverse personas like entrepreneurs and actors
- Repeating "Lorem ipsum" used as placeholder for real feedback

### 🔹 **Promotions & Subscriptions**
- **15% off** offer for newsletter subscription
- Email input field with a **Subscribe** CTA

### 🔹 **Footer Links**
- Navigation: Plans & Pricing, Shop, Sell Your Products, Our Story, etc.
- Policies: Cookies, Privacy Policy, Terms of Use

## 💡 Design Goals

- Clean and modern layout
- Emphasis on visuals and CTAs
- Mobile responsiveness considered
- Consistent UI language

## 📂 File Info

- **File**: `UIUX- Coffee House Website.pdf`
- **Type**: Wireframe / UI mockup
- **Content**: Textual representation of web design components

## 🚀 Future Enhancements (Optional)

- Convert design to HTML/CSS prototype
- Add interactivity using JavaScript or a framework like React
- Integrate with an order management backend

---

> Crafted for coffee lovers, designed for digital delight ☕✨



Domain Specific Task(App dev)
# 🟡🔴 Disc Battle 4

A fast-paced, two-player web-based disc-dropping strategy game inspired by Connect Four, but with **twists** like **column blocking**, **power-ups**, and **timed turns**. Perfect for casual competition and intense battles of wit and speed.

## 🎮 Gameplay Features

- 🎯 **Turn-Based Disc Drop**: Drop discs in a 7×6 grid, aiming to connect four in a row.
- 🚫 **Column Blocking**: After every turn, the opponent gets to block one column.
- ⏱️ **Countdown Timer**: Each player has 120 seconds total. Running out means losing!
- 💥 **Power-Ups**:
  - ⏳ Add 5 seconds to your timer (2 uses per player)
  - 🛡️ Block Immunity lets you play in a blocked column (2 uses per player)
- 🔈 **Sound Effects**: Toggle disc drop, win, and power-up sounds.
- 🌗 **Dark Mode**: Toggle between light and dark themes.
- 🏆 **Leaderboard**: Tracks wins per player using local storage.

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript (Vanilla)
- Audio assets (WAV/MP3)

## 📁 File Structure

disc-battle-4/
├── index.html # Game UI layout
├── style.css # Styling and themes
├── script.js # Game logic
Sounds/
   ├── DiscDrop Sound.wav # Sound when dropping a disc
   ├── Victory Sound.mp3 # Sound when a player wins
   ├── powerupSound.mp3 # Sound when a power-up is used
└── README.md # This file


## 🖥️ How to Run

1. Download or clone the repository.
2. Open `index.html` in any modern browser.
3. Play locally — no server or internet connection required.

## 🔧 Features You Can Add

- 🎨 Animations for dropping discs
- 🧠 AI opponent for solo mode
- 📊 Win history or session stats
- 🌐 Multiplayer over network (WebSocket)

## 📸 Screenshots (optional)

> Add screenshots or a GIF demo if needed:
> - Game board in action
> - Power-up being used
> - Win screen

## 📦 Credits

- Designed & Developed by Atharwa Pancholi
- Sounds: Royalty-free assets or self-created

## 📄 License

This project is licensed under the MIT License. Feel free to use and modify!

---



