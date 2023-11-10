# Validating a Zip Code

## Prompt

Create a Python function that validates a 5 or 9-digit zip code.
Allow a dash to be part of the zipcode separating the five and four digits.
Provide six sample test cases and run them.

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

