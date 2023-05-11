import * as core from '@actions/core'
import {chooseCollaborators, getCollaborators, getOctokit} from './utils'

async function run() {
  try {
    const octokit = getOctokit()
    const sparator = core.getInput('sparator')
    const collaborators = await getCollaborators(octokit)
    const candidates = chooseCollaborators(collaborators)

    core.setOutput('candidates', candidates)
    core.setOutput('candidates_string', candidates.join(sparator))
    core.setOutput(
      'at_candidates_string',
      candidates.map(item => `@${item}`).join(', ')
    )
    core.setOutput('collaborators', collaborators)
  } catch (error: unknown) {
    core.setFailed(error as Error)
  }
}

run()
