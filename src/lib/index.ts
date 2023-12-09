import { getSolutionA as day1a } from "./01/01.a";
import { getSolutionB as day1b } from "./01/01.b";
import { getSolutionA as day2a } from "./02/02.a";
import { getSolutionB as day2b } from "./02/02.b";
import { getSolutionA as day3a } from "./03/03.a";
import { getSolutionB as day3b } from "./03/03.b";
import { getSolutionA as day4a } from "./04/04.a";
import { getSolutionB as day4b } from "./04/04.b";
import { getSolutionA as day5a } from "./05/05.a";
import { getSolutionB as day5b } from "./05/05.b";
import { getSolutionA as day6a } from "./06/06.a";
import { getSolutionA as day7a } from "./07/07.a";
import { getSolutionA as day8a } from "./08/08.a";
import { getSolutionA as day9a } from "./09/09.a";

const solutions: Record<string, any> = {
  day1a,
  day1b,
  day2a,
  day2b,
  day3a,
  day3b,
  day4a,
  day4b,
  day5a,
  day5b,
  day6a,
  day6b: () => day6a('./06/06.input.txt', true),
  day7a,
  day7b: () => day7a('./07/07.input.txt', true),
  day8a,
  day9a
};

export default solutions;