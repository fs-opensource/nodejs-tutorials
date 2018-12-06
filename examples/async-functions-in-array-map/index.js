'use strict'

const Listr = require('listr')
const Axios = require('axios')

function kickoff (tasks) {
  tasks
    .run()
    .then(process.exit)
    .catch(process.exit)
}

if (process.argv) {
  const tasks = [
    {
      title: 'Downloading repository information',
      task: async () => {
        const repos = [
          {
            url: 'https://api.github.com/repos/fs-opensource/futureflix-starter-kit'
          },
          {
            url: 'https://api.github.com/repos/fs-opensource/android-tutorials-glide'
          }
        ]

        const promises = repos.map(async repo => {
          const response = await Axios({
            method: 'GET',
            url: repo.url,
            headers: { Accept: 'application/vnd.github.v3+json' }
          })

          return Object.assign(repo, {
            name: response.data.full_name,
            description: response.data.description
          })
        })

        await Promise.all(promises)
      }
    }
  ]

  kickoff(new Listr(tasks))
}
