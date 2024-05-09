import React from 'react'
import HomeForm from './../components/HomeForm/index'
import styles from './HomePage.module.sass'

const HomePage = () => {
  return (
    <div className={styles.form_container}>
      <HomeForm className={[styles.form_body, styles.error]}/>
    </div>
  )
}

export default HomePage
