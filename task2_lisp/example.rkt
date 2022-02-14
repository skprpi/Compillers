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


(define (sorted_helper lst)
  ( if (null?(cdr lst)) #t  ( if (null? (cdr (cdr lst))) #t ( and (< (car lst) (car (cdr lst)) ) (sorted_helper (cdr lst))  )  )   )
  )


(define (sorted lst)
  (if (null? lst) #t (sorted_helper lst))
  )

(define (member lst guess_member)
  (if (null? lst) #f (or (= guess_member (car lst)) (member (cdr lst) guess_member)))
  )

(define (append lst1 lst2)
  (if (null? lst1) lst2 (cons(car lst1) (append (cdr lst1) lst2) ) )
  )

(define (reverse_helper lst ans)
  (if (null? lst) ans (  reverse_helper (cdr lst) (cons (car lst) ans) ) )
  )

(define (reverse lst)
  (if (null? lst) '() ( reverse_helper lst '()  ) )
  )

(define (map fun lst)
  ( if (null? lst) '() (   cons (fun (car lst)) (map fun (cdr lst)))    )
  )

(define (filter fun lst)
  ( if (null? lst) '() (  if (fun (car lst)) (cons (car lst) (filter fun (cdr lst)) )  (filter fun (cdr lst))) )
  )



(define (qsort lst)
  ( if (null? lst) '() (  if (null? (cdr lst)) (cons (car lst) '()) ( append (append (qsort (filter (lambda(x)( <= x (car lst))) (cdr lst))  )  (cons (car lst) '() ) )   (qsort (filter (lambda(x)( > x (car lst))) (cdr lst))) )))     
  )


(qsort '(3 1 2 5 8))

(qsort '(3 2 1))
(qsort '(3 2 1 3))

;(sum '(1 2 3 4 5))

;(mul '(1 2 3))
;(mul '())

;(butlast '(1 2 3))
;(butlast '(1))
;(butlast '(1 2 3 4 5))

;(sorted '(1 2 3))
;(sorted '(3 2 3))
;(sorted '(1))
;(sorted '())
;(sorted '(5 8))
;(sorted '(1 2 3 4 5 5 6 7))

;(member '(1 2 3 ) '4)
;(member '(1 2 3 ) '2)

;(append '(1 2 3) '(4 5))
;(append '() '(4 5))
;(append '(2 3) '())

;(reverse '(1 2 3))
;(reverse '(1 2))
;(reverse '(1 2 3 4 5 6))


;(map (lambda (x) (* x 2)) '(4 3 4) )
;(map (lambda (x) (+ x 3)) '(1 2 3 4) )

;(filter (lambda (x) (> x 0)) '(-1 -2 3 4 -5) )
;(filter (lambda (x) (> x 0)) '(-1 -2 -3 -4 -5) )
