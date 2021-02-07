import Link from 'next/link'
//import Image from 'next/image'
import { FaCode } from 'react-icons/fa';


const Navbar = () => {
    return (
        <header>
            <div className="content header-content">
                <div className="logo">
                    {/* <Image src="/logo.png" alt="site logo" width={128} height={77} /> */}
                    
                    <Link href="/"><a><FaCode /> Graph and Tips</a></Link>
                </div>
                {/* <nav>
                    <Link href="/"><a>Accueil</a></Link>
                    <Link href="/about"><a>A propos</a></Link>
                </nav> */}
            </div>
        </header>
    );
}

export default Navbar;