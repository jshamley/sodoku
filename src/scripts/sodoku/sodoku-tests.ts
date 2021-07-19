import { easyGameArr, evilGameArr, evilGameArr2, hardGameArr, hardGameArr2, hardGameArr3, mediumGameArr, veryeasyGameArr } from './sodoku-consts';
import { printBoard, solve } from './sodoku';

console.log('');
console.log('Starting game - VERY EASY');
printBoard(veryeasyGameArr);
console.log('');
console.log('Completed solution');
printBoard(solve(veryeasyGameArr));
console.log('');
console.log('Starting game - EASY');
printBoard(easyGameArr);
console.log('');
console.log('Completed solution');
printBoard(solve(easyGameArr));

console.log('');
console.log('Starting game - MEDIUM');
printBoard(mediumGameArr);
console.log('');
console.log('Completed solution');
printBoard(solve(mediumGameArr));

console.log('');
console.log('Starting game - HARD');
printBoard(hardGameArr);
console.log('');
console.log('Completed solution');
printBoard(solve(hardGameArr));

console.log('');
console.log('Starting game - HARD #2');
printBoard(hardGameArr2);
console.log('');
console.log('Completed solution');
printBoard(solve(hardGameArr2));

console.log('');
console.log('Starting game - HARD #3');
printBoard(hardGameArr3);
console.log('');
console.log('Completed solution');
printBoard(solve(hardGameArr3));

console.log('');
console.log('Starting game - EVIL');
printBoard(evilGameArr);
console.log('');
console.log('Completed solution');
printBoard(solve(evilGameArr));

console.log('');
console.log('Starting game - EVIL #2');
printBoard(evilGameArr2);
console.log('');
console.log('Completed solution');
printBoard(solve(evilGameArr2));