// View documentation at: https://enhance.dev/docs/learn/starter-project/api
/**
  * @typedef {import('@enhance/types').EnhanceApiFn} EnhanceApiFn
  */
import { getHeadsign, upsertHeadsign, validate } from '../../models/headsigns.mjs'


/**
 * @type {EnhanceApiFn}
 */
export async function get (req) {
  if (req.session.problems) {
    let { problems, headsign, ...session } = req.session
    return {
      session,
      json: { problems, headsign }
    }
  }

  const id = req.pathParameters?.id
  const result = await getHeadsign(id)
  return {
    json: { headsign: result }
  }
}

/**
 * @type {EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, headsign } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, headsign },
      json: { problems, headsign },
      location: `/headsigns/${headsign.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, headsign: removed, ...newSession } = session
  try {
    const result = await upsertHeadsign({ key: id, ...headsign })
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
