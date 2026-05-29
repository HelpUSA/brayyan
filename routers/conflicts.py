from fastapi import APIRouter

router = APIRouter()

@router.get('/')
async def list_conflicts(project_id: str):
 return {'project_id': project_id, 'conflicts': []}

@router.patch('/{conflict_id}')
async def resolve_conflict(conflict_id: str):
 return {'id': conflict_id, 'resolved': True}
