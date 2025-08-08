
# Student Learning App – ThinkScholars-Education-Website

This project is a **modular, adaptive learning platform** built to assist students in mastering academic subjects through interactive quizzes, immediate feedback, and performance-based insights.

## 💡 Project Features

- Subject-wise learning: English, Math, Science, Computer
- Level-based Quizzes: Basic, Intermediate, Advanced
- Real-time feedback using Relay webhook integration
- PDF generation for weak topic summaries
- Tab-based UI for easy navigation
- JSON-based question management (modular & scalable)

## 🛠️ Tech Stack

- HTML, CSS, JavaScript
- Python (for local server)
- JSON (for storing question banks)
- Relay.app (Webhook Integration for feedback processing)

## 🚀 Getting Started

### Prerequisites

To run the project on your local system, you need a local HTTP server (like Python’s simple server).

### Steps to Run

1. **Clone or Download** the repository.
2. Open terminal in the project root folder.
3. Run a local server using Python:

```bash
python -m http.server 8000
```

4. Open a browser and go to:

```
http://localhost:8000/index.html
```

You can change `english.html` to `maths.html`, `science.html`, etc., to test other subjects.

### Note:

This step is **necessary** because JSON file fetching requires HTTP protocol and will not work via direct file opening.

## 🔄 Prediction Flow of AI

1. **User Takes Quiz**
2. **Relay Receives Data**
3. **Weak Topics Identified**
4. **PDF Generated**
5. **User Reviews**
6. **Improved Practice**

## 🧠 Future Scope

- 📊 Personalized student dashboards
- 🎮 Gamification (badges, XP, streaks)
- 🛠 Admin Panel for content management
- 📈 Progress tracking & trend analysis

## ✅ Conclusion

This app simplifies learning by:
- Giving fast and focused feedback
- Adapting to different subjects and levels
- Growing with students and their pace

---

Built by The Matrix with 💙 for IBM SkillsBuild Project 2025.

## The Members
1. Akshay Sharma
2. Arijit Dey
3. Sanjana Verma
4. Nisha Shaw 
5. Ritwika Banik 
6. Moumita Bapari
7. Ashis Paul 
