export function isPresentId(sourceArray, findId) {
  return sourceArray?.find((value) => value?.id === findId);
}
