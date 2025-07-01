import PyPDF2
import json
import os

def read_pdf(pdf_path):
    try:
        # Open the PDF file in binary read mode
        with open(pdf_path, 'rb') as file:
            # Create a PDF reader object
            pdf_reader = PyPDF2.PdfReader(file)
            
            # Get total number of pages
            num_pages = len(pdf_reader.pages)
            
            # Extract text from all pages
            content = ""
            for page_num in range(num_pages):
                # Get the page object
                page = pdf_reader.pages[page_num]
                # Extract text from page
                content += page.extract_text()
            
            return content
    except Exception as e:
        print(f"Error reading PDF: {str(e)}")
        return None

def main():
    # Define the PDF path
    pdf_path = "assets/discover.pdf"
    
    # Read the PDF content
    content = read_pdf(pdf_path)
    
    if content:
        # Save the extracted content to a text file for review
        with open('pdf_content.txt', 'w', encoding='utf-8') as f:
            f.write(content)
        print("PDF content has been extracted and saved to pdf_content.txt")
    else:
        print("Failed to extract PDF content")

if __name__ == "__main__":
    main() 