export function rollDice({
  count = 1,
  sides = 20,
  modifier = 0,
}: {
  count?: number;
  sides?: number;
  modifier?: number;
}): number {
  let total = modifier;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total;
}
