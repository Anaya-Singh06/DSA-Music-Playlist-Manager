# 🎵 Music Playlist Manager (DSA Project)

A Web-based Music Player implementing a **Circular Doubly Linked List** optimized with **Square Root Decomposition** (The "Express Lane" Algorithm).

## The Problem
In a standard Doubly Linked List (DLL), random access is slow. To skip from Song #1 to Song #5000, the system must traverse `next` pointers 4,999 times. This results in **O(n)** time complexity, which causes lag in large playlists or embedded systems.

## The Solution: Square Root Decomposition
We optimized the DLL by adding a secondary pointer (`skipPointer`) to specific nodes.
- **k (Skip Interval):** We calculate `k = √n` (Square root of total songs).
- **The "Express Lane":** Every k-th node holds a pointer to the node `k` steps ahead.

### Algorithmic Comparison
| Feature | Standard Linked List | Our Optimized List |
| :--- | :--- | :--- |
| **Search/Skip Time** | O(n) - Linear | **O(√n) - Faster** |
| **Insertion Time** | O(1) | O(n) (Pointer Rebuild) |
| **Ideal Use Case** | Small Data | **Media Players & large lists** |

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3 (Spotify Theme)
- **Logic:** Vanilla JavaScript (ES6 Classes)
- **Data Structure:** Custom `SongNode` and `Playlist` classes.

## Project Structure
- `index.html` - The main user interface.
- `js/dsa/SongNode.js` - The Node structure containing `next`, `prev`, and `skipPointer`.
- `js/dsa/Playlist.js` - Contains the **O(√n)** logic and `jumpToIndex` algorithm.
- `js/main.js` - Handles UI events and DOM manipulation.

## 🧪 How to Test the Optimization
1. Open the project in a browser.
2. Add 16 songs (or use the default load).
3. The system calculates `k = √16 = 4`.
4. Look for the **Green Badge** ("Express Lane -> #5") on the song cards.
5. Enter index `13` and click **Jump to Index**.
6. Check the **Operation Log** at the bottom to see the algorithm take "Express Jumps" instead of single steps.

## 👨‍💻 Team
- Anaya Singh
- Sanjith Venkat
- Sudiksha Kathuria
