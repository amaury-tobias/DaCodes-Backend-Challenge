# Backend developer position challenge

## Prerequisitos

- MongoDB

Establecer la variable de entorno `MONGODB_URI` con la `url` de conexión, ejemplo y valor por defecto: `'mongodb://localhost:27017/school'`

## Instalación

Ejecutar `npm install` o `yarn install` para instalar las dependencias

## Ejecución

`npm start` o `yarn start`

## Dependencias

- Express

  > Framework para desarrollo de servicios web en javascript, elegido para acelerar el proceso de desarrollo sin generar gran cantidad acoplamiento

- Mongoose

  > ODM para MongoDB, permite definir modelos de datos y proporciona un conjunto de herramientas y funcionalidades que permiten trabajar con MongoDB de una manera mas simple

## Rutas

## Documentation

- POST /user: Crear un nuevo usuario.

- GET /course: Obtener todos los cursos
- POST /course: Crear un curso body: { name: String }
- GET /course/`<course_id>`: Obtener los datos de un unico curso.
- PUT /course/`<course_id>`: Editar curso body: { name: String }.
- DELETE /course/`<course_id>`: Eliminar curso.
- GET /course/`<course_id>`/lesson: Muestra las lessons de un curso.
- GET /course/`<course_id>`/lesson/`<lesson_id>`: Agregar `<lesson_id>` lessons en `<course_id>`.
- GET /course/`<course_id>`/users: Muestra los usuarios de un curso.
- GET /course/`<course_id>`/users/`<user_id>`: Agregar `<user_id>` users en `<course_id>`.
- GET /course/`<course_id>`/prev-course: Muestra el cuerso asignado a prev_course
- GET /course/`<course_id>`/prev-course/`<prev_course_id>`: Agrega `<prev_course_id>` a `<course_id>`.
- GET /course/`<course_id>`/all: Obtener los datos de un unico curso con los valores de lessons, users y prev-course.

- GET /lesson: Obtiene todas las lessons.
- POST /lesson: Crear una lesson body: { name: String, approval_score: Number }.
- GET /lesson/`<lesson_id>`: Obtiene los datos de una lesson.
- PUT /lesson/`<lesson_id>`: Editar una lesson body: { name: String, approval_score: Number }.
- DELETE /lesson/`<lesson_id>`: Eliminar una lesson.
- GET /lesson/`<lesson_id>`/question: Obtiene la question asociada al `<lesson_id>`
- GET /lesson/`<lesson_id>`/question/`<question_id>`: Asigna `<question_id>` al `<lesson_id>`.
- GET /lesson/`<lesson_id>`/prev-lesson: Muestra la información asociada a `prev-lesson`.
- GET /lesson/`<lesson_id>`/prev-lesson/`<prev_lesson_id>`: Asigna `<prev_lesson_id>` al la lesson con `<lesson_id>`.
- GET /lesson/`<lesson_id>`/users: Muestra los usuarios de una lesson.
- GET /lesson/`<lesson_id>`/users/`<user_id>`: Agregar `<user_id>` users en `<lesson_id>`.
- GET /lesson/`<lesson_id>`/all: Obtener los datos de una unica lessons: question, users y prev-lesson.

- GET /question: Obtiene todas las `question`.
- POST /question: Crea una nueva `question` body `{ text: String, detail: String, score: Number, question_type: 'boolean' | 'only_one' | 'more_than_one' | 'all_must_be' }`.
- GET /question/`<question_id>`: Muestra los datos de una `question` y sus `answers`.
- PUT /question/`<question_id>`: Edita una `question` body `{ text: String, detail: String, score: Number, question_type: 'boolean' | 'only_one' | 'more_than_one' | 'all_must_be' }`.
- DELETE /question/`<question_id>`: Eliminar `question` asociada a `<question_id>`.
- GET /question/`<question_id>`/answers: Obtiene las `answers` asociadas a una `question`
- POST /question/`<question_id>`/answers: Crear una `answer` y asociarla a una `question` body: `{ text: String, correct: Boolean }`.
- GET /question/`<question_id>`/answers/`<answer_id>`: Obtiene los datos de una `answer` contenida en una `question`.
- PUT /question/`<question_id>`/answers/`<answer_id>`: Actualiza una `answer` asociada a una `question` body: `{ text: String, correct: Boolean }`.
- DELETE /question/`<question_id>`/answers/`<answer_id>`: Eliminar la `answer` con `<answer_id>` asociada a un `<question_id>`
