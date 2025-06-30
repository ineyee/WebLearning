// 定义枚举
enum Direction {
  east = 100, // 枚举值100，不是east哦，看着好像枚举值是east，但其实不是，它甚至连个变量都不是，仅仅是个肤浅的别名，TS的枚举就是这么设计的，实际上这里就是个数字100
  west,
  south,
  north,
}

// 定义枚举变量，把枚举值100赋值给它，那它的值就是数字100了，即它的内存里存储就是数字100
const direction: Direction = Direction.east;

checkDirection(direction); // 东 100

function checkDirection(direction: Direction) {
  switch (direction) {
    case Direction.east:
      console.log("东", direction);
      break;
    case Direction.west:
      console.log("西", direction);
      break;
    case Direction.south:
      console.log("南", direction);
      break;
    case Direction.north:
      console.log("北", direction);
      break;
  }
}

export {};
