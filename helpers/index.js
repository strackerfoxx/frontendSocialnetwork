export function validatePass(password){
    const prePass = password.split("")

    const caps = (element) => element === "A" || element === "B" || element === "C" || element === "D" || element === "E" || element === "F" || element === "G" || element === "H" || element === "I" || element === "j" || element === "k" || element === "L" || element === "M" || element === "N" || element === "O" || element === "P" || element === "Q" || element === "R" || element === "S" || element === "T" || element === "U" || element === "V" || element === "W" || element === "X" || element === "Y" || element === "Z" ;
    const normal = (element) => element === "a" || element === "b" || element === "c" || element === "d" || element === "e" || element === "f" || element === "g" || element === "h" || element === "i" || element === "j" || element === "k" || element === "l" || element === "m" || element === "n" || element === "o" || element === "p" || element === "q" || element === "r" || element === "s" || element === "t" || element === "u" || element === "v" || element === "w" || element === "x" || element === "y" || element === "z";
    const number = (element) => element === "0" || element === "1" || element === "2" || element === "3" || element === "4" || element === "5" || element === "6" || element === "7" || element === "8" || element === "9" || element === "0"
    const symbol = (element) => element === "!" || element === "@" || element === "#" || element === "$" || element === "%" || element === "^" || element === "&" || element === "(" || element === ")" || element === "-" || element === "_" || element === "+" || element === "=" || element === "{" || element === "}" || element === "[" || element === "]" || element === "|" || element === ":" || element === "'"  || element === "," || element === "." || element === "?" ;

    return prePass.some(caps) && prePass.some(normal) && prePass.some(number) || prePass.some(symbol)
    // Expected output: true
}