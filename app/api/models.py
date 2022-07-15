from pydantic import BaseModel


class HelloWorld(BaseModel):
    Hello: str = "World"
    your_ip: str = "127.0.0.1"


class FirstTask(BaseModel):
    answer: bool = True
    error_cell_number: int
    recommended_error_cell_content: list
    coordinates_license: list[tuple]
    coordinates_producer: list[tuple]


class SecondTask(BaseModel):
    recommendation_groups: list
    recommendations_reglament: list
    recommendations_code: list
    coordinates_license: list[tuple]
    coordinates_producer: list[tuple]
