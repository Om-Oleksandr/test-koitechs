import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: 'YOUR_TOKEN'
})

export async function fetchUserData (username) {
  try {
    const {
      data: { bio, html_url, name, login, created_at, public_repos }
    } = await octokit.request(`GET /users/${username}`)
    return { bio, html_url, name, login, created_at, public_repos }
  } catch (error) {
    throw error
  }
}

export async function userLanguages (username) {
  try {
    const response = await octokit.paginate(`GET /users/${username}/repos`, {
      per_page: 100
    })
    const languageStats = {}

    const batchedRepos = chunkArray(response, 100)
    const filteredRepos = batchedRepos
      .flat()
      .filter(el => !el.archived)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 5)
    for (const batch of batchedRepos) {
      const languagePromises = batch.map(repo =>
        octokit.rest.repos.listLanguages({
          owner: username,
          repo: repo.name
        })
      )

      const languages = await Promise.all(languagePromises)

      for (const langData of languages) {
        for (const lang in langData.data) {
          languageStats[lang] = (languageStats[lang] || 0) + langData.data[lang]
        }
      }
    }

    const totalBytes = Object.values(languageStats).reduce(
      (sum, val) => sum + val,
      0
    )
    for (const language in languageStats) {
      const percentage = (languageStats[language] / totalBytes) * 100
      languageStats[language] = percentage.toFixed(2) + '%'
    }
    const languageStatsArray = Object.entries(languageStats)
      .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))
      .slice(0, 9)
    return { repos: filteredRepos, stat: languageStatsArray }
  } catch (error) {}
}

function chunkArray (array, size) {
  const chunkedArray = []
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size))
  }
  return chunkedArray
}
