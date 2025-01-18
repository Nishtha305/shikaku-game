const { generateRectangle } = require('../utils/helpers');
const { logger } = require('../utils/logger');

const selectRectangle = async (req, res) => {
  const { rectangle } = req.body;

  if (!rectangle) {
    logger.debug('Require rectangle for selection');
    return res.status(400).json({ error: 'Rectangle data is required' });
  }

  try {
    logger.info('Rectangle Selection');
    res.json({ selectedRectangle: rectangle });
  } catch (error) {
    logger.error(`Error selecting rectangle: ${error.message}`);
    res.status(500).json({ error: 'Failed to select rectangle' });
  }
}

const snapRectangle = async (req, res) => {
  const { rectangle } = req.body;

  if (!rectangle) {
    logger.debug('Require rectangle for snap');
    return res.status(400).json({ error: 'Rectangle data is required' });
  }

  try {
    logger.info('Rectangle snapped and locked');
    res.json({ message: 'Rectangle snapped and locked', rectangle });
  } catch (error) {
    logger.error(`Error snapping rectangle: ${error.message}`);
    res.status(500).json({ error: 'Failed to snap rectangle' });
  }
}

module.exports = { selectRectangle, snapRectangle };
