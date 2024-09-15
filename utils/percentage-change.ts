export function percentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) {
    return newValue; // Avoid division by zero
  }

  const change = newValue - oldValue;
  if (change === 0) {
    return newValue * -1;
  }
  const percentageChange = change / oldValue;
  return percentageChange;
}
