// const parcer = require('./parser/string_helper');
// const calc = require('./calculator/calculator').default;
import {parse} from "./parser/string_helper.js"
import {calc} from "./calculator/calculator.js"

// var parsed_lst = parse('(+ 1 2 3 4) (* 1 2 3) (- 100) (- 100 2)')
// console.log(...calc(parsed_lst))

// parsed_lst = parse('(+ 1 2 3 (* 1 2 3) (/ 1) (/ 100 2 2) )') // 38
// console.log(...calc(parsed_lst))

var parsed_lst = parse('(+ 1 2 (* 2 3))') // 38
console.log(...calc(parsed_lst))