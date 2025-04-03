const searchY = (
  func: any,
  status: "high" | "medium" | "low",
  targetX: number,
): number | null => {
  const data = func[status];
  if (!data || !data.x.length) return null;

  const { x, y } = data;
  const closestIndex = x.reduce(
    (closest: number, curr: number, i: number) =>
      Math.abs(curr - targetX) < Math.abs(x[closest] - targetX) ? i : closest,
    0,
  );

  return y[closestIndex];
};

export default searchY;
