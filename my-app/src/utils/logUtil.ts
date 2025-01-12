export const logToLocalStorage = (item: string, message: string): void => {
  const logMessage = `[${new Date().toISOString()}] ${message}`;
  // 假设我们将所有日志保存在 `logs` 键下
  const existingLogs = localStorage.getItem(item) || '';
  localStorage.setItem(item, existingLogs + logMessage + '\n');
};


