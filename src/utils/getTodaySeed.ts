import seedrandom from "seedrandom";
const getTodaySeed = () => {
  
  const prandom = Math.random() * (1098 - 119) + 119;
  const random = seedrandom(prandom.toLocaleString("en-CA"))();

  return random;
};

export default getTodaySeed;
