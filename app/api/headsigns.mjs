// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getHeadsigns, upsertHeadsign, validate } from '../models/headsigns.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  const headsigns = await getHeadsigns()
  if (req.session.problems) {
    let { problems, headsign, ...session } = req.session
    return {
      session,
      json: { problems, headsigns, headsign }
    }
  }

  return {
    json: { headsigns }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const session = req.session
  // Validate
  let { problems, headsign } = await validate.create(req)
  if (problems) {
    return {
      session: { ...session, problems, headsign },
      json: { problems, headsign },
      location: '/headsigns'
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, headsign: removed, ...newSession } = session
  try {
    const result = await upsertHeadsign(headsign)
    return {
      session: newSession,
      json: { headsign: result },
      location: '/headsigns'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/headsigns'
    }
  }
}
