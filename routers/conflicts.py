from fastapi import APIRouter

router = APIRouter()

@router.get('/')
async def list_conflicts():
 return {'conflicts': [], 'total': 0}

@router.post('/')
async def resolve_conflict():
 return {'message': 'Resolve conflict - to be implemented'}
