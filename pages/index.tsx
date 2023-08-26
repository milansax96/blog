import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import Post from '../types/post'
import {useEffect, useState} from 'react'
import { hasCookie } from 'cookies-next'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  useEffect(() => {
    if (hasCookie('loggedIn')) {
      setLoggedIn(true)
    }
  })

  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with Zack</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              premium={heroPost.premium}
              loggedIn={loggedIn}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} loggedIn={loggedIn} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'premium'
  ])

  return {
    props: { allPosts },
  }
}
