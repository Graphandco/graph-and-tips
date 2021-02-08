import React, { useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { FaCss3Alt } from 'react-icons/Fa';
import { SiPrestashop, SiJavascript, SiPhp } from 'react-icons/Si';
import { BsSearch } from 'react-icons/Bs';

export const getStaticProps = async () => {
  const res = await fetch('https://www.graphandco.com/coding-tips/wp-json/wp/v2/coding-tips');
  const data = await res.json();

  return {
    props: { tips: data }
  }
}

export default function Home({ tips }) {

    const [searchText, setSearchText] = useState('');

    const handleSearch = (e)=> {
        setSearchText(e.target.value)
    }

    const filteredTips = tips.filter((tip) => {
        return (
            tip.title.rendered
                .toLowerCase()
                .includes(searchText.toLowerCase())
        );
    });

  return (
    <>
        <Head>
            <title>Accueil | Tips List</title>
            <meta name="keywords" content="tips"/>
        </Head>
        {/* <div>
        <h1 className={styles.title}>Homepage</h1>
        <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi impedit suscipit architecto, odio inventore nostrum non neque dicta. Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem nobis odit.</p>
        <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi impedit suscipit architecto, odio inventore nostrum non neque dicta. Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem nobis odit.</p>
        <Link href="/ninjas/">
            <a className={styles.btn}>See Ninja Listing</a>
        </Link>
        </div> */}
        <div className={styles.contentHeader}>
            <h1>Tous les Tips</h1>
            <form>
                <label>
                <BsSearch />
                <input type="text" name="name" placeholder="Rechercher..." onChange={handleSearch}/>
                </label>
            </form>
        </div>


      <div className={styles.tipslist}>
      {filteredTips.map(tip => (
        <Link href={'/' + tip.id} key={tip.id}>
          <a className={styles.single}>
            {tip.acf.langage === 'css' && <FaCss3Alt />}
            {tip.acf.langage === 'prestashop' && <SiPrestashop />}                
            {tip.acf.langage === 'javascript' && <SiJavascript />}                
            {tip.acf.langage === 'php' && <SiPhp />}                
            <h2>{ tip.title.rendered }</h2>
            </a>
        </Link>
      ))}
      </div>
    </>
  )
}
