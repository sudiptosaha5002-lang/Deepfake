from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Dict, Any

from .services.vision import process_vision
from .services.ocr import process_ocr
from .services.metadata import process_metadata
from .services.fusion import fuse_results

router = APIRouter()

@router.post("/analyze", response_model=Dict[str, Any])
async def analyze_image(file: UploadFile = File(...)):
    """
    Main endpoint to process an uploaded image.
    Routes the image sequentially through Vision, OCR, and Metadata modules,
    and then fuses the results for a final report.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")
    
    # Read file content into memory (for passing to synchronous services)
    file_bytes = await file.read()
    
    try:
        # Step 1: Vision (OpenCV / CLIP placeholder)
        vision_result = process_vision(file_bytes)
        
        # Step 2: OCR (PyTesseract placeholder)
        ocr_result = process_ocr(file_bytes)
        
        # Step 3: Metadata (EXIF/C2PA placeholder)
        metadata_result = process_metadata(file_bytes)
        
        # Step 4: Fusion (Gemma 4 placeholder)
        final_report = fuse_results(vision_result, ocr_result, metadata_result)
        
        return final_report
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
