# SHIKAKU PUZZLE BACKEND NODE

1. Clone the repository:
   ```bash 
   git clone https://github.com/Nishtha305/shikaku-game.git
   cd shikaku-game 
2. Install Dependencies:
   ```bash 
   npm install 
3. Start the server
   ```bash 
   node server.js
The server will run at http://localhost:3000

# API Endpoints

1. Initialize Game
- Method: ```POST```
- Endpoint: ```api/games/initialize```
- Body:
   ```bash
   {
    "rows": 5,
    "cols": 5
   }
2. Generate Rectangles
- Method: ```POST```
- Endpoint: ```/api/games/generate-rectangles```
- Body:
   ```bash
   {
    "boardId": 123456789 //boardId will be unique
   }
3. Select Rectangle
- Method: ```POST```
- Endpoint: ```/api/rectangles/select```
- Body:
   ```bash
   {
    "rectangle": { "x": 0, "y": 0, "width": 2, "height": 2 }
   }
4. Snap Rectangle
- Method: ```POST```
- Endpoint: ```/api/rectangles/snap```
- Body:
   ```bash
   {
    "rectangle": { "x": 0, "y": 0, "width": 2, "height": 2 }
   }
5. Check Win Condition
- Method: ```GET```
- Endpoint: ```/api/games/check-win```
- Query Params: ```boardId=123456789```
6. Start Timer
- Method: ```POST```
- Endpoint: ```/api/timer/start```
- Body:
   ```bash
   {
    "boardId": 123456789 //boardId will be unique
   }
7. Track Timer
- Method: ```GET```
- Endpoint: ```/api/timer/track```
- Query Params: ```boardId=123456789``` 
8. End Timer
- Method: ```POST```
- Endpoint: ```/api/timer/end```
- Body:
   ```bash
   {
    "boardId": 123456789 //boardId will be unique
   }
