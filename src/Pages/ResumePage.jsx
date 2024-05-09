import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchUserData, userLanguages } from '../services'
import Resume from '../components/Resume'
import styles from './ResumePage.module.sass'
const ResumePage = () => {
  const [userInfo, setUserInfo] = useState({})
  const [isFetching, setIsFetching] = useState(true)
  const { username } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    fetchUserData(username)
      .then(res => {
        setUserInfo(prev => ({ ...prev, user: { ...res } }))
      })
      .catch(err => {
        if (err.status === 404) {
          navigate('/not-found')
        }
      })
      .finally(() => {
        setIsFetching(false)
      })
    userLanguages(username).then(res => {
      if (res) {
        setUserInfo(prev => ({ ...prev, repos: res.repos, stat: res.stat }))
      }
    })
    return () => {}
  }, [username, navigate])
  return (
    <div className={styles.container}>
      {isFetching
        ? 'loading'
        : userInfo.user && (
            <Resume
              userInfo={userInfo}
              className={[
                styles.user_info,
                styles.repo_info,
                styles.user_lists
              ]}
            />
          )}
    </div>
  )
}

export default ResumePage
