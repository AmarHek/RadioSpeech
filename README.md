# Radiologie Befundung

## Build for production

```bash
# build client (Angular) app and insert into server
cd ui/
ng build --prod --output-path ../server/src/main/resources/org/felher/server/

# build server
cd ../server
sbt packageZipTarball

# copy to server
scp target/universal/server-0.1.0-SNAPSHOT.tar.gz <username>@132.187.15.156:server-0.1.0-SNAPSHOT.tar.gz

# login on server
ssh <username>@132.187.15.156

# unpack
tar -xzf server-0.1.0-SNAPSHOT.tar.gz

# start server
cd server-0.1.0-SNAPSHOT
bin/server &

logout
```
