function Calculate(input) {

    var i = 0;
    var char = '';

    function Read() {
        char = input[i++];
    }

    function Value() {
        var value = "";

        if (char == '(') {
            Read();
            value = AddSub();
            Read();
        }

        else if ('.0123456789'.indexOf(char) > -1) {
            do {
                value += char;
                Read();
            }
            while ('.0123456789'.indexOf(char) > -1);
            value = parseFloat(value);
        }

        else if ('+-*/'.indexOf(char) > -1) {
            value = char;
        }

        else {
            throw "unexpected character '" + char + "'";
        }

        return value;
    }

    function MulDiv() {
        var value = Value();
        while (true) {
            if (char == '/') {
                Read();
                value /= Value();
            }
            else if (char == '*') {
                Read();
                value *= Value();
            }
            else {
                return value;
            }
        }
    }

    function AddSub() {
        var value = MulDiv();
        while (true) {
            if (char == '-') {
                Read();
                value -= MulDiv();
            }
            else if (char == '+') {
                Read();
                value += MulDiv();
            }
            else {
                return value;
            }
        }
    }

    Read();
    return AddSub();

}