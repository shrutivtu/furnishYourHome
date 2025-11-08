import os
from google import genai
from PIL import Image
from io import BytesIO
from pathlib import Path
from typing import List, Union

from backend.app import config


class ImageGeneratorG:
    def __init__(self, api_key: str = None):
        """
        Initialize the Nano Banana image generator.

        Args:
            api_key: Google AI API key. If None, will try to read from GOOGLE_API_KEY env variable
        """

        self.client = genai.Client(api_key=config.google_api_key)
        self.model = "gemini-2.5-flash-image-preview"

    @staticmethod
    def generate_system_prompt(user_prompt: str, user_price: float):
        # 0: actual_prompt_from_openai
        # 1: running_images (filePath)
        # 2: running_items (json)
        # 3: total price
        return [user_prompt, [], ["hi", "from", "openai"], 700]
        #return ["", [""], [], 5]


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


class ImageGenerator:
    def __init__(self, api_key: str = None):
        pass
