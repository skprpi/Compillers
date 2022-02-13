#lang racket


; атом - данные (имеет ' в начале)
; car '(a b c)   -> a
; cdr '(a b c)   -> (b c)
; cons 'a '(b c) -> (a b c)
; eq 'a 'b       -> Nil
; eq 'a 'a       -> T
; null ‘()       -> T
; null ‘(a b c)  -> Nil
; if (< 2 3) (print 2) (print 3) -> 2
; (define trrr (lambda (x y) (+ x y)))
; ((lambda (x y) (+ x y)) 2 3) -> 5

;(define (name s)
;  (if (and (string? s) (string-prefix? s "hello "))
;      "hi!"
;      "huh?"))


(define (name lst)
  (if (null? lst) (print 2) ( (car lst) (name (cdr lst))))
  ('3)
  )




(name '(1 2 3))