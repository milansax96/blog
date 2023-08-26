import cn from 'classnames'
import Link from 'next/link'

type Props = {
  title: string
  src: string
  slug?: string
  loggedIn: boolean
  premium: string
}

const CoverImage = ({ title, src, slug, loggedIn, premium }: Props) => {
  const image = (
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ?
        (premium === 'false') ?
        (
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a aria-label={title}>{image}</a>
          </Link>
        ) :
          loggedIn ?
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a aria-label={title}>{image}</a>
            </Link>
           :
            <Link as={`/login`} href="/login">
              <a aria-label={title}>{image}</a>
            </Link>
            :
          (
            image
          )
      }
    </div>
  )
}

export default CoverImage
