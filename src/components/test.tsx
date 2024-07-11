import React from "react";

export default function Test() {
 let one = ["a", "b", "c"];
 let two = ["d", "e", "f"];
 let tree = ["g", "h", "i"];
 let four = ["j", "k", "l"];
 let five = ["m", "n", "o"];
 let six = ["p", "q", "r"];
 let seven = ["s", "t", "u", "v"];
 let eight = ["w", "x", "y"];
 let nine = ["z", "e", "f"];

 let step1: string[] = [];
 let step2: string[] = [];
 let step3: string[] = [];

 let help: string;
 //  let ahmad: string[] = [];
 //  for (let a = 0; a < step1.length + 1; a++) {
 //   for (let b = 0; b < third.length + 1; b++) {
 //    if (step1[a] && third[b]) {
 //     help = step1[a] + third[b];
 //     step2.push(help);
 //    }
 //   }
 //  }

 //  for (let a = 0; a < step2.length + 1; a++) {
 //   for (let b = 0; b < forth.length + 1; b++) {
 //    if (step2[a] && forth[b]) {
 //     help = step2[a] + forth[b];
 //     step3.push(help);
 //    }
 //   }
 //  }
 let step: string[][] = [step1];

 let input = [one, two, tree, seven];
 let first = [...input[0]];
 let second = [...input[1]];
 //  let third = [...input[2]];
 //  let forth = [...input[3]];

 for (let a = 0; a < first.length + 1; a++) {
  for (let b = 0; b < second.length + 1; b++) {
   if (first[a] && second[b]) {
    help = first[a] + second[b];
    step[0].push(help);
   }
  }
 }

 let a;
 let b;
 for (let index = 0; index < input.length + 1; index++) {
  //
  //
  //
  //
  for (a = 0; a < step[index].length + 1; a++) {
   for (b = 0; b < input[index + 1].length + 1; b++) {
    if (step[index][a] && input[index + 1][b]) {
     help = step[index][a] + input[index + 1][b];
     step[index + 1].push(help);
    }
   }
  }
 }

 //  console.log(result);

 //  console.log(first);
 //  console.log(second);
 //  console.log(third);
 //  console.log(forth);

 console.log(step[input.length - 1]);

 return <div>a</div>;
}
