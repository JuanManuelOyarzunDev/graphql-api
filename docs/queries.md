# Queries ejecutadas en el curso en GraphiQL

## Alias y Fragments

```graphql
{
  AllCourses: getCourses{
    ...CourseFields
  }

  Course1: getCourse(id: "5cb4b8ce75f954a0585f7be2"){
    ...CourseFields
    teacher
  }

  Course2: getCourse(id: "5cb4b8ce75f954a0585f7be4"){
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course {
  _id
  title
  description
  people {
    _id
    name
  }
}
```

## Variables

```graphql
query GetCourse2 ($course: ID!) {
  getCourse(id: $course){
   _id
    title
    people{
      _id
      name
    }
  }
}
```
Requiere un objeto JSON como:

```json
{
  "course": "5cb4b8ce75f954a0585f7be3"
}
```

## Interfaces

```graphql
mutation createNewMonitor($monitorInput: PersonInput!)
	{
    createPerson(input: $monitorInput){
      _id
      name
    }
}

query getPeopleMonitor
{
  getPeople{
    _id
    name
    email
    ... on Monitor{
      phone
    }
    ... on Student{
      avatar
    }
  }
}
```
Requiere un objeto JSON como:

```json
{
  "monitorInput": {
    "name": "Monitor 1",
    "email": "monitor1@gmail.com",
    "phone": "99999999"
  }
}
```

## Directives

```graphql
query getPeopleMonitor($monitor : Boolean!, $student: Boolean!)
{
  getPeople{
    _id
    name
    email
    ... on Monitor @include(if: $monitor){
      phone
    }
    ... on Student @skip(if: $student){
      avatar
    }
  }
}
```
Requiere un objeto JSON como:

```json
{
  "monitor": true,
  "student": true
}
```

## Union - Search

```graphql
{
  searchItems(keyword : "gmail"){
    __typename
    ... on Course{
      title
      description
    }
    ... on Student{
      name
      email
    }
    ... on Monitor{
      name
      email
    }
  }
}
```
Requiere crear indices en mongo:

```mongodb
SHELL cluster-mongo-graph-shard-0:PRIMARY> db.courses.createIndex({"$**":"text"})
SHELL cluster-mongo-graph-shard-0:PRIMARY> db.students.createIndex({"$**":"text"})
```