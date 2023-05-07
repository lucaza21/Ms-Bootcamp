FROM mongo

ARG DATABASE_URI
ENV DATABASE_URI ${DATABASE_URI}

COPY users.json /users.json

CMD mongoimport --uri ${DATABASE_URI} --collection users --type json --file /users.json --jsonArray --drop -v

#CMD mongoimport --uri ${DATABASE_URI} --collection users --drop --file /users.json

#CMD mongoimport --drop --host mongo --db bootcamp --collection users --type json --jsonArray --file /users.json

#CMD mongoimport --uri ${DATABASE_URI} --collection factors --drop --file /factors.json && \
     