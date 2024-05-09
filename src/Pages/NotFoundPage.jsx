import React from 'react'
import styles from './NotFoundPage.module.sass'

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>User not found</h1>
        <a href='/'>go home</a>
      </div>
    </div>
  )
}

export default NotFoundPage
