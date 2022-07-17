from fastapi import FastAPI, Request, Body, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
import random as r

from .models import HelloWorld, FirstTask, SecondTask
from ..core.settings import Settings
from ..core.queries import get_table
from ..core.inferences import get_suggestions, inference_task1, inference_task2

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
async def task1(id: str = Body(), product_name: str = Body(), group: str = Body(), reglament: str = Body(),code: str = Body()):
    """
    Шаблонная обработка запроса для первой задачи
    координаты в списке в формате: (lat,lon)
    request{
        id: str
        product_name: str
        group: str
        reglament: str
        code: str
    }
    """
    #tru = inference_task1(product_name, code, reglament, group)
    tru = r.randint(0,1)
    cell = r.randint(2,4)
    if cell == 2:
        content = [
            'ТР ЕАЭС 043/2017 О требованиях к средствам обеспечения пожарной безопасности и пожаротушения',
            'ТР ТС 012/2011 О безопасности оборудования для работы во взрывоопасных средах',
            'ТР ТС 032/2013 О безопасности оборудования, работающего под избыточным давлением',
            'ТР ТС 010/2011 О безопасности машин и оборудования',
            'ТР ТС 004/2011 О безопасности низковольтного оборудования'
        ]
    elif cell == 3:
        content = [
            'Узлы пересечения противопожарных преград кабельными изделиями, шинопроводами, герметичными кабельными вводами, муфтами и трубопроводами инженерных систем зданий и сооружений',
            'Клапаны противопожарные нормально открытые, клапаны противопожарные нормально закрытые, люки дымовые',
            'Электрическое (электрооборудование) и неэлектрическое оборудование для работы во взрывоопасных средах, применяемое на опасных производственных объектах, за исключением изделий медицинского назначения, оборудования, при эксплуатации которого опасность взрыва возникает только из-за наличия взрывоопасных веществ и нестойких химических соединений, оборудования, предназначенного для бытового и непроизводственного применения в условиях, когда взрывоопасная среда образуется вследствие непредвиденной утечки горючего газа, средств индивидуальной защиты, морских судов и морских платформ, кроме электрооборудования, находящегося на их борту во взрывоопасных зонах, транспортных средств общего пользования, предназначенных для перевозки пассажиров и грузов воздушным, наземным, железнодорожным или водным транспортом, ядерного оружия, исследовательских установок организаций ядерно- оборонного комплекса и связанных с ними процессами проектирования (разработки), производства, монтажа, наладки, эксплуатации, хранения, перевозки и утилизации',
            'Кабели, провода и шнуры',
            'Персональные электронные вычислительные машины (в том числе системные блоки)'
        ]
    elif cell == 4:
        content = [
            '4016999708',
            '7308909809',
            '8481806390',
            '9405209109',
            '8467810000'
                   ]
    return FirstTask(
            answer=True if tru else False,
            error_cell_number=r.randint(2, 4),
            recommended_error_cell_content=content,
            coordinates_license=[(56.77005856718443, 22.02264736553036),(44.197625296391564, 42.9702011633056),(53.29908272879874, 83.79197060138002),(41.79670883697144, 44.79688727757298),(31.48775934034713, 34.44416836467772)],
            coordinates_producer=[(42.357131468976334, -83.16547798305959),(49.30288019074644, 14.149568843273835),(39.00801330712202, 125.75348066276186),(43.13589915968698, 74.56228395233046),(15.883683994918764, 7.958523720893803)],
            table=get_table()
    )


@app.post('/task2', response_model=SecondTask)
async def task2(id: str = Body(), product_name: str = Body()):
    """
    Шаблонная обработка запроса для второй задачи
    """
    return SecondTask(
        recommendation_groups= ['group1', 'group2', 'group3', 'group4', 'group5'],
        recommendation_reglament= ['reg1', 'reg2', 'reg3', 'reg4', 'reg5'],
        recommendation_code= ['code1', 'code2', 'code3', 'code4', 'code5'],
        coordinates_license= [(56.77005856718443, 22.02264736553036), (44.197625296391564, 42.9702011633056),
                                (53.29908272879874, 83.79197060138002), (41.79670883697144, 44.79688727757298),
                                (31.48775934034713, 34.44416836467772)],
        coordinates_producer= [(42.357131468976334, -83.16547798305959), (49.30288019074644, 14.149568843273835),
                                 (39.00801330712202, 125.75348066276186), (43.13589915968698, 74.56228395233046),
                                 (15.883683994918764, 7.958523720893803)],
        table=get_table()
    )


@app.websocket('/search')
async def search(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        suggestions = get_suggestions(data)
        for suggestion in suggestions:
            await websocket.send_text(suggestion)

