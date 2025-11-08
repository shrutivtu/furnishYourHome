import time
import json
import re
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests # Needed for requests.compat.urljoin

# --- CONFIGURATION ⚙️ ---
TARGET_URL = "https://www.ikea.com/de/en/search/?q=sofa"
OUTPUT_FILE = "ikea_sofa_db.json"
BASE_URL = "https://www.ikea.com" 

# IMPORTANT: Ensure this path is correct. 
# It assumes 'chromedriver' is in the SAME folder as this scraper.py file.
CHROME_DRIVER_PATH = './chromedriver' 

def fetch_page_selenium(url, driver_path):
    """Fetches the page using Selenium with an explicit wait for dynamic content."""
    print("Starting Selenium to load dynamic content...")
    
    chrome_options = webdriver.ChromeOptions()
    
    # --- ESSENTIAL FIXES FOR 'DevToolsActivePort' ERROR ---
    # 1. Newest headless mode (required for many modern Chrome/driver versions)
    chrome_options.add_argument('--headless=new') 
    
    # 2. Disable sandbox restrictions (critical for container/headless environments)
    chrome_options.add_argument('--no-sandbox') 
    
    # 3. Disable shared memory usage (fixes issues on some systems, including macOS)
    chrome_options.add_argument('--disable-dev-shm-usage') 
    
    # 4. Disable GPU (Prevents rendering issues in headless mode)
    chrome_options.add_argument('--disable-gpu') 
    
    # 5. Disable logging (can speed up startup slightly)
    chrome_options.add_argument('--log-level=3')
    
    # 6. Set a temporary user data directory
    chrome_options.add_argument('--user-data-dir=/tmp/chrome_profile') 
    # -----------------------------------------------------

    try:
        service = Service(executable_path=driver_path)
    except Exception as e:
        print(f"Error initializing Chrome Service. Check driver path and permissions: {e}")
        return None

    driver = None
    try:
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.get(url)
        
        # ... (rest of the wait logic remains the same)
        # ...
        
    except Exception as e:
        # ... (error handling remains the same)
        pass
    finally:
        if driver:
            driver.quit()
            print("Selenium browser closed.")

    return html_content # Ensure this line is outside the try/except block if needed, or structured like the full script


def extract_product_details(soup, base_url):
    """
    Parses the fully loaded HTML using the stable data attributes found on the product cards.
    """
    furniture_db = []
    
    # Target the stable div using its data-testid attribute
    product_cards = soup.select('div[data-testid="plp-product-card"]') 
    
    if not product_cards:
        print("Error: Could not find any product cards. The selector is incorrect or content is missing.")
        return furniture_db
    
    print(f"Found {len(product_cards)} products to extract...")

    for i, card in enumerate(product_cards):
        product_data = {}
        try:
            # --- 1. EXTRACT FIELDS FROM DATA ATTRIBUTES (Highly Reliable) ---
            product_data['price'] = float(card.get('data-price', 0)) 
            product_data['currency'] = card.get('data-currency', 'N/A')
            product_data['name'] = card.get('data-product-name', 'N/A')
            product_data['sku'] = card.get('data-ref-id', 'N/A') 

            # --- 2. EXTRACT FIELDS FROM NESTED TAGS ---

            # Product Link: Priority 1 is the price link, Priority 2 is the image link
            link_tag_1 = card.find('a', class_='plp-price-link-wrapper')
            link_tag_2 = card.find('a', class_='plp-product__image-link')
            
            product_link_tag = link_tag_1 if link_tag_1 else link_tag_2
            
            if product_link_tag and 'href' in product_link_tag.attrs:
                product_data['product_link'] = requests.compat.urljoin(base_url, product_link_tag['href'])
            else:
                product_data['product_link'] = 'Link not found'
            
            # Image URL: Find the primary <img> tag
            image_tag = card.find('img', class_='plp-image')
            product_data['image_url'] = image_tag.get('src', 'N/A') if image_tag else 'N/A'
            
            # Full Description / Product Type
            description_tag = card.find('span', class_='plp-price-module__description')
            product_data['full_description'] = description_tag.get_text(strip=True) if description_tag else 'N/A'
            
            # Color Hint (Guess from image alt text)
            alt_text = image_tag.get('alt', '') if image_tag else ''
            color_match = re.search(r'\b(white|grey|blue|natural|red|black|green)\b', alt_text, re.IGNORECASE)
            product_data['color_hint'] = color_match.group(0).capitalize() if color_match else 'Unknown'

            furniture_db.append(product_data)
            
        except Exception as e:
            print(f"Skipping product {i+1} ({product_data.get('name', 'Unknown')}) due to extraction error: {type(e).__name__} - {e}")
            continue

    return furniture_db

def save_to_json(data, filename):
    """Saves the list of dictionaries to a pretty-printed JSON file."""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"\n✅ Success! Database saved to {filename}")
    except Exception as e:
        print(f"Error saving JSON file: {e}")

# --- MAIN EXECUTION 🚀 ---
if __name__ == "__main__":
    print(f"Fetching: {TARGET_URL}")
    
    # Fetch page using Selenium
    html_content = fetch_page_selenium(TARGET_URL, CHROME_DRIVER_PATH)
    
    if html_content:
        # Pass the full HTML source to BeautifulSoup
        soup = BeautifulSoup(html_content, 'html.parser')
        product_data_list = extract_product_details(soup, BASE_URL)
        
        if product_data_list:
            save_to_json(product_data_list, OUTPUT_FILE)
        else:
            print("\n❌ No product data was extracted. Check the selector and loading process.")