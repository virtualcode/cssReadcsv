// View documentation at: https://enhance.dev/docs/learn/starter-project/api
import { deleteHeadsign } from '../../../models/headsigns.mjs'


/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function post (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, headsign: removed, ...newSession } = session
  try {
    let headsign = await deleteHeadsign(id)
    return {
      session: newSession,
      json: { headsign },
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
