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


(define (sum lst)
   (if (null? lst) '0 ( + (car lst) (sum (cdr lst))))
  )

(define (mul lst)
   (if (null? lst) '0 ( * (car lst) (if (null? (cdr lst)) '1 ( mul (cdr lst)))))
  )

(define (butlast lst)
   (if (null? lst) '() (if (null? (cdr lst)) '() ( cons (car lst) (butlast (cdr lst)))      ))
  )


(sum '(1 2 3 4 5))
(mul '(1 2 3))
(mul '())
(cons'a( cons 'b '()))
(butlast '(1 2 3))
(butlast '(1))
(butlast '(1 2 3 4 5))
