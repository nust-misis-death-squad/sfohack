from fastapi import FastAPI, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
import random as r

from .models import HelloWorld, FirstTask, SecondTask
from ..core.settings import Settings

app = FastAPI(title=Settings().project_name, version=Settings().version, description=Settings().fast_api_description)

# FIXME: менять в проде allow_origins на локальные!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    logger.info(f"Docs: http://{Settings().hostname}:{Settings().port}/docs")


# Заглушка на /
@app.get('/', response_model=HelloWorld)
async def hello_world(request: Request):
    """
    Заглушка для демонстрации работы сервера
    """
    return {'Hello': 'World', "your ip": request.client.host}


@app.post('/task1', response_model=FirstTask)
async def task1(id: int = Body(), product_name: str = Body(), group: str = Body(), reglament: str = Body(),code: int = Body()):
    """
    Шаблонная обработка запроса для первой задачи
    координаты в списке в формате: (lat,lon)
    request{
        id: int
        product_name: str
        group: str
        reglament: str
        code: int
    }
    """
    #get_task1_prediction(id=id, product_name=product_name, group=group, regalment=reglament, code=code)
    return {
            'answer': True,
            'error_cell_number': r.randint(0, 2),
            'recommended_error_cell_content': ['example1', 'example2', 'example3', 'exmaple4', 'example5'],
            'coordinates_license': [(56.77005856718443, 22.02264736553036),(44.197625296391564, 42.9702011633056),(53.29908272879874, 83.79197060138002),(41.79670883697144, 44.79688727757298),(31.48775934034713, 34.44416836467772)],
            'coordinates_producer': [(42.357131468976334, -83.16547798305959),(49.30288019074644, 14.149568843273835),(39.00801330712202, 125.75348066276186),(43.13589915968698, 74.56228395233046),(15.883683994918764, 7.958523720893803)]
            }


@app.get('/task2', response_model=SecondTask)
async def task2(request: Request):
    """
    Шаблонная обработка запроса для второй задачи
    """
    return {
        'recommendation_groups': ['group1', 'group2', 'group3', 'group4', 'group5'],
        'recommendation_reglament': ['reg1', 'reg2', 'reg3', 'reg4', 'reg5'],
        'recommendation_code': ['code1', 'code2', 'code3', 'code4', 'code5'],
        'coordinates_license': [(56.77005856718443, 22.02264736553036), (44.197625296391564, 42.9702011633056),
                                (53.29908272879874, 83.79197060138002), (41.79670883697144, 44.79688727757298),
                                (31.48775934034713, 34.44416836467772)],
        'coordinates_producer': [(42.357131468976334, -83.16547798305959), (49.30288019074644, 14.149568843273835),
                                 (39.00801330712202, 125.75348066276186), (43.13589915968698, 74.56228395233046),
                                 (15.883683994918764, 7.958523720893803)]
    }