import data from '@begin/data'
import { validator } from '@begin/validator'
import { Headsign } from './schemas/headsign.mjs'

const deleteHeadsign = async function (key) {
  await data.destroy({ table: 'headsigns', key })
  return { key }
}

const upsertHeadsign = async function (headsign) {
  return data.set({ table: 'headsigns', ...headsign })
}

const getHeadsign = async function (key) {
  return data.get({ table: 'headsigns', key })
}

const getHeadsigns = async function () {
  const databasePageResults = await data.page({
    table: 'headsigns',
    limit: 25
  })

  let headsigns = []
  for await (let databasePageResult of databasePageResults) {
    for (let headsign of databasePageResult) {
      delete headsign.table
      headsigns.push(headsign)
    }
  }

  return headsigns
}

const validate = {
  shared (req) {
    return validator(req, Headsign)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, headsign: data } : { headsign: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, headsign: data } : { headsign: data }
  }
}

export {
  deleteHeadsign,
  getHeadsign,
  getHeadsigns,
  upsertHeadsign,
  validate
}
