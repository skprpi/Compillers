import {parse} from "./parser/string_helper.js"
import {first_level_calc} from "./calculator/calculator.js"



// var parsed_lst = parse('(+ 1 2 (* 3 3 (*))) (* 1 2 3) (- 100) (- 100 2) 2 + 3 (quote(1 2 3))') // 12 6 -100 98
// var parsed_lst = parse('2 +  3 (+ 1 2 (* 3 3 (*))) (* 1 2 3) (- 100) (- 100 2)  (car (cdr (quote(1 2 3))))     (cons (car (quote(1 2 3)))  (quote(1 2 3)) )') // 12 6 -100 98 2

// var parsed_lst = parse('( <= 2 2 2)')
// var parsed_lst = parse('(if #t 2 3)')
// var parsed_lst = parse('(if (null? (quote())) (quote(2 + 3)) 3)')

//var parsed_lst = parse('(+ 2 (cond (( =  2 3) 3) (( = 2 3) 4) (#t 5) ))')
// var parsed_lst = parse('2')


//var parsed_lst = parse('(let ((a 2) (b 30)) (+ a b))    (let ((a 2) (b 30)) a b)   (let ((a 2) (b 3)) (let ((a 3) (b 4)) (+ a b)) a)  (let ((a (quote(1 2 3))) (b 3)) (car a))  (let ((a (quote(1 2 3))) (b 3)) (cons a (quote(1 2))))')  // 32 30 2 1 [ [ '1', '2', '3' ], '1', '2' ]
//var parsed_lst = parse('(let((x 42)) x)')

var parsed_lst = parse('(define b 10) ((lambda (a) (cons (+ a b) (quote(123)))) 2)')
console.log(...first_level_calc(parsed_lst))

//var a = {'a': (2, 3, 4)}
//var b = {}
//Object.assign(b, a)
//b['a'] = 3
//console.log(a['a'], b['a'])
