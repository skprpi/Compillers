from task1.run import run


run(":sum [dup null [drop 0] [dup first swap rest sum +] if] def [1 2 3] sum", "no print steps")
run(":mul [dup null [drop 0] [dup first swap rest dup null [drop 1 *] [mul *] if] if] def [2 3 4] mul", "no print steps")
run(":butlast [dup null [drop] [dup first swap rest dup null [drop drop []] [butlast cons] if] if] def [1 2 3] butlast", "no print steps")
run(":sorted [dup null [drop true] [true swap sorted_helper] if] def :sorted_helper [dup null [drop true] [dup first swap rest dup null [drop drop] [dup first swap [<] dip dup null [drop drop] [sorted_helper and] if] if] if] def [1 2 3 4 5] sorted", "no print steps")
run(":sorted [dup null [drop true] [true swap sorted_helper] if] def :sorted_helper [dup null [drop true] [dup first swap rest dup null [drop drop] [dup first swap [<] dip dup null [drop drop] [sorted_helper and] if] if] if] def [1 2 3 3 5] sorted", "no print steps")
run(":member [dup null [drop false] [dup first [swap] dip    swap dup [swap] dip  = [drop drop true] [swap rest member] if ] if] def 3 [2 1 3 4] member", "no print steps")
