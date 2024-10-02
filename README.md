Go inside the client-app and run npm start to start the client

You will need to estabish a docker connection for postgres database 

 docker run --name dev -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest

Go inside /API and run dotnet run to start the server

## Not Madatory to start application but if want to run server with Docker
To run Docker Image

docker build -t dayosql/reactivities .

docker run --rm -it -p 8080:80 dayosql/reactivities

To push to docker 

docker push dayosql/reactivities:latest

To drop database

dotnet ef database drop -p Persistence -s API

