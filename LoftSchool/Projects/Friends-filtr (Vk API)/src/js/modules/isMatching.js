function isMatching (full, chunk) {
  return (new RegExp(chunk, 'i')).test(full);
}

export { isMatching };
