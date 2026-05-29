from fastapi import APIRouter

router = APIRouter()

@router.get('/csv')
async def export_csv(project_id: str):
 return {'project_id': project_id, 'format': 'csv'}

@router.get('/prisma')
async def export_prisma(project_id: str):
 return {'project_id': project_id, 'format': 'prisma'}
