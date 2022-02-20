import {parse} from "./parser/string_helper.js"
import {first_level_calc} from "./calculator/calculator.js"



//var parsed_lst = parse('(+ 1 2 (* 3 3 (*))) (* 1 2 3) (- 100) (- 100 2) 2 + 3 (quote(1 2 3))') // 12 6 -100 98
var parsed_lst = parse('2 + 3 (+ 1 2 (* 3 3 (*))) (* 1 2 3) (- 100) (- 100 2)  (car (cdr (quote(1 2 3))))     (cons (car (quote(1 2 3)))  (quote(1 2 3)) )') // 12 6 -100 98 2
console.log(...first_level_calc(parsed_lst))
