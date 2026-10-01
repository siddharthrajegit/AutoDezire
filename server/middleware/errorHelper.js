/**
 * Shared error response helper.
 * In production, never expose raw error details to the client.
 */
function sendError(res, error, status = 500) {
  const isDev = process.env.NODE_ENV !== 'production';
  console.error('[Route Error]', error.stack || error.message);
  res.status(status).json({
    success: false,
    message: isDev ? (error.message || 'Internal Server Error') : 'An internal error occurred.',
  });
}

module.exports = { sendError };
