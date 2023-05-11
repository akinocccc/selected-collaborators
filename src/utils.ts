import * as core from '@actions/core'
import * as github from '@actions/github'

type Octokit = ReturnType<typeof getOctokit>

export function getOctokit() {
  const token = core.getInput('token', {required: true})
  return github.getOctokit(token)
}

export async function getCollaborators(octokit: Octokit): Promise<string[]> {
  const {context} = github

  const {data: collaboratorList} = await octokit.request(
    'GET /repos/{owner}/{repo}/collaborators',
    {
      ...context.repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  )
  const collaborators = collaboratorList.map(item => item.login)
  return collaborators
}

export function chooseCollaborators(collaborators: string[]) {
  const limitNumber =
    parseInt(core.getInput('limit_number', {required: false})) || 1
  // const limitNumber = 1
  const selected: Set<string> = new Set<string>()

  for (let i = 0; i < limitNumber; i++) {
    let target = getRandomInt(0, collaborators.length)
    while (selected.has(collaborators[target])) {
      target = getRandomInt(0, collaborators.length)
    }
    selected.add(collaborators[target])
  }

  return Array.from(selected)
}

function getRandomInt(min: number, max: number) {
  // [min, max)
  return Math.floor(Math.random() * (max - min) + min)
}
