export async function delay(time: number = 100) {
  return new Promise((resolve) => {
    const timeout = setTimeout(resolve, time);
  });
}
