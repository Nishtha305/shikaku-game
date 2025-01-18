const { MongoClient } = require('mongodb');
const { createBoard, generateRectangle, checkWinCondition } = require('../utils/helpers');
const { logger} = require('../utils/logger');

const uri = "mongodb://localhost:27017/";
const dbName = "shikaku";
const collectionName = "games";

const initializeGame = async (req, res) => {
  const { rows, cols } = req.body;
  if (!rows || !cols) {
    return res.status(400).json({ error: 'Rows and columns are required' });
  }

  const board = createBoard(rows, cols);
  const boardId = new Date().getTime();
  const client = new MongoClient(uri);
  try {
    logger.info('Initializing the board');
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection(collectionName).insertOne({ boardId, board });
    
    if (!result.acknowledged) {
      throw new Error('Failed to insert game into database');
    }
    res.json({ boardId, board });
  } catch (error) {
    logger.error(`Error initializing game: ${error.message}`);
    res.status(500).json({ error: 'Failed to initialize the game' });
  } finally {
    await client.close();
  }
}

const generateRectangles = async (req, res) => {
  const { boardId } = req.body;
  if (!boardId) {
    return res.status(400).json({ error: 'Board ID is required' });
  }
  const client = new MongoClient(uri);
  try {
    logger.info('Generating Rectangles');
    await client.connect();
    const db = client.db(dbName);
    const game = await db.collection(collectionName).findOne({ boardId });

    if (!game) {
      logger.debug('Game not found');
      return res.status(404).json({ error: 'Game not found' });
    }

    const board = game.board;
    const rectangles = [];
    for (let i = 0; i < 5; i++) {
      const rect = generateRectangle(board, board.length, board[0].length);
      rectangles.push(rect);
    }

    res.json({ rectangles });
  } catch (error) {
    logger.error(`Error generating rectangles: ${error.message}`);
    res.status(500).json({ error: 'Failed to generate rectangles' });
  } finally {
    await client.close();
  }
}

const checkWin = async (req, res) => {
  const { boardId } = req.query;
  if (!boardId) {
    logger.debug('Board ID is required');
    return res.status(400).json({ error: 'Board ID is required' });
  }

  const client = new MongoClient(uri);
  try {
    logger.info('Checking the win status');
    await client.connect();
    const db = client.db(dbName);

    const game = await db.collection(collectionName).findOne({ boardId: parseInt(boardId) });
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    const board = game.board;
    const isWin = checkWinCondition(board);
    res.json({ isWin, message: isWin ? 'You win!' : 'Keep trying!' });
  } catch (error) {
    logger.error(`Error checking win condition: ${error.message}`);
    res.status(500).json({ error: 'Failed to check win condition' });
  } finally {
    await client.close();
  }
}

module.exports = {
  initializeGame,
  generateRectangles,
  checkWin,
};
