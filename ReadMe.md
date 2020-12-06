# RIMAC-CHALLENGE-API

### Prerequisites

```
Installing
```
`npm install`
`serverless dynamodb install`

## Running the tests

`jest`
`jest --coverage`

## Deployment

# Running the Project Locally

`serverless offline start --location .`

## Documentation

`serverless openapi generate`

## API Endpoints

| Method | Description | URI |
| --------- | ---- | --- |
| GET | Responde con los datos de un personaje de Star Wars por el ID. | https://7cgxah4ty6.execute-api.us-east-1.amazonaws.com/dev/get-character/:ID |
| POST | Guarda un personaje. | https://7cgxah4ty6.execute-api.us-east-1.amazonaws.com/dev/create-character/:ID |
| GET | Responde con los datos de una pelicula de Star Wars por el ID | https://7cgxah4ty6.execute-api.us-east-1.amazonaws.com/dev/get-film/ID |

## Authors

* **Leidy Callupe** - *Initial work* - [PurpleBooth](https://github.com/leidy8864)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
