import Head from 'next/head'
import Banner from '../components/banner'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Card from '../components/card'
import coffeeStoresData from '../data/coffee-stores.json'
import { fetchCoffeeStores } from '../lib/coffee-stores'
import useTrackLocation from '../hooks/use-track-location'
import { useEffect } from 'react'

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores()
  return {
    props: {
      coffeeStores: coffeeStores,
    },
  }
}

export default function Home(props) {
  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
    useTrackLocation()

  console.log({ latLong, locationErrorMsg })

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30)
          console.log({ fetchCoffeeStores })
        } catch (error) {}
      }
    }

    setCoffeeStoresByLocation()
  }, [latLong])

  const handleOnBannerBtnClick = () => {
    console.log('hi banner button')
    handleTrackLocation()
  }
  return (
    <div className={styles.container}>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          handleOnClick={handleOnBannerBtnClick}
          buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        <div className={styles.heroImage}>
          <Image src='/static/hero-image.png' width={700} height={400} />
        </div>
        {props.coffeeStores.length > 0 && (
          <>
            <div className={styles.sectionWrapper}>
              <h2 className={styles.heading2}>Toronto coffee store</h2>
              <div className={styles.cardLayout}>
                {props.coffeeStores.map((coffeeStore) => {
                  const { id, name, imgUrl } = coffeeStore
                  return (
                    <Card
                      key={id}
                      name={name}
                      imgUrl={
                        imgUrl ||
                        'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                      }
                      href={`/coffee-store/${id}`}
                    />
                  )
                })}
              </div>
            </div>
          </>
        )}
      </main>

      <footer></footer>
    </div>
  )
}
