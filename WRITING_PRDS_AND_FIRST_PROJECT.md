# Writing PRDs and Your First Project

## 1. How to Write a Real PRD (Product Requirements Document)

A strong PRD is more than a checklist—it’s a living document that aligns everyone on what’s being built, why, how it will be measured, and what success looks like. Here’s how to write one that actually drives results, based on real-world examples like MUTREWARDS:

---

### PRD Template

1. **Executive Summary**
   - What is the product/feature? Who is it for? Why does it matter?
2. **Background & Context**
   - Problem statement, why this project is needed, customer-facing description.
3. **Glossary / Key Terms**
   - Define acronyms and important terms for clarity.
4. **How It Works / User Flows**
   - Core mechanics, user journeys, workflows, and diagrams if helpful.
5. **Levels / Tiers / Segmentation**
   - Describe user levels, tiers, or segmentation if applicable.
6. **Rewards / Benefits**
   - What users get, when, and how (digital, physical, eligibility, cadence).
7. **Technical Workflows**
   - Opt-in/out, reward granting, messaging, and system flows.
8. **Strategy & Goals**
   - Business and product goals, measurable success metrics.
9. **Program Benefits**
   - What this achieves for users and the business.
10. **Engagement & Monetization Analysis**
    - Data or hypotheses about engagement, retention, or revenue impact.
11. **Where Are We At / Going**
    - Launch status, milestones, roadmap, and future plans.
12. **Scope**
    - What is in scope and out of scope (platforms, geographies, channels, etc).
13. **Assumptions, Dependencies, Risks**
    - Anything that could impact delivery or success.
14. **User Stories**
    - User and marketer stories, requirements, and (optionally) mockups.
15. **Reporting & Analytics**
    - Reporting needs, queries, and data flows.
16. **Appendices**
    - Supporting SQL, diagrams, or documentation.

---

### Example: Pong Video Game PRD

Below is a complete example PRD for a simple video game project: "Pong Reimagined." This demonstrates how each section of the template can be filled out in a cohesive, connected way.

---

1. **Executive Summary**

   Pong Reimagined is a modern, browser-based version of the classic Pong game. The goal is to create a fun, accessible two-player game with smooth controls, simple graphics, and a few new twists (power-ups, score tracking). This project is ideal for learning basic game development, user input handling, and browser deployment.

2. **Background & Context**

   Pong is one of the earliest and most iconic video games. Rebuilding Pong as a web game provides an approachable way for beginners to learn about game loops, collision detection, and UI, while offering a nostalgic experience for players. The project will be used as a teaching tool in coding workshops and as a portfolio piece for new developers.

3. **Glossary / Key Terms**

   - **Paddle:** The player-controlled bar that hits the ball.
   - **Ball:** The object bounced between paddles.
   - **Power-up:** Temporary effect that changes gameplay (e.g., speed boost).
   - **Game Loop:** The main cycle that updates game state and renders frames.
   - **Collision Detection:** Logic for determining when the ball hits a paddle or wall.

4. **How It Works / User Flows**

   - Users open the game in their browser.
   - Each player controls a paddle (Player 1: W/S, Player 2: Up/Down).
   - The ball bounces between paddles; missing the ball gives a point to the opponent.
   - First to 10 points wins. Power-ups appear randomly.
   - Players can restart the game or return to the main menu.

5. **Levels / Tiers / Segmentation**

   - **Normal Mode:** Classic Pong rules.
   - **Power-Up Mode:** Adds random power-ups (e.g., larger paddle, multi-ball).
   - **Single Player:** Play against a basic AI (optional stretch goal).

6. **Rewards / Benefits**

   - Display winner/loser at end of match.
   - Track high scores in browser local storage.
   - Unlock fun paddle skins after 5 wins (cosmetic only).

7. **Technical Workflows**

   - **Game Start:** Initialize game state, draw paddles, ball, and score.
   - **Input Handling:** Listen for keyboard events to move paddles.
   - **Game Loop:** Update ball position, check collisions, update score, render frame (using `requestAnimationFrame`).
   - **Power-Up Logic:** Randomly spawn power-ups, apply effects, revert after timer.
   - **Restart/Game Over:** Reset state, show winner, allow replay.

8. **Strategy & Goals**

   - Teach basic game dev concepts to beginners.
   - Complete a playable MVP in under 2 weeks.
   - Deploy game online for easy sharing and feedback.

9. **Program Benefits**

   - Provides a hands-on learning project for new coders.
   - Fun, quick game for anyone to play and share.
   - Demo piece for coding portfolios and workshops.

10. **Engagement & Monetization Analysis**

   - Engagement measured by number of plays and high scores saved.
   - No monetization planned (educational/open-source project).
   - Potential future: add leaderboard and social sharing for more engagement.

11. **Where Are We At / Going**

   - Core gameplay prototype complete (classic mode).
   - Next: Add power-ups and high score tracking.
   - Future: Single-player AI, mobile controls, sound effects.

12. **Scope**

   - **In Scope:** Two-player local play, power-ups, score tracking, basic UI, browser deployment.
   - **Out of Scope:** Online multiplayer, in-app purchases, advanced graphics, mobile app.

13. **Assumptions, Dependencies, Risks**

   - Assumes basic HTML5/JS/CSS support in browser.
   - Depends on reliable keyboard input and local storage APIs.
   - Risks: Feature creep (keep MVP simple), browser compatibility issues.

14. **User Stories**

   - As a player, I want to control a paddle with my keyboard so I can play against a friend.
   - As a player, I want to see the score and know when someone wins.
   - As a player, I want power-ups to appear to make the game more exciting.
   - As a player, I want to restart the game without refreshing the page.
   - As a player, I want to unlock new paddle skins as a reward for winning.

15. **Reporting & Analytics**

   - Track number of games played and high scores using browser local storage.
   - (Optional) Add Google Analytics for page views and engagement.

16. **Appendices**

   - Sample pseudocode for game loop:
     ```javascript
     function gameLoop() {
       updateGameState();
       render();
       requestAnimationFrame(gameLoop);
     }
     ```
   - Wireframe diagram of game screen layout (see attached PNG).

---

MUT Rewards is an evergreen Loyalty and Rewards program for Madden NFL Ultimate Team players. Players register via the web, progress through levels by opening packs, and receive digital and physical rewards. The program is designed to increase engagement, retention, and monetization for the franchise.

**Glossary:**  
- **MUT:** Madden Ultimate Team  
- **Coins:** In-game currency earned by playing  
- **Packs:** Digital items containing player cards  
- **Levels:** Rookie, Pro, All-Pro, Legendary

**How It Works:**  
Players register at mutrewards.com, link their EA account, and progress through reward levels by opening packs. Rewards are distributed monthly, with special activations throughout the year.

**Strategy/Goals:**  
- Increase engagement (measured by logins)  
- Increase conversion to spenders  
- Improve retention

**User Story Example:**  
_As a user, I want to register my Madden NFL Mobile account to receive rewards across platforms._

---

### Why This Level of Detail Matters

A real PRD is a tool for communication and alignment. It:
- Makes sure everyone (devs, PMs, designers, execs) is on the same page
- Clarifies the “why” behind every requirement
- Surfaces risks and dependencies early
- Provides clear metrics for success
- Enables new team members to get up to speed quickly

If you want a fill-in-the-blanks template or want to see a full sample PRD, check out the MUTREWARDS PRD or ask for a detailed example!

---

## 2. Fun Exercises

### Exercise 1: Publish a Lightweight Web Game

1. Use Windsurf to create a new project (e.g., a simple HTML/JS game like “Click the Blob”).
2. Push your code to Git.
3. Deploy your game using Windsurf’s deploy feature.
4. Share your game link with the group!

### Exercise 2: Iterate on Art/Animations

1. Fork a friend’s game or project.
2. Replace the art assets (images, sprites, backgrounds) with your own.
3. Commit and push your changes.
4. Demo the new look to the group!
