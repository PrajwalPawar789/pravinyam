const { utf8ToAnsi } = require('utf8-to-ansi');
const utf8 = "#include <stdio.h>\r\n\r\nint main() {\r\n    char operation;\r\n    double n1, n2;\r\n\r\n    printf(\"Enter an operator (+, -, *, /): \");\r\n    scanf(\"%c\", &operation);\r\n    printf(\"Enter two operands: \");\r\n    scanf(\"%lf %lf\",&n1, &n2);\r\n\r\n    switch(operation)\r\n    {\r\n        case '+':\r\n            printf(\"%.1lf + %.1lf = %.1lf\",n1, n2, n1+n2);\r\n            break;\r\n\r\n        case '-':\r\n            printf(\"%.1lf - %.1lf = %.1lf\",n1, n2, n1-n2);\r\n            break;\r\n\r\n        case '*':\r\n            printf(\"%.1lf * %.1lf = %.1lf\",n1, n2, n1*n2);\r\n            break;\r\n\r\n        case '/':\r\n            printf(\"%.1lf / %.1lf = %.1lf\",n1, n2, n1/n2);\r\n            break;\r\n\r\n        // operator doesn't match any case constant +, -, *, /\r\n        default:\r\n            printf(\"Error! Operator is not correct.\");\r\n    }\r\n\r\n    return 0;\r\n}\r\n";
const ansi = utf8ToAnsi(utf8);
console.log(ansi);