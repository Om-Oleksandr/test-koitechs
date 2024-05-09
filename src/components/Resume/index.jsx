import React from 'react'

const Resume = props => {
  const {
    userInfo: { user, repos, stat },
    className: [info, repo, lists]
  } = props
  const created = new Date(user.created_at)
  const day = created.getDate().toString().padStart(2, '0')
  const month = (created.getMonth() + 1).toString().padStart(2, '0')
  const year = created.getFullYear()

  const formattedDate = `${day}/${month}/${year}`
  const mapLang = ([property, value]) => (
    <li key={parseFloat(value)}>
      {property} - {value}
    </li>
  )
  const mapRepos = repo => (
    <li key={repo.id}>
      <a href={repo.html_url}>{repo.name}</a>
    </li>
  )
  return (
    <>
      {user && (
        <>
          <div className={info}>
            <h1>{user.name || user.login}</h1>
            <span>Public repositories: {user.public_repos}</span>
            <span>Member since: {formattedDate}</span>
          </div>
          <div className={repo}>
            <div className={lists}>
              <p>repositories</p>
              {repos ? (
                repos.length > 0 ? (
                  <ul>{repos.map(mapRepos)}</ul>
                ) : (
                  'no repos'
                )
              ) : (
                'loading...'
              )}
            </div>
            <div className={lists}>
              <p>languages</p>
              {stat ? <ul>{stat.map(mapLang)}</ul> : 'loading...'}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Resume
