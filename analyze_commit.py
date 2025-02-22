import textblob

with open('commit_message.txt', 'r') as file:
    commit_message = file.read()

analysis = textblob.TextBlob(commit_message)
print(f'Sentiment: {analysis.sentiment}')
