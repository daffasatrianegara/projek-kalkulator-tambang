import urciParams from "../assets/urci-params/urci.data";

const searchYUrci = (deductVal: number, q: number) => {
  const data = urciParams[q];
  if (!data || data.x.length === 0) return null;

  const { x, y } = data;
  const closestIndex = x.reduce(
    (closest: number, curr: number, i: number) =>
      Math.abs(curr - deductVal) < Math.abs(x[closest] - deductVal) ? i : closest,
    0,
  );

  return y[closestIndex];
};

export default searchYUrci;
