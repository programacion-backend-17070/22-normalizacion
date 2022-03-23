

(async () => {
  const { normalize, denormalize, schema } = require("normalizr")
  const fs = require("fs/promises")
  const { print } = require("./util")
  
  const data = JSON.parse((await fs.readFile("./movies.json")))

  const director = new schema.Entity("directors");
  const actor = new schema.Entity("actors")
  const movie = new schema.Entity("movies", {
    director: director,
    actors: [actor]
  })

  const user = new schema.Entity("users", {
    movies: [movie]
  })

  const normalizedData = normalize(data, user)

  print(normalizedData)
  console.log("-------------")

  const denormalizedData = denormalize(1, user, normalizedData.entities)

  print(denormalizedData)
})()