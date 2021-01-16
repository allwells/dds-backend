const idGen = () => {
  const max_id =
    drugs.length > 0 ? Math.max(...drugs.map((drug) => drug.serial_number)) : 0;

  return max_id + 1;
};
