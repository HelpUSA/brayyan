from fastapi import APIRouter, File, UploadFile

router = APIRouter()

@router.post('/csv')
async def upload_csv(file: UploadFile = File(...)):
    return {'filename': file.filename, 'status': 'received'}
