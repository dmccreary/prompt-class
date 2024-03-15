# Validating a Zip Code

Many form developers are under pressure to get a new form written
in a short timeframe.  As a result, they tend to overlook
adding simple checks to a field.  Or worse, they don't
think about the different combinations of valid ways
that a user can enter data.  Here is a simple example
of a prompt that checks a field using both JavaScript and Python.

## JavaScript Prompt

```linenums="0"
Create a JavaScript function that validates 
a 5 or 9-digit zip code.
Allow a dash to be part of the zipcode
separating the five and four digits.
Provide six sample test cases and run them.
```

Note this result uses a regular expression and it includes both positive and negative tests.
The first two tests are positive tests of a valid format and the last four are negative tests.

```javascript
function isValidZipCode(zipCode) {
    // Regular expression to match a 5-digit or 9-digit zip code with an optional dash
    const regex = /^(\d{5})(-\d{4})?$/;
    return regex.test(zipCode);
}

// Test cases
console.log(isValidZipCode("12345"));       // Expected: true
console.log(isValidZipCode("12345-6789"));  // Expected: true
console.log(isValidZipCode("123456789"));   // Expected: false (no dash)
console.log(isValidZipCode("1234"));        // Expected: false (too short)
console.log(isValidZipCode("12345-678"));   // Expected: false (last part too short)
console.log(isValidZipCode("12-3456789"));  // Expected: false (incorrect dash position)
```

The regular expression `^(\d{5})(-\d{4})?$` explained:

-   `^` asserts the start of the string.
-   `(\d{5})` matches exactly 5 digits.
-   `(-\d{4})?` is an optional group that matches a dash followed by exactly 4 digits. The `?` makes this group optional.
-   `$` asserts the end of the string.

This way, the regex matches a string that either consists of exactly 5 digits or exactly 5 digits, a dash, and then exactly 4 more digits.

To run the JavaScript code including the test cases, you would typically do so in a JavaScript environment like a web browser's developer console or a Node.js environment. Since I can't execute JavaScript code directly in this environment, please try running the provided code snippet in your preferred JavaScript runtime to see the test cases in action.

## Python Example

```linenums="0"
Create a Python function that validates 
a 5 or 9-digit zip code.
Allow a dash to be part of the zipcode
separating the five and four digits.
Provide six sample test cases and run them.
```
## Sample Response

```python
def validate_zip_code(zip_code):
    """
    Validates if the provided zip code is either a 5-digit, a 9-digit number,
    or a 5-digit number followed by a dash and a 4-digit number.

    Args:
    zip_code (str): The zip code to validate.

    Returns:
    bool: True if the zip code is valid, False otherwise.
    """
    if len(zip_code) == 5 and zip_code.isdigit():
        return True
    elif len(zip_code) == 9 and zip_code.isdigit():
        return True
    elif len(zip_code) == 10 and zip_code[:5].isdigit() and zip_code[5] == '-' and zip_code[6:].isdigit():
        return True
    else:
        return False

```

```
Test Cases and Results
"12345": Valid (True)
"987654321": Valid (True)
"1234": Invalid (False)
"ABCDE": Invalid (False)
"1234567890": Invalid (False)
"12345-6789": Valid (True)
```

