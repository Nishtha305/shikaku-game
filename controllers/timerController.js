const { logger } = require('../utils/logger');
let gameTimers = {};

const startTimer = (req, res) => {
  const { boardId } = req.body;
  if (!boardId) {
    logger.debug('BoardId is required');
    return res.status(400).json({ error: 'boardId is required' });
  }

  try {
    const startTime = Date.now();
    gameTimers[boardId] = startTime;
    res.json({ message: 'Timer started', startTime });
  } catch (error) {
    logger.error(`Error starting timer: ${error.message}`);
    res.status(500).json({ error: 'Failed to start timer' });
  }
}

const trackTime = (req, res) => {
  const { boardId } = req.query;
  if (!boardId) {
    logger.debug('BoardId is required');
    return res.status(400).json({ error: 'boardId is required' });
  }

  if (!gameTimers[boardId]) {
    return res.status(404).json({ error: 'Game not found or timer not started' });
  }

  try {
    const startTime = gameTimers[boardId];
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

    res.json({ elapsedTime });
  } catch (error) {
    logger.error(`Error tracking time: ${error.message}`);
    res.status(500).json({ error: 'Failed to track time' });
  }
}

const endTimer = (req, res) => {
  const { boardId } = req.body;

  if (!boardId) {
    logger.debug('BoardId is required');
    return res.status(400).json({ error: 'boardId is required' });
  }

  if (!gameTimers[boardId]) {
    return res.status(404).json({ error: 'Game not found or timer not started' });
  }

  try {
    const startTime = gameTimers[boardId];
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

    delete gameTimers[boardId];

    res.json({ message: 'Timer stopped', elapsedTime });
  } catch (error) {
    logger.error(`Error stopping timer: ${error.message}`);
    res.status(500).json({ error: 'Failed to stop timer' });
  }
}

module.exports = { startTimer, trackTime, endTimer };
