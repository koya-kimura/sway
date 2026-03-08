export const wrapWithBuffer = (
  length: number,
  value: number,
  bufferRatio: number = 0.5,
): number => {
  const safeLength = Math.max(1, length);
  const safeBuffer = Math.max(0, bufferRatio);
  const start = -safeLength * safeBuffer;
  const span = safeLength * (1 + safeBuffer * 2);
  const wrapped = ((value - start) % span + span) % span;
  return start + wrapped;
};
