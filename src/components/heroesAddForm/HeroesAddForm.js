// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import { heroAdded } from "../heroesList/heroesSlice";
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState("");
  const [heroDescr, setHeroDescr] = useState("");
  const [heroElement, setHeroElement] = useState("");

  const { request } = useHttp();
  const { filters } = useSelector((state) => state.filters);

  const { heroes } = useSelector((state) => state.heroes);

  const dispatch = useDispatch();

  const onAdd = () => {
    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    };
    const updatedHeroes = [...heroes, newHero];

    request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(newHero))
      .then(dispatch(heroAdded(updatedHeroes)))
      .catch((err) => console.log(err));

    setHeroName("");
    setHeroDescr("");
    setHeroElement("");
  };

  const filtersRender = filters.slice(1);

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        element: "",
      }}
      onSubmit={onAdd}
    >
      <Form className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Имя нового героя
          </label>
          <Field
            required
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Как меня зовут?"
            value={heroName}
            onChange={(e) => setHeroName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fs-4">
            Описание
          </label>
          <Field
            required
            name="description"
            className="form-control"
            id="description"
            placeholder="Что я умею?"
            style={{ height: "130px" }}
            value={heroDescr}
            onChange={(e) => setHeroDescr(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Выбрать элемент героя
          </label>
          <Field
            as="select"
            required
            className="form-select"
            id="element"
            name="element"
            value={heroElement}
            onChange={(e) => setHeroElement(e.target.value)}
          >
            {filtersRender.map(({ name, label }) => {
              const id = uuidv4();
              return (
                <option key={id} value={name}>
                  {label}
                </option>
              );
            })}
          </Field>
        </div>

        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </Form>
    </Formik>
  );
};

export default HeroesAddForm;
