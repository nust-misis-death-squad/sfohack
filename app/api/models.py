from pydantic import BaseModel
from sqlalchemy import Table

class HelloWorld(BaseModel):
    Hello: str = "World"
    your_ip: str = "127.0.0.1"


class FirstTask(BaseModel):
    answer: bool = True
    error_cell_number: int
    recommended_error_cell_content: list
    coordinates_license: list
    coordinates_producer: list


class SecondTask(BaseModel):
    recommendation_groups: list
    recommendations_reglament: list
    recommendations_code: list
    coordinates_license: list
    coordinates_producer: list
