function sleepSync(milliseconds) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < milliseconds) {
    // 进行空循环，阻塞线程
  }
}