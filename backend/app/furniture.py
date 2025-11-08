import json
import os
from openai import OpenAI
from backend.app import config

class InteriorDesignGenerator:

    @staticmethod
    def load_inventory():
        """Load all product JSON files"""
        inventory = {}
        files = ['../../scraping/sofas.json', '../../scraping/lamps.json', '../../scraping/armchairs.json']
        for file in files:
            try:
                with open(file, 'r', encoding='utf-8') as f:
                    inventory[file.replace('.json', '')] = json.load(f)
            except FileNotFoundError:
                print(f"Warning: {file} not found")
                inventory[file.replace('.json', '')] = []

        return inventory

    @staticmethod
    def generate_system_prompt(user_prompt: str, user_price: float):
        client = OpenAI(api_key=config.openai_api_key)

        # Load all inventory
        inventory = InteriorDesignGenerator.load_inventory()

        # Create the system message with clear instructions
        system_message = """You are an interior design expert. Your task is to select furniture items from the provided inventory that match the user's requirements and budget. Choose one item per type.

CRITICAL INSTRUCTIONS:
1. Select items that match the user's style preferences
2. Stay within or close to the specified budget
3. Return ONLY valid JSON, no additional text
4. Use this exact structure:

{
  "selected_items": [
    {
      "product_id": "string",
      "product_name": "string",
      "category": "string",
      "price": number,
      "reason": "why this item fits the user's request"
    }
  ],
  "total_price": number,
  "design_rationale": "brief explanation of overall design choices"
}

DO NOT include any markdown formatting, code blocks, or explanatory text outside the JSON."""

        # Create user message with inventory and request
        user_message = f"""USER REQUEST: {user_prompt}
TARGET BUDGET: €{user_price}

AVAILABLE INVENTORY:
{json.dumps(inventory, indent=2)}

Please select appropriate items that match the style and budget."""

        try:
            # Call OpenAI API with JSON mode
            response = client.chat.completions.create(
                model="gpt-4o",  # or "gpt-4-turbo" or "gpt-3.5-turbo"
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": user_message}
                ],
                response_format={"type": "json_object"},  # Forces JSON output
                temperature=0.7
            )

            # Parse the response
            result = json.loads(response.choices[0].message.content)

            # Extract data for return format
            selected_items = result.get('selected_items', [])
            total_price = result.get('total_price', 0)

            # Format item names for return
            running_items = [item['product_id'] for item in selected_items]

            # Extract image paths based on product IDs
            running_images = [f"../../data/{item['product_id']}.jpg" for item in selected_items]

            # Return in your specified format
            return [
                user_prompt,
                running_images,
                running_items,
                total_price
            ]

        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            return [user_prompt, [], [], 0]
        except Exception as e:
            print(f"API call error: {e}")
            return [user_prompt, [], [], 0]


#result = InteriorDesignGenerator.generate_system_prompt(
#    user_prompt="Make scandinavian design living room with natural colors",
#    user_price=1200.0
#)

#print(f"Prompt: {result[0]}")
#print(f"Images: {result[1]}")
#print(f"Items: {result[2]}")
#print(f"Total Price: {result[3]}")