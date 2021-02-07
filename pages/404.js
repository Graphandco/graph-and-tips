import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      // router.go(-1)
      // router.go(1)
      router.push('/')
    }, 3000)
  }, [])

  return (
    <div className="not-found">
      <h1>Ooops...</h1>
      <h2>La page n'a pas été trouvée :(</h2>
      <p>Retour à l' <Link href="/"><a>accueil</a></Link> dans 3 secondes...</p>
    </div>
  );
}
 
export default NotFound;