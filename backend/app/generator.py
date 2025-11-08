import os
from google import genai
from PIL import Image
from io import BytesIO
from pathlib import Path
from typing import List, Union

from backend.app import config
from backend.app import furniture


import json
import os
from openai import OpenAI
from backend.app import config

class InteriorDesignGenerator:

    def __init__(self):
        pass

    def load_inventory(self):
        inventory = {}
        
        files = ['/Users/shrutisaxena/Documents/jobprep/hackathon/furnishYourHome/scraping/armchairs.json', '/Users/shrutisaxena/Documents/jobprep/hackathon/furnishYourHome/scraping/lamps.json', '/Users/shrutisaxena/Documents/jobprep/hackathon/furnishYourHome/scraping/sofas.json']
        for file in files:
            try:
                with open(file, 'r', encoding='utf-8') as f:
                    inventory[file.replace('.json', '')] = json.load(f)
            except FileNotFoundError:
                print(f"Warning: {file} not found")
                inventory[file.replace('.json', '')] = []

        return inventory

    def generate_system_prompt(self, user_prompt: str, user_price: float):
        client = OpenAI(api_key=config.openai_api_key)

        # Load all inventory
        inventory = self.load_inventory()

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
            running_images = [f"/Users/shrutisaxena/Documents/jobprep/hackathon/furnishYourHome/data/{item['product_id']}.jpg" for item in selected_items]

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


class ImageGeneratorG:
    def __init__(self, api_key: str = None):
        """
        Initialize the Nano Banana image generator.

        Args:
            api_key: Google AI API key. If None, will try to read from GOOGLE_API_KEY env variable
        """

        self.client = genai.Client(api_key=config.google_api_key)
        self.model = "gemini-2.5-flash-image-preview"

    def generate_system_prompt(self, user_prompt: str, user_price: float):
        # 0: actual_prompt_from_openai
        # 1: running_images (filePath)
        # 2: running_items (json)
        # 3: total price
        generator = InteriorDesignGenerator()
        results = generator.generate_system_prompt(user_prompt, user_price)
        return results


    def generate_image(
            self,
            prompt: str,
            input_images: List[Union[str, Image.Image]] = None,
            output_path: str = "output_image.png"
    ) -> Image.Image:
        """
        Generate an image using Nano Banana model.

        Args:
            prompt: Text description of the desired image
            input_images: List of image paths or PIL Image objects to use as reference/input
            output_path: Path where the generated image will be saved

        Returns:
            PIL Image object of the generated image
        """
        # Prepare the content list
        contents = []

        # Add input images if provided
        if input_images:
            for img in input_images:
                if isinstance(img, str):
                    # Load image from path
                    pil_image = Image.open(img)
                elif isinstance(img, Image.Image):
                    pil_image = img
                else:
                    raise ValueError(f"Invalid image type: {type(img)}")

                contents.append(pil_image)

        # Add the text prompt
        contents.append(prompt)

        print(f"Generating image with prompt: '{prompt}'")
        if input_images:
            print(f"Using {len(input_images)} input image(s)")

        # Generate the image
        response = self.client.models.generate_content(
            model=self.model,
            contents=contents
        )

        # Extract and save the generated image
        generated_image = None
        for part in response.candidates[0].content.parts:
            if part.text is not None:
                print(f"Model response text: {part.text}")
            elif part.inline_data is not None:
                generated_image = Image.open(BytesIO(part.inline_data.data))
                generated_image.save(output_path)
                print(f"Image saved to: {output_path}")

        if generated_image is None:
            raise RuntimeError("No image was generated in the response")

        return generated_image
