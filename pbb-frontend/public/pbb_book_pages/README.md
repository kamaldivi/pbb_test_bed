# Book Page Images Directory

This directory contains WebP images for book pages organized by book ID.

## Directory Structure
```
pbb_book_pages/
├── {book_id}/
│   ├── {page_number}.webp
│   ├── {page_number}.webp
│   └── ...
└── README.md
```

## Usage
- Images are accessed via URL path: `/pbb_book_pages/{book_id}/{page_number}.webp`
- All images should be in WebP format for optimal performance
- Directory names should match the book IDs from your API
- File names should match the page numbers from your API

## Example
```
pbb_book_pages/
├── book_001/
│   ├── 1.webp
│   ├── 2.webp
│   └── 3.webp
├── book_002/
│   ├── 1.webp
│   └── 2.webp
└── README.md
```

## Notes
- The frontend application expects this exact directory structure
- Missing images will display a "not found" message
- Images are loaded directly from the public folder (no API needed)