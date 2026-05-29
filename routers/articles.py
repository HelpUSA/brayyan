from fastapi import APIRouter

router = APIRouter()

@router.get('/')
async def list_articles(project_id: str, page: int = 1, limit: int = 50):
 return {'project_id': project_id, 'page': page, 'limit': limit, 'articles': []}

@router.get('/{article_id}')
async def get_article(article_id: str):
 return {'id': article_id}
