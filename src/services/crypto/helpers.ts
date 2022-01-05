export function getCryptEnv() {
  if (
    !("REACT_APP_ALGORITHM" in process.env) &&
    !("REACT_APP_ITERATION" in process.env) &&
    !("REACT_APP_KEY_LEN" in process.env) &&
    !("REACT_APP_DIGEST" in process.env)
  ) {
    return new Error("Incorrect ENV.");
  } else {
    const Algorithm = process.env.REACT_APP_ALGORITHM as string;
    const Digest = process.env.REACT_APP_DIGEST as string;
    const KeyLen = Number(process.env.REACT_APP_KEY_LEN) as number;
    const Iteration = Number(process.env.REACT_APP_ITERATION) as number;

    return {
      Algorithm,
      Digest,
      KeyLen,
      Iteration,
    };
  }
}
