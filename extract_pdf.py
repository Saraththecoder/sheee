import fitz
import os

pdf_file = "shees steel doors.pdf"
output_dir = "public/images/products"

if not os.path.exists(output_dir):
    os.makedirs(output_dir, exist_ok=True)

pdf_document = fitz.open(pdf_file)
extracted_count = 0
pages_processed = 0
target_pages = 20

print(f"Extracting images from {pdf_file}...")

for page_index in range(len(pdf_document)):
    page = pdf_document[page_index]
    image_list = page.get_images()
    
    if image_list:
        pages_processed += 1
        print(f"Processing page {page_index + 1}/{len(pdf_document)} - found {len(image_list)} images")
        
        for image_index, img in enumerate(image_list, start=1):
            xref = img[0]
            base_image = pdf_document.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            width = base_image["width"]
            height = base_image["height"]
            
            # Filter out very small images (icons/logos)
            if width >= 200 and height >= 200:
                image_name = f"door_{page_index + 1}_{image_index}.{image_ext}"
                image_path = os.path.join(output_dir, image_name)
                
                with open(image_path, "wb") as f:
                    f.write(image_bytes)
                extracted_count += 1
                
        if pages_processed >= target_pages:
            print(f"Reached {target_pages} pages with images. Stopping.")
            break

print(f"Done! Extracted {extracted_count} images to {output_dir}")
