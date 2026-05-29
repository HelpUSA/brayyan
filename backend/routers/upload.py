from fastapi import APIRouter, UploadFile, File

router = APIRouter()

@router.post('/csv')
async def upload_csv(file: UploadFile = File(...)):
 return {'filename': file.filename, 'status': 'received'}
