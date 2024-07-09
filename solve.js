const twoSum = function (target, nums, stepnum) {
  let i = 0,
    j = nums.length - 1;
  while (i < j) {
    if (i === stepnum) {
      i++;
    }
    if (j === stepnum) {
      j--;
    }

    if (nums[i] + nums[j] < target) {
      i++;
    } else if (nums[i] + nums[j] > target) {
      j--;
    } else {
      return [nums[i], nums[j]];
    }
  }
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function (nums) {
  const res = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    const target = 0 - nums[i];
    const twoSumRes = twoSum(target, [...nums], i);
    if (twoSumRes) {
      const newArr = [nums[i], ...twoSumRes];
      res.push(newArr.sort());
    }
  }
  console.log(res);
  return Array.from(
    new Set(res.map(arr => arr.map(num => String(num)).join(''))),
  ).map(c => c.split('').map(Number));
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));

// -2 -1 0 1 2 3
const nums = [
  [-1, -1, 2],
  [-1, -1, 2],
  [-1, 0, 1],
  [-1, 0, 1],
  [-1, -1, 2],
];

const res = Array.from(
  new Set(nums.map(arr => arr.map(num => String(num)).join(''))),
).map(c => c.split(/(?<=\d)(?=-)|(?<=-)/).map(Number));
console.log(res);
