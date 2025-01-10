export const logToLocalStorage = (message: string): void => {
  const logMessage = `[${new Date().toISOString()}] ${message}`;
  // 假设我们将所有日志保存在 `logs` 键下
  const existingLogs = localStorage.getItem('logs') || '';
  localStorage.setItem('logs', existingLogs + logMessage + '\n');
};


