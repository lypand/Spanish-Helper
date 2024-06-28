https://dictionaryapi.com/products/api-spanish-dictionary

docker compose up -d  


npm start
f5 debug

Possible integration with audio:
https://media.merriam-webster.com/audio/prons/es/me/mp3/h/hola001sp.mp3

"suppl": {
      "cjts": [


1) Pass spanish word to the backend
2) Attempt to retrieve from db
3) If not find from api 
4) Put in db for next time
5) Return relevant information
6) If information is there then display and if not then hide 

-optimization: might make sense in the future to create my own document rather than just storing the meta data? Not sure yet. might be helpful to have the meta data so that i can use other things in the future? 