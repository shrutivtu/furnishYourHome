import json

# Load the JSON file
with open('s.json', 'r', encoding='utf-8') as file:
    furniture_data = json.load(file)

# Now you can work with the data
# If it's an array of products:
for item in furniture_data:
    print(item['product_name'])

# If it's a single object or needs to be accessed differently:
print(furniture_data['product_name'])


