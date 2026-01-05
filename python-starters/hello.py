# hello.py

# print hello world
print("hello world")


# print date and time
from datetime import datetime
currentDateTime = datetime.now();
print("Current Date and Time:", currentDateTime)

# print formatted date and time
formattedDateTime = currentDateTime.strftime("%d-%m-%Y %H:%M:%S")
print("Formatted Date and Time", formattedDateTime)